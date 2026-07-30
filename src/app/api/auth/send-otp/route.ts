import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { generateOTP } from "@/lib/auth";
import { generateHash } from "@/lib/auth/hash";
import { getOTPDocument, saveOTPDocument } from "@/lib/auth/firestore";
import {
  OTP_MAX_REQUESTS_PER_HOUR,
  OTP_MAX_RESENDS,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "@/lib/auth/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid email is required.",
        },
        { status: 400 },
      );
    }

    // Check rate limiting
    const now = new Date();
    const existing = await getOTPDocument(email);

    // Counters for the OTP document we're about to write. Default to a fresh
    // cycle; only carry the existing counts forward if we're still inside the
    // same hourly window, otherwise resendCount/requestCount would accumulate
    // forever and permanently lock the email out.
    let resendCount = 1;
    let requestCount = 1;
    let createdAt = now;

    if (existing) {
      const updatedAt = new Date(existing.updatedAt);
      const existingCreatedAt = new Date(existing.createdAt);
      const diffSeconds = (now.getTime() - updatedAt.getTime()) / 1000;
      const diffHours = (now.getTime() - existingCreatedAt.getTime()) / (1000 * 60 * 60);
      const windowElapsed = diffHours >= 1;

      if (!windowElapsed) {
        // Check resend cooldown
        if (diffSeconds < OTP_RESEND_COOLDOWN_SECONDS) {
          const remaining = Math.ceil(OTP_RESEND_COOLDOWN_SECONDS - diffSeconds);
          return NextResponse.json(
            {
              success: false,
              message: `Please wait ${remaining} seconds before requesting another OTP.`,
              retryAfter: remaining,
            },
            { status: 429 },
          );
        }

        // Check hourly limit
        if (existing.requestCount >= OTP_MAX_REQUESTS_PER_HOUR) {
          return NextResponse.json(
            {
              success: false,
              message: "Hourly OTP request limit exceeded. Please try again later.",
            },
            { status: 429 },
          );
        }

        // Check resend limit (scoped to the current hourly window)
        if (existing.resendCount >= OTP_MAX_RESENDS) {
          return NextResponse.json(
            {
              success: false,
              message: "Maximum OTP resend limit reached. Please try again in an hour.",
            },
            { status: 429 },
          );
        }

        resendCount = existing.resendCount + 1;
        requestCount = existing.requestCount + 1;
        createdAt = existingCreatedAt;
      }
    }

    // Generate OTP
    const { otp, expiresAt } = generateOTP();
    const otpHash = generateHash(otp);
    const resendAvailableAt = new Date(Date.now() + OTP_RESEND_COOLDOWN_SECONDS * 1000);

    // Save OTP to Firestore
    try {
      await saveOTPDocument(email, {
        email,
        otpHash,
        expiresAt,
        verified: false,
        resendCount,
        requestCount,
        createdAt,
        updatedAt: now,
      });
    } catch (error) {
      console.error("Failed to save OTP document:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to generate verification code. Please try again.",
        },
        { status: 500 },
      );
    }

    // Send OTP via Resend with proper error handling
    try {
      const resendResponse = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@alltinium.com",
        to: email,
        subject: "Your Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
              <h2 style="margin: 0; font-size: 24px;">Email Verification</h2>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="color: #374151; font-size: 14px; margin: 0 0 20px 0;">
                You requested to verify your email address. Use the code below to complete the verification:
              </p>
              <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">Verification Code</p>
                <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; letter-spacing: 3px; color: #667eea;">
                  ${otp}
                </p>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
                This code expires in <strong>5 minutes</strong>. Do not share this code with anyone.
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 20px 0 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                If you didn't request this code, you can safely ignore this email.
              </p>
            </div>
          </div>
        `,
        text: `Your verification code is: ${otp}\n\nThis code expires in 5 minutes. Do not share this code with anyone.`,
      });

      // Check if resend response has an error
      if (resendResponse.error) {
        console.error("Resend API error:", resendResponse.error);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to send verification email. Please try again.",
          },
          { status: 500 },
        );
      }

      console.log("OTP sent successfully to:", email, "Message ID:", resendResponse.data?.id);

      return NextResponse.json(
        {
          success: true,
          message: "Verification code sent to your email.",
          retryAfter: OTP_RESEND_COOLDOWN_SECONDS,
          resendAvailableAt: resendAvailableAt.toISOString(),
          remainingAttempts: OTP_MAX_RESENDS - resendCount,
          expiresAt: expiresAt.toISOString(),
        },
        { status: 200 },
      );
    } catch (resendError) {
      console.error("Resend email error:", resendError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email. Please try again later.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("POST /api/auth/send-otp error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}

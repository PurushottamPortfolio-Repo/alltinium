import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/otp-email";
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

    // Validate email
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

    // Default to a fresh hourly cycle.
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

        // Check hourly request limit
        if (existing.requestCount >= OTP_MAX_REQUESTS_PER_HOUR) {
          return NextResponse.json(
            {
              success: false,
              message: "Hourly OTP request limit exceeded. Please try again later.",
            },
            { status: 429 },
          );
        }

        // Check resend limit
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

    // Hash OTP before storing it
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

    // Send OTP using GoDaddy SMTP through Nodemailer
    try {
      await sendOtpEmail(email, otp);

      console.log("OTP sent successfully to:", email);

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
    } catch (emailError) {
      console.error("SMTP email error:", emailError);

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

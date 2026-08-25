import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/forms";
import { getVerificationSession } from "@/lib/auth/cookies";
import { sendEmail } from "@/lib/email/mailer";
import { escapeHtml } from "@/lib/security/escape-html";
import { isTrustedOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";
import { PayloadTooLargeError, readJsonWithLimit } from "@/lib/security/read-json";

const TO_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL = process.env.SMTP_FROM;

const MAX_BODY_BYTES = 20 * 1024;
const IP_RATE_LIMIT = 10;
const IP_RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Request rejected." }, { status: 403 });
    }

    const ipLimit = checkRateLimit(
      `contact:${getClientIp(request)}`,
      IP_RATE_LIMIT,
      IP_RATE_WINDOW_MS,
    );
    if (!ipLimit.allowed) {
      return rateLimitResponse(
        ipLimit.retryAfterSeconds,
        "Too many requests. Please try again later.",
      );
    }

    let body: unknown;
    try {
      body = await readJsonWithLimit(request, MAX_BODY_BYTES);
    } catch (error) {
      if (error instanceof PayloadTooLargeError) {
        return NextResponse.json({ error: "Request too large." }, { status: 413 });
      }
      throw error;
    }

    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, company, phone, message } = parsed.data;

    // Verify email via cookie-based session
    const session = await getVerificationSession();

    if (!session || session.email.toLowerCase() !== email.toLowerCase()) {
      console.error("Email verification failed:", {
        sessionEmail: session?.email,
        formEmail: email,
      });

      return NextResponse.json(
        {
          error: "Email verification failed. Please verify your email and try again.",
        },
        { status: 401 },
      );
    }

    // Validate SMTP configuration
    if (!FROM_EMAIL || !TO_EMAIL) {
      console.error("SMTP email configuration is missing");

      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    // Format email content
    const emailText = [
      `From: ${name}`,
      `Email: ${email}`,
      ...(company ? [`Company: ${company}`] : []),
      ...(phone ? [`Phone: ${phone}`] : []),
      "",
      "Message:",
      message,
    ].join("\n");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "";
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeMessage = escapeHtml(message);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Request
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${safeName}</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:${safeEmail}">${safeEmail}</a>
          </p>
          ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ""}
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          This email was sent from your contact form on Alltinium.
        </p>
      </div>
    `;

    // Send contact notification to info@alltinium.com
    try {
      const response = await sendEmail({
        to: TO_EMAIL,
        subject: `New contact request from ${name}`,
        html: emailHtml,
        replyTo: email,
      });

      console.log("Contact email sent:", {
        messageId: response.messageId,
        fromEmail: email,
        toEmail: TO_EMAIL,
      });

      // Send confirmation email to user
      try {
        await sendEmail({
          to: email,
          subject: "We received your message - Alltinium",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for contacting us!</h2>

              <p style="color: #666;">
                We have received your message and will get back to you shortly.
              </p>

              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Your message:</strong></p>

                <p style="white-space: pre-wrap; line-height: 1.6; margin: 10px 0 0 0;">
                  ${safeMessage}
                </p>
              </div>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                This is an automated confirmation email.
              </p>
            </div>
          `,
        });
      } catch (confirmationError) {
        console.warn("Failed to send confirmation email:", confirmationError);

        // Do not fail the request if confirmation email fails
      }
    } catch (smtpError) {
      console.error("SMTP email error:", smtpError);

      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll reply to your inbox shortly.",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("POST /api/contact error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

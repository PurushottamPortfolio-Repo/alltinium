import { NextResponse } from "next/server";
import { buildQuoteSummaryText } from "@/components/quote/summary";
import { rfqFormSchema } from "@/lib/forms/quote-schema";
import { getVerificationSession } from "@/lib/auth/cookies";
import { sendEmail } from "@/lib/email/mailer";
import { escapeHtml } from "@/lib/security/escape-html";
import { isTrustedOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";
import { PayloadTooLargeError, readJsonWithLimit } from "@/lib/security/read-json";

const TO_EMAIL = process.env.CONTACT_NOTIFY_TO || process.env.CONTACT_EMAIL;

const FROM_EMAIL = process.env.SMTP_FROM;

const MAX_BODY_BYTES = 50 * 1024; // form fields only, no attachment
const IP_RATE_LIMIT = 10;
const IP_RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ error: "Request rejected." }, { status: 403 });
    }

    const ipLimit = checkRateLimit(`rfq:${getClientIp(request)}`, IP_RATE_LIMIT, IP_RATE_WINDOW_MS);
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

    const parsed = rfqFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const values = parsed.data;
    const { companyName, contactName, email, phone, referenceNumber } = values;

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

    const summaryText = buildQuoteSummaryText(values, referenceNumber);

    const safeCompanyName = escapeHtml(companyName);
    const safeContactName = escapeHtml(contactName);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeReferenceNumber = referenceNumber ? escapeHtml(referenceNumber) : "";
    const safeSummaryText = escapeHtml(summaryText);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New RFQ Request${safeReferenceNumber ? ` — ${safeReferenceNumber}` : ""}
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>Company:</strong> ${safeCompanyName}</p>
          <p><strong>Contact:</strong> ${safeContactName}</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:${safeEmail}">${safeEmail}</a>
          </p>
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ""}
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Material Details</h3>

          <p style="white-space: pre-wrap; line-height: 1.6;">
            ${safeSummaryText}
          </p>
        </div>
      </div>
    `;

    // Send email using GoDaddy SMTP
    try {
      const response = await sendEmail({
        to: TO_EMAIL,
        subject: `New RFQ from ${companyName}`,
        html: emailHtml,
        text: summaryText,
        replyTo: email,
      });

      console.log("RFQ email sent:", {
        messageId: response.messageId,
        fromEmail: email,
        toEmail: TO_EMAIL,
      });

      try {
        await sendEmail({
          to: email,
          subject: `We received your RFQ${referenceNumber ? ` — ${referenceNumber}` : ""}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for your request</h2>
              <p style="color: #666;">
                We've received your material quote request and our team will review it and send
                you a detailed quote within 48 business hours.
              </p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${safeSummaryText}</p>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                This is an automated confirmation email.
              </p>
            </div>
          `,
        });
      } catch (confirmationError) {
        console.warn("Failed to send RFQ confirmation email:", confirmationError);
        // Do not fail the request if the confirmation email fails.
      }

      return NextResponse.json(
        {
          success: true,
          message: "Your RFQ has been submitted successfully",
        },
        { status: 200 },
      );
    } catch (smtpError) {
      console.error("SMTP email error:", smtpError);

      return NextResponse.json(
        { error: "Failed to send RFQ. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("POST /api/rfq error:", message);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}

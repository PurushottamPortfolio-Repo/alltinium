import { NextResponse } from "next/server";

import { buildRfqSummaryLines } from "@/components/manufacturing/forms/summary";
import { MAX_ATTACHMENT_BYTES } from "@/components/manufacturing/forms/form-data";
import { getVerificationSession } from "@/lib/auth/cookies";
import { sendEmail } from "@/lib/email/mailer";
import { manufacturingFormSchema } from "@/lib/forms/manufacturing-schema";

const TO_EMAIL = process.env.CONTACT_NOTIFY_TO || process.env.CONTACT_EMAIL;
const FROM_EMAIL = process.env.SMTP_FROM;

interface RawAttachment {
  fileName?: unknown;
  fileType?: unknown;
  fileBase64?: unknown;
}

function parseAttachment(
  raw: unknown,
): { filename: string; content: Buffer; contentType?: string } | null {
  if (!raw || typeof raw !== "object") return null;

  const { fileName, fileType, fileBase64 } = raw as RawAttachment;

  if (typeof fileName !== "string" || typeof fileBase64 !== "string" || !fileName || !fileBase64) {
    return null;
  }

  const content = Buffer.from(fileBase64, "base64");

  if (content.byteLength === 0 || content.byteLength > MAX_ATTACHMENT_BYTES) {
    return null;
  }

  return {
    filename: fileName.slice(0, 255),
    content,
    contentType: typeof fileType === "string" ? fileType : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = manufacturingFormSchema.safeParse(body);

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

    // Verify email via cookie-based session — never trust a client-supplied "verified" flag.
    const session = await getVerificationSession();

    if (!session || session.email.toLowerCase() !== values.email.toLowerCase()) {
      console.error("Email verification failed:", {
        sessionEmail: session?.email,
        formEmail: values.email,
      });

      return NextResponse.json(
        {
          error: "Email verification failed. Please verify your email and try again.",
        },
        { status: 401 },
      );
    }

    if (!FROM_EMAIL || !TO_EMAIL) {
      console.error("SMTP email configuration is missing");

      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const attachment = parseAttachment((body as { attachment?: unknown }).attachment);
    const summaryLines = buildRfqSummaryLines(values, values.referenceNumber);
    const summaryText = summaryLines.join("\n");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Manufacturing RFQ${values.referenceNumber ? ` — ${values.referenceNumber}` : ""}
        </h2>

        <div style="margin: 20px 0;">
          <p><strong>Company:</strong> ${values.companyName}</p>
          <p><strong>Contact:</strong> ${values.contactName}</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:${values.email}">${values.email}</a>
          </p>
          <p><strong>Phone:</strong> ${values.phone}</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">RFQ Details</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${summaryText}</p>
        </div>

        ${attachment ? `<p style="color: #666; font-size: 13px;">Drawing attached: ${attachment.filename}</p>` : ""}
      </div>
    `;

    try {
      const response = await sendEmail({
        to: TO_EMAIL,
        subject: `New Manufacturing RFQ from ${values.companyName}`,
        html: emailHtml,
        text: summaryText,
        replyTo: values.email,
        attachments: attachment ? [attachment] : undefined,
      });

      console.log("Manufacturing RFQ email sent:", {
        messageId: response.messageId,
        fromEmail: values.email,
        toEmail: TO_EMAIL,
      });

      try {
        await sendEmail({
          to: values.email,
          subject: `We received your manufacturing RFQ${
            values.referenceNumber ? ` — ${values.referenceNumber}` : ""
          }`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for your RFQ</h2>
              <p style="color: #666;">
                We've received your manufacturing request and our team will review it and get
                back to you within 48 business hours.
              </p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${summaryText}</p>
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
          message: "Your manufacturing RFQ has been submitted successfully.",
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

    console.error("POST /api/manufacturing error:", message);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}

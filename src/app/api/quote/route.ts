import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/forms";
import { getVerificationSession } from "@/lib/auth/cookies";

const TO_EMAIL = process.env.CONTACT_EMAIL || "purushottam.portfolio@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { projectName, industry, features, stack, budget, timeline, email, phone } = parsed.data;

    // Verify email via cookie-based session
    const session = await getVerificationSession();

    if (!session || session.email.toLowerCase() !== email.toLowerCase()) {
      console.error("Email verification failed:", {
        sessionEmail: session?.email,
        formEmail: email,
      });
      return NextResponse.json(
        { error: "Email verification failed. Please verify your email and try again." },
        { status: 401 },
      );
    }

    // Validate Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    if (!FROM_EMAIL) {
      console.error("RESEND_FROM_EMAIL not configured");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    // Format email content
    const emailText = [
      `Project Name: ${projectName}`,
      `Industry: ${industry}`,
      `Features: ${features}`,
      `Stack: ${stack}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
    ].join("\n");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Quote Request
        </h2>
        <div style="margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Project Details</h3>
          <p><strong>Project Name:</strong> ${projectName}</p>
          <p><strong>Industry:</strong> ${industry}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Technical Details</h3>
          <p><strong>Features Required:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6; margin-left: 10px;">${features}</p>
          <p><strong>Preferred Stack:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6; margin-left: 10px;">${stack}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #555;">Budget & Timeline</h3>
          <p><strong>Budget Range:</strong> ${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #555;">Contact Information</h3>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          This quote request was submitted from your website.
        </p>
      </div>
    `;

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New quote request for ${projectName}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Resend API error:", {
        status: response.status,
        body: errorBody,
      });

      return NextResponse.json(
        { error: "Failed to send quote request. Please try again later." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as { id?: string };
    console.log("Quote email sent:", {
      messageId: data.id,
      projectName,
      fromEmail: email,
      toEmail: TO_EMAIL,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your quote request has been sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("POST /api/quote error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

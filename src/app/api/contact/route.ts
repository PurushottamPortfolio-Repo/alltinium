import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/forms";
import { getVerificationSession } from "@/lib/auth/cookies";
import { resend } from "@/lib/resend";

const TO_EMAIL = process.env.CONTACT_EMAIL || "purushottam.portfolio@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
      `From: ${name}`,
      `Email: ${email}`,
      ...(company ? [`Company: ${company}`] : []),
      ...(phone ? [`Phone: ${phone}`] : []),
      "",
      "Message:",
      message,
    ].join("\n");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Request
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">
          This email was sent from your contact form on Alltinium.
        </p>
      </div>
    `;

    // Send email using Resend
    try {
      const response = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New contact request from ${name}`,
        html: emailHtml,
        text: emailText,
      });

      if (response.error) {
        console.error("Resend API error:", response.error);
        return NextResponse.json(
          { error: "Failed to send email. Please try again later." },
          { status: 502 },
        );
      }

      console.log("Contact email sent:", {
        messageId: response.data?.id,
        fromEmail: email,
        toEmail: TO_EMAIL,
      });

      // Also send confirmation email to user
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: [email],
          subject: "We received your message - Alltinium",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Thank you for contacting us!</h2>
              <p style="color: #666;">We have received your message and will get back to you shortly.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Your message:</strong></p>
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 10px 0 0 0;">${message}</p>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                This is an automated confirmation email.
              </p>
            </div>
          `,
          text: `Thank you for contacting us! We have received your message and will get back to you shortly.\n\nYour message:\n${message}`,
        });
      } catch (confirmationError) {
        console.warn("Failed to send confirmation email:", confirmationError);
        // Don't fail the request if confirmation email fails
      }

      return NextResponse.json(
        {
          success: true,
          message: "Thank you! We'll reply to your inbox shortly.",
        },
        { status: 200 },
      );
    } catch (resendError) {
      console.error("Resend email error:", resendError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("POST /api/contact error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { contactFormSchema } from "@/lib/forms";
// import { verifyOtpToken } from "@/lib/otp";

// const TO_EMAIL = process.env.CONTACT_EMAIL || "purushottam.portfolio@gmail.com";
// const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const parsed = contactFormSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         {
//           error: "Validation failed",
//           issues: parsed.error.flatten().fieldErrors,
//         },
//         { status: 400 },
//       );
//     }

//     const { name, email, company, phone, message } = parsed.data;
//     const verificationToken =
//       typeof body.verificationToken === "string" ? body.verificationToken : "";

//     // Verify email token
//     if (!verifyOtpToken(email, verificationToken)) {
//       console.error("Token verification failed for email:", email);
//       return NextResponse.json(
//         { error: "Email verification failed. Please verify your email and try again." },
//         { status: 401 },
//       );
//     }

//     // Validate Resend configuration
//     const apiKey = process.env.RESEND_API_KEY;
//     if (!apiKey) {
//       console.error("RESEND_API_KEY not configured");
//       return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
//     }

//     if (!FROM_EMAIL) {
//       console.error("RESEND_FROM_EMAIL not configured");
//       return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
//     }

//     // Format email content
//     const emailText = [
//       `From: ${name}`,
//       `Email: ${email}`,
//       ...(company ? [`Company: ${company}`] : []),
//       ...(phone ? [`Phone: ${phone}`] : []),
//       "",
//       "Message:",
//       message,
//     ].join("\n");

//     const emailHtml = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
//           New Contact Request
//         </h2>
//         <div style="margin: 20px 0;">
//           <p><strong>From:</strong> ${name}</p>
//           <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
//           ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
//           ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
//         </div>
//         <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
//           <h3 style="margin-top: 0;">Message:</h3>
//           <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
//         </div>
//         <p style="color: #999; font-size: 12px; margin-top: 20px;">
//           This email was sent from your contact form.
//         </p>
//       </div>
//     `;

//     // Send email using Resend
//     const response = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: FROM_EMAIL,
//         to: [TO_EMAIL],
//         replyTo: email,
//         subject: `New contact request from ${name}`,
//         html: emailHtml,
//         text: emailText,
//       }),
//     });

//     if (!response.ok) {
//       const errorBody = await response.text();
//       console.error("Resend API error:", {
//         status: response.status,
//         body: errorBody,
//       });

//       return NextResponse.json(
//         { error: "Failed to send email. Please try again later." },
//         { status: 502 },
//       );
//     }

//     const data = (await response.json()) as { id?: string };
//     console.log("Contact email sent:", {
//       messageId: data.id,
//       fromEmail: email,
//       toEmail: TO_EMAIL,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Your message has been sent successfully",
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "An unexpected error occurred";
//     console.error("POST /api/contact error:", message);

//     return NextResponse.json(
//       { error: "An unexpected error occurred. Please try again later." },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { contactFormSchema } from "@/lib/forms";
// import { verifyOtpToken } from "@/lib/otp";

// const TO_EMAIL = "purushottam.portfolio@gmail.com";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const parsed = contactFormSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         {
//           error: "Validation failed",
//           issues: parsed.error.flatten().fieldErrors,
//         },
//         { status: 400 },
//       );
//     }

//     const { name, email, company, phone, message } = parsed.data;
//     const verificationToken =
//       typeof body.verificationToken === "string" ? body.verificationToken : "";

//     if (!verifyOtpToken(email, verificationToken)) {
//       return NextResponse.json({ error: "Email verification failed" }, { status: 401 });
//     }

//     const text = [
//       `Name: ${name}`,
//       `Email: ${email}`,
//       company ? `Company: ${company}` : null,
//       phone ? `Phone: ${phone}` : null,
//       `Message: ${message}`,
//     ]
//       .filter(Boolean)
//       .join("\n");

//     const response = await fetch("https://api.resend.com/emails", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         from: process.env.RESEND_FROM_EMAIL ?? "Alltinium <onboarding@resend.dev>",
//         to: [TO_EMAIL],
//         subject: `New contact request from ${name}`,
//         text,
//       }),
//     });

//     if (!response.ok) {
//       const errorBody = await response.text();
//       return NextResponse.json(
//         { error: "Email delivery failed", detail: errorBody },
//         { status: 502 },
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
//   }
// }

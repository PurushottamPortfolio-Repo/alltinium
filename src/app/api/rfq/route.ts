import { NextResponse } from "next/server";
import { rfqFormSchema } from "@/lib/forms/quote-schema";
import { getVerificationSession } from "@/lib/auth/cookies";
import { resend } from "@/lib/resend";

const TO_EMAIL = process.env.CONTACT_EMAIL || "purushottam.portfolio@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    const {
      materialFamily,
      grade,
      specification,
      form,
      temper,
      units,
      length,
      width,
      thickness,
      diameter,
      quantity,
      tolerance,
      ndtrequirements,
      heatTreatment,
      packaging,
      specialRequirements,
      deliveryDate,
      deliveryLocation,
      shippingPreference,
      companyName,
      contactName,
      email,
      phone,
    } = parsed.data;

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

    const dimensions = [
      length ? `Length: ${length} ${units}` : null,
      width ? `Width: ${width} ${units}` : null,
      thickness ? `Thickness: ${thickness} ${units}` : null,
      diameter ? `Diameter: ${diameter} ${units}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    const emailText = [
      `Company: ${companyName}`,
      `Contact: ${contactName}`,
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
      "",
      `Material: ${materialFamily} (${grade})`,
      ...(specification ? [`Specification: ${specification}`] : []),
      `Form: ${form}`,
      ...(temper ? [`Temper: ${temper}`] : []),
      ...(dimensions ? [`Dimensions: ${dimensions}`] : []),
      `Quantity: ${quantity}`,
      ...(tolerance ? [`Tolerance: ${tolerance}`] : []),
      ...(ndtrequirements ? [`NDT requirements: ${ndtrequirements}`] : []),
      ...(heatTreatment ? [`Heat treatment: ${heatTreatment}`] : []),
      ...(packaging ? [`Packaging: ${packaging}`] : []),
      ...(specialRequirements ? [`Special requirements: ${specialRequirements}`] : []),
      "",
      `Delivery date: ${deliveryDate}`,
      `Delivery location: ${deliveryLocation}`,
      ...(shippingPreference ? [`Shipping preference: ${shippingPreference}`] : []),
    ].join("\n");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New RFQ Request
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Contact:</strong> ${contactName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Material Details</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${emailText}</p>
        </div>
      </div>
    `;

    try {
      const response = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `New RFQ from ${companyName}`,
        html: emailHtml,
        text: emailText,
      });

      if (response.error) {
        console.error("Resend API error:", response.error);
        return NextResponse.json(
          { error: "Failed to send RFQ. Please try again later." },
          { status: 502 },
        );
      }

      console.log("RFQ email sent:", {
        messageId: response.data?.id,
        fromEmail: email,
        toEmail: TO_EMAIL,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Your RFQ has been submitted successfully",
        },
        { status: 200 },
      );
    } catch (resendError) {
      console.error("Resend email error:", resendError);
      return NextResponse.json(
        { error: "Failed to send RFQ. Please try again later." },
        { status: 502 },
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("POST /api/rfq error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

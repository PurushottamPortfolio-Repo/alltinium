import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/forms";
import { verifyOtp } from "@/lib/otp";

const TO_EMAIL = "purushottam.portfolio@gmail.com";

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
    const otpCode = typeof body.otpCode === "string" ? body.otpCode : "";

    if (!verifyOtp(email, otpCode)) {
      return NextResponse.json({ error: "Email verification failed" }, { status: 401 });
    }

    const text = [
      `Project Name: ${projectName}`,
      `Industry: ${industry}`,
      `Features: ${features}`,
      `Stack: ${stack}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "Alltinium <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: `New quote request from ${projectName}`,
        text,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: "Email delivery failed", detail: errorBody },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}

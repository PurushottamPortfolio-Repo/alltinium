import { NextResponse } from "next/server";
import { createOtp, sendOtpEmail } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const code = createOtp(email);
    await sendOtpEmail(email, code);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send otp";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

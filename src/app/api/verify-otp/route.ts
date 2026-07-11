import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    if (typeof email !== "string" || typeof code !== "string") {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    return NextResponse.json({ success: verifyOtp(email, code) });
  } catch {
    return NextResponse.json({ error: "Unable to verify otp" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createOtp, sendOtpEmail, normalizeEmail } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required and must be a valid string" },
        { status: 400 },
      );
    }

    const normalizedEmail = normalizeEmail(email);

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    // Generate OTP code
    let code: string;
    try {
      code = createOtp(normalizedEmail);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create OTP";
      console.error("createOtp error:", message);

      // Check if it's a rate limit error
      if (message.includes("Too many requests")) {
        return NextResponse.json({ error: message }, { status: 429 });
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    // Send OTP email
    try {
      await sendOtpEmail(normalizedEmail, code);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send email";
      console.error("sendOtpEmail error:", message);

      // Log the error but return a user-friendly message
      return NextResponse.json(
        {
          error:
            "Failed to send verification email. Please check your email address and try again.",
          detail: message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent successfully. Check your inbox.",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("POST /api/otp error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { createOtp, sendOtpEmail } from "@/lib/otp";

// export async function POST(request: Request) {
//   try {
//     const { email } = await request.json();
//     if (typeof email !== "string") {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     const code = createOtp(email);
//     await sendOtpEmail(email, code);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     const message = error instanceof Error ? error.message : "Unable to send otp";
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

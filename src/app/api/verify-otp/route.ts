import { NextResponse } from "next/server";
import { createVerificationTokenForOtp, normalizeEmail } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validate inputs
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (typeof code !== "string" || !code.trim()) {
      return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);

    // Validate code format (should be 6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification code must be 6 digits",
        },
        { status: 400 },
      );
    }

    // Verify OTP and create token
    const token = createVerificationTokenForOtp(normalizedEmail, code);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The verification code is invalid or expired. Please request a fresh code and try again.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        token,
        message: "Email verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("POST /api/verify-otp error:", message);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import { createVerificationTokenForOtp } from "@/lib/otp";

// export async function POST(request: Request) {
//   try {
//     const { email, code } = await request.json();
//     if (typeof email !== "string" || typeof code !== "string") {
//       return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
//     }

//     const token = createVerificationTokenForOtp(email, code);
//     if (!token) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "The verification code is invalid or expired. Please request a fresh code and try again.",
//         },
//         { status: 401 },
//       );
//     }

//     return NextResponse.json({ success: true, token });
//   } catch {
//     return NextResponse.json({ error: "Unable to verify otp" }, { status: 500 });
//   }
// }

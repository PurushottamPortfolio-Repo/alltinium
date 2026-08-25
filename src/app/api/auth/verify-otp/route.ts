import { NextResponse } from "next/server";
import { compareHash } from "@/lib/auth/hash";
import { getOTPDocument, deleteOTPDocument, saveOTPDocument } from "@/lib/auth/firestore";
import { setVerificationCookie } from "@/lib/auth/cookies";
import { OTP_MAX_ATTEMPTS } from "@/lib/auth/constants";
import { isTrustedOrigin } from "@/lib/security/origin";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/security/rate-limit";
import { PayloadTooLargeError, readJsonWithLimit } from "@/lib/security/read-json";

const OTP_EXPIRY_MINUTES = 5;
const MAX_BODY_BYTES = 2 * 1024;
const IP_RATE_LIMIT = 20;
const IP_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({ success: false, message: "Request rejected." }, { status: 403 });
    }

    // Network-level throttle on top of the per-email attempt counter below —
    // two independent layers so neither alone is a single point of failure
    // against brute-forcing the 6-digit code.
    const ipLimit = checkRateLimit(
      `verify-otp:${getClientIp(request)}`,
      IP_RATE_LIMIT,
      IP_RATE_WINDOW_MS,
    );
    if (!ipLimit.allowed) {
      return rateLimitResponse(
        ipLimit.retryAfterSeconds,
        "Too many verification attempts from this connection. Please try again later.",
      );
    }

    let body: { email?: string; otp?: string };
    try {
      body = await readJsonWithLimit(request, MAX_BODY_BYTES);
    } catch (error) {
      if (error instanceof PayloadTooLargeError) {
        return NextResponse.json(
          { success: false, message: "Request too large." },
          { status: 413 },
        );
      }
      throw error;
    }

    const email = body.email?.trim().toLowerCase();
    const otp = body.otp?.trim();

    // Validation
    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and verification code are required.",
        },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format.",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code must be 6 digits.",
        },
        { status: 400 },
      );
    }

    // Get OTP document from Firestore
    let document;
    try {
      document = await getOTPDocument(email);
    } catch (error) {
      console.error("Failed to retrieve OTP document:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed. Please try again.",
        },
        { status: 500 },
      );
    }

    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code not found or already expired. Please request a new one.",
        },
        { status: 404 },
      );
    }

    // Check OTP expiration
    const expiresAt = new Date(document.expiresAt);
    const now = new Date();

    if (expiresAt.getTime() < now.getTime()) {
      try {
        await deleteOTPDocument(email);
      } catch (error) {
        console.error("Failed to delete expired OTP:", error);
      }

      return NextResponse.json(
        {
          success: false,
          message: `Verification code expired. Codes are valid for ${OTP_EXPIRY_MINUTES} minutes.`,
        },
        { status: 410 },
      );
    }

    // Check attempt lockout before spending another guess
    const attemptsSoFar = document.attempts ?? 0;

    if (attemptsSoFar >= OTP_MAX_ATTEMPTS) {
      try {
        await deleteOTPDocument(email);
      } catch (error) {
        console.error("Failed to delete OTP after max attempts:", error);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Too many incorrect attempts. Please request a new verification code.",
        },
        { status: 429 },
      );
    }

    // Verify OTP
    let isValid = false;
    try {
      isValid = compareHash(otp, document.otpHash);
    } catch (error) {
      console.error("Failed to compare OTP hash:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Verification failed. Please try again.",
        },
        { status: 500 },
      );
    }

    if (!isValid) {
      const nextAttempts = attemptsSoFar + 1;

      try {
        if (nextAttempts >= OTP_MAX_ATTEMPTS) {
          await deleteOTPDocument(email);
        } else {
          await saveOTPDocument(email, { ...document, attempts: nextAttempts, updatedAt: now });
        }
      } catch (error) {
        console.error("Failed to record failed OTP attempt:", error);
      }

      const remaining = Math.max(OTP_MAX_ATTEMPTS - nextAttempts, 0);

      return NextResponse.json(
        {
          success: false,
          message:
            remaining > 0
              ? `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
              : "Too many incorrect attempts. Please request a new verification code.",
        },
        { status: 401 },
      );
    }

    // OTP is valid - set cookie and clean up
    try {
      const response = NextResponse.json(
        {
          success: true,
          verified: true,
          message: "Email verified successfully.",
          email: email,
        },
        { status: 200 },
      );

      // Set verification cookie (30 minutes expiry)
      await setVerificationCookie(email, response);

      // Clean up OTP document
      try {
        await deleteOTPDocument(email);
      } catch (cleanupError) {
        console.warn("Failed to cleanup OTP document:", cleanupError);
        // Don't fail the request if cleanup fails
      }

      return response;
    } catch (error) {
      console.error("Failed to set verification cookie:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Verification completed but session could not be established. Please try again.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("POST /api/auth/verify-otp error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";

// import { compareHash } from "@/lib/auth/hash";

// import { getOTPDocument, deleteOTPDocument } from "@/lib/auth/firestore";

// import { setVerificationCookie } from "@/lib/auth/cookies";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const email = body.email?.trim().toLowerCase();

//     const otp = body.otp?.trim();

//     if (!email || !otp) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Email and OTP are required.",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     const document = await getOTPDocument(email);

//     if (!document) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "OTP not found.",
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     const expiresAt = new Date(document.expiresAt);

//     if (expiresAt.getTime() < Date.now()) {
//       await deleteOTPDocument(email);

//       return NextResponse.json(
//         {
//           success: false,
//           message: "OTP has expired.",
//         },
//         {
//           status: 410,
//         },
//       );
//     }

//     const valid = compareHash(otp, document.otpHash);

//     if (!valid) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid OTP.",
//         },
//         {
//           status: 401,
//         },
//       );
//     }

//     await setVerificationCookie(email);

//     await deleteOTPDocument(email);

//     return NextResponse.json({
//       success: true,
//       verified: true,
//       message: "Email verified successfully.",
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Verification failed.",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }

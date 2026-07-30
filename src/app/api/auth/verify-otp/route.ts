import { NextResponse } from "next/server";
import { compareHash } from "@/lib/auth/hash";
import { getOTPDocument, deleteOTPDocument } from "@/lib/auth/firestore";
import { setVerificationCookie } from "@/lib/auth/cookies";

const OTP_EXPIRY_MINUTES = 5;

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect verification code. Please check and try again.",
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

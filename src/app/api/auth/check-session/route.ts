import { NextResponse } from "next/server";
import { getVerificationSession } from "@/lib/auth/cookies";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getVerificationSession();

    if (!session) {
      return NextResponse.json(
        {
          authenticated: false,
          verified: false,
          message: "No active verification session",
        },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      );
    }

    // Session is valid
    const response = NextResponse.json(
      {
        authenticated: true,
        verified: true,
        email: session.email,
        expiresAt: session.expiresAt,
        verifiedAt: session.verifiedAt,
      },
      { status: 200 },
    );

    // Add cache headers to prevent caching of authenticated responses
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("GET /api/auth/check-session error:", error);

    return NextResponse.json(
      {
        authenticated: false,
        verified: false,
        message: "Session check failed",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      },
    );
  }
}

// import { NextResponse } from "next/server";

// import { getVerificationSession, clearVerificationCookie } from "@/lib/auth/cookies";

// import { noStore } from "@/lib/auth/responses";

// export async function GET() {
//   try {
//     const session = await getVerificationSession();

//     if (!session) {
//       await clearVerificationCookie();

//       const response = NextResponse.json(
//         {
//           authenticated: false,
//           verified: false,
//         },
//         {
//           status: 401,
//         },
//       );

//       return noStore(response);
//     }

//     const response = NextResponse.json({
//       authenticated: true,
//       verified: true,
//       email: session.email,
//       expiresAt: session.expiresAt,
//     });

//     return noStore(response);
//   } catch (error) {
//     console.error(error);

//     await clearVerificationCookie();

//     const response = NextResponse.json(
//       {
//         authenticated: false,
//         verified: false,
//       },
//       {
//         status: 500,
//       },
//     );

//     return noStore(response);
//   }
// }

// import { NextResponse } from "next/server";
// import { sendEmail } from "@/lib/email/mailer";

// export async function GET() {
//   try {
//     const result = await sendEmail({
//       to: "info@alltinium.com",
//       subject: "GoDaddy SMTP Test",
//       text: "SMTP is working correctly.",
//       html: "<h2>GoDaddy SMTP is working correctly.</h2>",
//     });

//     console.log("SMTP message ID:", result.messageId);

//     return NextResponse.json({
//       success: true,
//       message: "Email sent successfully.",
//     });
//   } catch (error) {
//     console.error("SMTP test failed:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "SMTP test failed.",
//       },
//       { status: 500 },
//     );
//   }
// }

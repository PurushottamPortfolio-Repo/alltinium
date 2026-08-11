import { sendEmail } from "./email/mailer";

export async function sendOtpEmail(email: string, otp: string) {
  await sendEmail({
    to: email,
    subject: "Your verification code",
    html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
             <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
               <h2 style="margin: 0; font-size: 24px;">Email Verification</h2>
             </div>
             <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
               <p style="color: #374151; font-size: 14px; margin: 0 0 20px 0;">
                 You requested to verify your email address. Use the code below to complete the verification:
               </p>
               <div style="background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                 <p style="margin: 0; font-size: 12px; color: #6b7280;">Verification Code</p>
                 <p style="margin: 10px 0 0 0; font-size: 32px; font-weight: bold; letter-spacing: 3px; color: #667eea;">
                   ${otp}
                 </p>
               </div>
               <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
                 This code expires in <strong>5 minutes</strong>. Do not share this code with anyone.
               </p>
               <p style="color: #9ca3af; font-size: 11px; margin: 20px 0 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                 If you didn't request this code, you can safely ignore this email.
               </p>
             </div>
           </div>
    `,
    text: `Your verification code is: ${otp}\n\nThis code expires in 5 minutes. Do not share this code with anyone.`,
  });
}

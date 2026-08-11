import nodemailer from "nodemailer";

const smtpPort = Number(process.env.SMTP_PORT || 465);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}

// import nodemailer from "nodemailer";

// const smtpPort = Number(process.env.SMTP_PORT || 465);

// if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
//   throw new Error("SMTP environment variables are missing");
// }

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: smtpPort,
//   secure: smtpPort === 465,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// export async function sendEmail({
//   to,
//   subject,
//   html,
//   text,
// }: {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }) {
//   return transporter.sendMail({
//     from: process.env.SMTP_FROM || process.env.SMTP_USER,
//     to,
//     subject,
//     html,
//     text,
//   });
// }

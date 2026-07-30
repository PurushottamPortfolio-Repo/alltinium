import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY. Please add it to your .env.local file.");
}

export const resend = new Resend(resendApiKey);

export const resendConfig = {
  from: process.env.RESEND_FROM_EMAIL ?? "",
  contactEmail: process.env.CONTACT_EMAIL ?? "purushottam.portfolio@gmail.com",
};

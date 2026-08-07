import { Resend } from "resend";

let client: Resend | null = null;

/**
 * Lazily construct the Resend client so a missing API key surfaces as a
 * normal thrown error inside a route handler's try/catch (-> proper JSON
 * 500) instead of crashing module evaluation itself (-> opaque non-JSON
 * 500 from the platform, seen when this used to throw at import time).
 */
export function getResend(): Resend {
  if (!client) {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }
    client = new Resend(resendApiKey);
  }
  return client;
}

export const resendConfig = {
  from: process.env.RESEND_FROM_EMAIL ?? "",
  contactEmail: process.env.CONTACT_EMAIL ?? "",
};

// console.log("FROM =", process.env.RESEND_FROM_EMAIL);
// console.log("API KEY =", !!process.env.RESEND_API_KEY);

import { OTP_LENGTH, OTP_EXPIRY_SECONDS } from "./constants";

/**
 * Generate a random 6-digit OTP
 */
export function generateOTP(): { otp: string; expiresAt: Date } {
  const otp = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(OTP_LENGTH, "0");

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);

  return { otp, expiresAt };
}

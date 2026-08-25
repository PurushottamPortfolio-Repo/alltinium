import { randomInt } from "node:crypto";
import { OTP_LENGTH, OTP_EXPIRY_SECONDS } from "./constants";

/**
 * Generate a cryptographically secure random 6-digit OTP.
 */
export function generateOTP(): { otp: string; expiresAt: Date } {
  const otp = randomInt(0, 10 ** OTP_LENGTH)
    .toString()
    .padStart(OTP_LENGTH, "0");

  const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);

  return { otp, expiresAt };
}

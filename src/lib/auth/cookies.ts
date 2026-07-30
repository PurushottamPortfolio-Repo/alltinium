import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  VERIFICATION_COOKIE_NAME,
  VERIFICATION_COOKIE_MAX_AGE,
  VERIFICATION_COOKIE_OPTIONS,
} from "./constants";

export interface VerificationSession {
  email: string;
  verifiedAt: number;
  expiresAt: number;
}

const rawSessionSecret = process.env.SESSION_SECRET;

if (!rawSessionSecret) {
  throw new Error("Missing SESSION_SECRET. Please add it to your .env.local file.");
}

const SESSION_SECRET: string = rawSessionSecret;

function sign(payload: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
}

/**
 * Encode verification session data into a signed cookie value.
 * Format: base64(payload).hex(hmacSignature) — the signature prevents the
 * client (or anyone else) from forging a verified session by hand-crafting a cookie.
 */
function encodeSession(email: string): string {
  const session: VerificationSession = {
    email,
    verifiedAt: Date.now(),
    expiresAt: Date.now() + VERIFICATION_COOKIE_MAX_AGE * 1000,
  };

  const payload = Buffer.from(JSON.stringify(session)).toString("base64");
  return `${payload}.${sign(payload)}`;
}

/**
 * Decode and validate a signed verification session from cookie
 */
function decodeSession(encoded: string): VerificationSession | null {
  try {
    const [payload, signature] = encoded.split(".");
    if (!payload || !signature) {
      return null;
    }

    const expectedSignature = sign(payload);
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return null;
    }

    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    const session = JSON.parse(decoded) as VerificationSession;

    // Check if session is still valid
    if (session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Failed to decode session:", error);
    return null;
  }
}

/**
 * Set verification cookie after successful OTP verification
 * This should be called from the API route
 */
export async function setVerificationCookie(
  email: string,
  response?: NextResponse,
): Promise<NextResponse | void> {
  try {
    const encoded = encodeSession(email);

    if (response) {
      // If response is provided, set cookie on it
      response.cookies.set(VERIFICATION_COOKIE_NAME, encoded, {
        ...VERIFICATION_COOKIE_OPTIONS,
      });
      return response;
    } else {
      // Otherwise, get cookies from Next.js
      const cookieStore = await cookies();
      cookieStore.set(VERIFICATION_COOKIE_NAME, encoded, {
        ...VERIFICATION_COOKIE_OPTIONS,
      });
    }
  } catch (error) {
    console.error("Failed to set verification cookie:", error);
    throw new Error("Failed to set verification cookie");
  }
}

/**
 * Get verification session from cookie
 */
export async function getVerificationSession(): Promise<VerificationSession | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(VERIFICATION_COOKIE_NAME);

    if (!cookie || !cookie.value) {
      return null;
    }

    const session = decodeSession(cookie.value);
    return session;
  } catch (error) {
    console.error("Failed to get verification session:", error);
    return null;
  }
}

/**
 * Clear verification cookie
 */
export async function clearVerificationCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(VERIFICATION_COOKIE_NAME);
  } catch (error) {
    console.error("Failed to clear verification cookie:", error);
  }
}

/**
 * Verify if email is verified via cookie
 */
export async function isEmailVerified(email: string): Promise<boolean> {
  try {
    const session = await getVerificationSession();
    if (!session) return false;

    return session.email.toLowerCase() === email.toLowerCase();
  } catch (error) {
    console.error("Failed to verify email:", error);
    return false;
  }
}

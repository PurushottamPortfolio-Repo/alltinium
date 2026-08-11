// OTP Configuration
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 5;
export const OTP_EXPIRY_SECONDS = OTP_EXPIRY_MINUTES * 60;
export const SESSION_EXPIRY_MINUTES = 30;

// Rate limiting
export const OTP_MAX_REQUESTS_PER_HOUR = 5;
export const OTP_MAX_RESENDS = 3;
export const OTP_RESEND_COOLDOWN_SECONDS = 60; // 1 minute

// Cookie Configuration
export const VERIFICATION_COOKIE_NAME = "verification_session";
export const VERIFICATION_COOKIE_MAX_AGE = 30 * 60; // 30 minutes in seconds
export const VERIFICATION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: VERIFICATION_COOKIE_MAX_AGE,
  path: "/",
};

// Firestore Collections
export const FIRESTORE_COLLECTIONS = {
  OTP: "otp_verifications",
  VERIFICATION_SESSIONS: "verification_sessions",
};

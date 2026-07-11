import crypto from "node:crypto";

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const OTP_MAX_REQUESTS = 3;
const OTP_MAX_ATTEMPTS = 5;
const OTP_SECRET = process.env.OTP_SECRET ?? "dev-otp-secret-change-me";

const otpStore = new Map<string, { codeHash: string; expiresAt: number; attempts: number }>();
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanup(email: string) {
  const key = normalizeEmail(email);
  const record = otpStore.get(key);
  if (!record) return;
  if (record.expiresAt <= Date.now()) {
    otpStore.delete(key);
  }
}

function checkRateLimit(email: string) {
  const key = normalizeEmail(email);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (now - current.windowStart > OTP_RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (current.count >= OTP_MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

function createOtpCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

function hashOtp(email: string, code: string) {
  return crypto.createHash("sha256").update(`${email}:${code}:${OTP_SECRET}`).digest("hex");
}

export function createOtp(email: string) {
  const normalizedEmail = normalizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Invalid email");
  }

  if (!checkRateLimit(normalizedEmail)) {
    throw new Error("Too many requests. Please wait a minute and try again.");
  }

  cleanup(normalizedEmail);
  const code = createOtpCode();
  otpStore.set(normalizedEmail, {
    codeHash: hashOtp(normalizedEmail, code),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });

  return code;
}

export function verifyOtp(email: string, code: string) {
  const normalizedEmail = normalizeEmail(email);
  const record = otpStore.get(normalizedEmail);
  if (!record) return false;

  if (record.expiresAt <= Date.now()) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  record.attempts += 1;
  const isValid = record.codeHash === hashOtp(normalizedEmail, code);
  if (isValid) {
    otpStore.delete(normalizedEmail);
  }

  return isValid;
}

export async function sendOtpEmail(email: string, code: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "Alltinium <onboarding@resend.dev>",
      to: [email],
      subject: "Your verification code",
      text: `Your verification code for Alltinium is ${code}. It expires in 10 minutes.`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to send verification email");
  }
}

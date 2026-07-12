import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const OTP_MAX_REQUESTS = 3;
const OTP_MAX_ATTEMPTS = 5;
const OTP_SECRET = process.env.OTP_SECRET ?? "dev-otp-secret-change-me";

type OtpRecord = { codeHash: string; expiresAt: number; attempts: number };

const otpStore = new Map<string, OtpRecord>();
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
const otpStoreFilePath = path.join(process.cwd(), ".otp-store.json");

function loadOtpStore() {
  try {
    if (!fs.existsSync(otpStoreFilePath)) {
      return;
    }

    const fileContents = fs.readFileSync(otpStoreFilePath, "utf8");
    const parsed = JSON.parse(fileContents) as Record<string, OtpRecord>;

    for (const [email, record] of Object.entries(parsed)) {
      if (record.expiresAt > Date.now()) {
        otpStore.set(email, record);
      }
    }
  } catch (error) {
    console.error("Failed to load OTP store:", error);
    // Continue with an empty in-memory store
  }
}

function persistOtpStore() {
  try {
    const serialized = Object.fromEntries(otpStore.entries());
    fs.writeFileSync(otpStoreFilePath, JSON.stringify(serialized, null, 2));
  } catch (error) {
    console.error("Failed to persist OTP store:", error);
    // Continue - app can still verify during runtime
  }
}

function getRecord(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const existingRecord = otpStore.get(normalizedEmail);
  if (existingRecord) {
    return existingRecord;
  }

  loadOtpStore();
  return otpStore.get(normalizedEmail);
}

function upsertRecord(email: string, record: OtpRecord) {
  const normalizedEmail = normalizeEmail(email);
  otpStore.set(normalizedEmail, record);
  persistOtpStore();
}

function deleteRecord(email: string) {
  const normalizedEmail = normalizeEmail(email);
  otpStore.delete(normalizedEmail);
  persistOtpStore();
}

loadOtpStore();

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanup(email: string) {
  const key = normalizeEmail(email);
  const record = getRecord(key);
  if (!record) return;
  if (record.expiresAt <= Date.now()) {
    deleteRecord(key);
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

function createVerificationToken(email: string) {
  const payload = {
    email: normalizeEmail(email),
    exp: Date.now() + OTP_TTL_MS,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", OTP_SECRET).update(payloadBase64).digest("hex");
  return `${payloadBase64}.${signature}`;
}

export function createOtp(email: string) {
  const normalizedEmail = normalizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    throw new Error("Invalid email format");
  }

  if (!checkRateLimit(normalizedEmail)) {
    throw new Error("Too many requests. Please wait a minute and try again.");
  }

  cleanup(normalizedEmail);
  const code = createOtpCode();
  upsertRecord(normalizedEmail, {
    codeHash: hashOtp(normalizedEmail, code),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });

  return code;
}

export function verifyOtp(email: string, code: string) {
  const normalizedEmail = normalizeEmail(email);
  const record = getRecord(normalizedEmail);
  if (!record) return false;

  if (record.expiresAt <= Date.now()) {
    deleteRecord(normalizedEmail);
    return false;
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    deleteRecord(normalizedEmail);
    return false;
  }

  record.attempts += 1;
  upsertRecord(normalizedEmail, record); // Persist attempts

  const isValid = record.codeHash === hashOtp(normalizedEmail, code);
  if (isValid) {
    deleteRecord(normalizedEmail);
  }

  return isValid;
}

export function createVerificationTokenForOtp(email: string, code: string) {
  const normalizedEmail = normalizeEmail(email);
  if (!verifyOtp(normalizedEmail, code)) {
    return null;
  }

  return createVerificationToken(normalizedEmail);
}

export function verifyOtpToken(email: string, token: string) {
  if (typeof token !== "string" || !token) {
    return false;
  }

  const normalizedEmail = normalizeEmail(email);
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", OTP_SECRET)
    .update(payloadBase64)
    .digest("hex");
  if (expectedSignature !== signature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8")) as {
      email?: string;
      exp?: number;
    };

    if (payload.email !== normalizedEmail) {
      return false;
    }

    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
}

export async function sendOtpEmail(email: string, code: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  // Validate configuration
  if (!apiKey) {
    throw new Error("Resend API key is not configured. Set RESEND_API_KEY environment variable.");
  }

  if (!fromEmail) {
    throw new Error(
      "Resend from email is not configured. Set RESEND_FROM_EMAIL environment variable.",
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: email,
        subject: "Your verification code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Email Verification</h2>
            <p style="color: #666; font-size: 16px;">
              Your verification code is:
            </p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="font-size: 32px; font-weight: bold; color: #000; letter-spacing: 4px; margin: 0;">
                ${code}
              </p>
            </div>
            <p style="color: #999; font-size: 14px;">
              This code expires in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
        `,
        text: `Your verification code is: ${code}\n\nThis code expires in 10 minutes.`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      let errorMessage = "Failed to send verification email";

      try {
        const parsed = JSON.parse(body) as { message?: string };
        if (parsed.message) {
          errorMessage = parsed.message;
        }
      } catch {
        errorMessage = body || errorMessage;
      }

      console.error("Resend API error:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as { id?: string };
    console.log("OTP email sent successfully:", { email, messageId: data.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    console.error("sendOtpEmail error:", message);
    throw new Error(message);
  }
}

// import crypto from "node:crypto";
// import fs from "node:fs";
// import path from "node:path";

// const OTP_TTL_MS = 10 * 60 * 1000;
// const OTP_RATE_LIMIT_WINDOW_MS = 60 * 1000;
// const OTP_MAX_REQUESTS = 3;
// const OTP_MAX_ATTEMPTS = 5;
// const OTP_SECRET = process.env.OTP_SECRET ?? "dev-otp-secret-change-me";

// type OtpRecord = { codeHash: string; expiresAt: number; attempts: number };

// const otpStore = new Map<string, OtpRecord>();
// const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
// const otpStoreFilePath = path.join(process.cwd(), ".otp-store.json");

// function loadOtpStore() {
//   try {
//     if (!fs.existsSync(otpStoreFilePath)) {
//       return;
//     }

//     const fileContents = fs.readFileSync(otpStoreFilePath, "utf8");
//     const parsed = JSON.parse(fileContents) as Record<string, OtpRecord>;

//     for (const [email, record] of Object.entries(parsed)) {
//       if (record.expiresAt > Date.now()) {
//         otpStore.set(email, record);
//       }
//     }
//   } catch {
//     // Ignore store load failures and continue with an empty in-memory store.
//   }
// }

// function persistOtpStore() {
//   try {
//     const serialized = Object.fromEntries(otpStore.entries());
//     fs.writeFileSync(otpStoreFilePath, JSON.stringify(serialized, null, 2));
//   } catch {
//     // Ignore persist failures so the app can continue to verify during runtime.
//   }
// }

// function getRecord(email: string) {
//   const normalizedEmail = normalizeEmail(email);
//   const existingRecord = otpStore.get(normalizedEmail);
//   if (existingRecord) {
//     return existingRecord;
//   }

//   loadOtpStore();
//   return otpStore.get(normalizedEmail);
// }

// function upsertRecord(email: string, record: OtpRecord) {
//   const normalizedEmail = normalizeEmail(email);
//   otpStore.set(normalizedEmail, record);
//   persistOtpStore();
// }

// function deleteRecord(email: string) {
//   const normalizedEmail = normalizeEmail(email);
//   otpStore.delete(normalizedEmail);
//   persistOtpStore();
// }

// loadOtpStore();

// export function normalizeEmail(email: string) {
//   return email.trim().toLowerCase();
// }

// function isValidEmail(email: string) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function cleanup(email: string) {
//   const key = normalizeEmail(email);
//   const record = getRecord(key);
//   if (!record) return;
//   if (record.expiresAt <= Date.now()) {
//     deleteRecord(key);
//   }
// }

// function checkRateLimit(email: string) {
//   const key = normalizeEmail(email);
//   const now = Date.now();
//   const current = rateLimitStore.get(key);

//   if (!current) {
//     rateLimitStore.set(key, { count: 1, windowStart: now });
//     return true;
//   }

//   if (now - current.windowStart > OTP_RATE_LIMIT_WINDOW_MS) {
//     rateLimitStore.set(key, { count: 1, windowStart: now });
//     return true;
//   }

//   if (current.count >= OTP_MAX_REQUESTS) {
//     return false;
//   }

//   current.count += 1;
//   return true;
// }

// function createOtpCode() {
//   return crypto.randomInt(100000, 1000000).toString();
// }

// function hashOtp(email: string, code: string) {
//   return crypto.createHash("sha256").update(`${email}:${code}:${OTP_SECRET}`).digest("hex");
// }

// function createVerificationToken(email: string) {
//   const payload = {
//     email: normalizeEmail(email),
//     exp: Date.now() + OTP_TTL_MS,
//   };
//   const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
//   const signature = crypto.createHmac("sha256", OTP_SECRET).update(payloadBase64).digest("hex");
//   return `${payloadBase64}.${signature}`;
// }

// export function createOtp(email: string) {
//   const normalizedEmail = normalizeEmail(email);
//   if (!isValidEmail(normalizedEmail)) {
//     throw new Error("Invalid email");
//   }

//   if (!checkRateLimit(normalizedEmail)) {
//     throw new Error("Too many requests. Please wait a minute and try again.");
//   }

//   cleanup(normalizedEmail);
//   const code = createOtpCode();
//   upsertRecord(normalizedEmail, {
//     codeHash: hashOtp(normalizedEmail, code),
//     expiresAt: Date.now() + OTP_TTL_MS,
//     attempts: 0,
//   });

//   return code;
// }

// export function verifyOtp(email: string, code: string) {
//   const normalizedEmail = normalizeEmail(email);
//   const record = getRecord(normalizedEmail);
//   if (!record) return false;

//   if (record.expiresAt <= Date.now()) {
//     deleteRecord(normalizedEmail);
//     return false;
//   }

//   if (record.attempts >= OTP_MAX_ATTEMPTS) {
//     deleteRecord(normalizedEmail);
//     return false;
//   }

//   record.attempts += 1;
//   const isValid = record.codeHash === hashOtp(normalizedEmail, code);
//   if (isValid) {
//     deleteRecord(normalizedEmail);
//   }

//   return isValid;
// }

// export function createVerificationTokenForOtp(email: string, code: string) {
//   const normalizedEmail = normalizeEmail(email);
//   if (!verifyOtp(normalizedEmail, code)) {
//     return null;
//   }

//   return createVerificationToken(normalizedEmail);
// }

// export function verifyOtpToken(email: string, token: string) {
//   if (typeof token !== "string" || !token) {
//     return false;
//   }

//   const normalizedEmail = normalizeEmail(email);
//   const [payloadBase64, signature] = token.split(".");
//   if (!payloadBase64 || !signature) {
//     return false;
//   }

//   const expectedSignature = crypto
//     .createHmac("sha256", OTP_SECRET)
//     .update(payloadBase64)
//     .digest("hex");
//   if (expectedSignature !== signature) {
//     return false;
//   }

//   try {
//     const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8")) as {
//       email?: string;
//       exp?: number;
//     };

//     if (payload.email !== normalizedEmail) {
//       return false;
//     }

//     return typeof payload.exp === "number" && payload.exp > Date.now();
//   } catch {
//     return false;
//   }
// }

// export async function sendOtpEmail(email: string, code: string) {
//   const apiKey = process.env.RESEND_API_KEY;
//   const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Alltinium <onboarding@resend.dev>";

//   if (!apiKey) {
//     throw new Error("Resend API key is not configured.");
//   }

//   const response = await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       from: fromEmail,
//       to: [email],
//       subject: "Your verification code",
//       text: `Your verification code for Alltinium is ${code}. It expires in 10 minutes.`,
//       html: `<p>Your verification code for Alltinium is <strong>${code}</strong>.</p><p>It expires in 10 minutes.</p>`,
//     }),
//   });

//   if (!response.ok) {
//     const body = await response.text();
//     let message = "Failed to send verification email";

//     try {
//       const parsed = JSON.parse(body) as { message?: string };
//       if (parsed.message) {
//         message = parsed.message;
//       }
//     } catch {
//       if (body) {
//         message = body;
//       }
//     }

//     throw new Error(message);
//   }
// }

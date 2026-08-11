## Goal

Implement a production-grade Email OTP Verification system for a Next.js (App Router) project using TypeScript.

The system must use **GoDaddy SMTP with Nodemailer** for email delivery. Do **not** use Resend or any other email API service.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Firebase Firestore
- Firebase Admin SDK
- GoDaddy SMTP
- Nodemailer
- bcrypt
- Zod
- React Hook Form
- Tailwind CSS
- ShadCN UI

---

# Architecture

```text
Contact Form / Quote Form

↓

User enters email

↓

POST /api/auth/check-verification

↓

Check signed HttpOnly verification cookie

├── Cookie valid
│
└── Return verified=true

↓

Skip OTP

OR

├── Cookie missing/expired
│
└── Generate OTP

↓

Generate secure random 6-digit OTP

↓

Hash OTP using bcrypt

↓

Store OTP hash in Firestore

Fields:

- email
- otpHash
- expiresAt
- attempts
- resendCount
- requestCount
- createdAt
- updatedAt

↓

Send OTP using GoDaddy SMTP
        ↓
Nodemailer
        ↓
info@alltinium.com

↓

User receives OTP

↓

User enters OTP

↓

POST /api/auth/verify-otp

↓

Load OTP record

↓

Check expiry

↓

Check maximum attempts

↓

Compare OTP using bcrypt

↓

If valid:

- Delete OTP record
- Create signed HttpOnly cookie
- Cookie expiry = 30 minutes
- Return verified=true

↓

User submits Contact/Quote Form

↓

Backend validates verification cookie

↓

Process request

↓

Send email through GoDaddy SMTP

↓

Cookie expires automatically
```

---

# Email Architecture

GoDaddy SMTP is the **only email transport**.

```text
Next.js API Route
       ↓
Nodemailer
       ↓
GoDaddy SMTP
       ↓
info@alltinium.com
```

Do NOT use:

- Resend
- Resend API
- Resend SDK
- Any third-party email API
- Client-side email sending

All email sending must happen server-side.

---

# Required APIs

```text
POST /api/auth/check-verification
POST /api/auth/send-otp
POST /api/auth/verify-otp
POST /api/contact
POST /api/quote
```

---

# Folder Structure

```text
app/
  api/
    auth/
      check-verification/
        route.ts
      send-otp/
        route.ts
      verify-otp/
        route.ts

    contact/
      route.ts

    quote/
      route.ts

components/
  auth/
    otp-dialog.tsx

lib/
  auth/
    cookie.ts
    otp.ts
    session.ts
    hash.ts
    firestore.ts
    constants.ts

  firebase/
    admin.ts

  email/
    mailer.ts
    otp-email.ts
    contact-email.ts
    quote-email.ts

  validations/
    auth.ts
    contact.ts
    quote.ts

types/
```

---

# Email Module Architecture

Email functionality must be centralized.

```text
lib/email/mailer.ts
        ↓
Nodemailer SMTP transporter
        ↓
GoDaddy SMTP
```

Email-specific modules:

```text
lib/email/
├── mailer.ts
├── otp-email.ts
├── contact-email.ts
└── quote-email.ts
```

API routes must never create their own SMTP transporter.

All routes must use the centralized email service.

Example:

```ts
await sendOtpEmail(email, otp);
```

or:

```ts
await sendContactEmail(data);
```

---

# Nodemailer Configuration

Create a centralized SMTP transporter.

Example:

```ts
import nodemailer from "nodemailer";

const port = Number(process.env.SMTP_PORT || 465);

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

Validate all required SMTP environment variables during server initialization.

Never expose SMTP credentials to the browser.

---

# SMTP Environment Variables

Use:

```env
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=info@alltinium.com
SMTP_PASSWORD=
SMTP_FROM=info@alltinium.com

CONTACT_EMAIL=info@alltinium.com
```

Do NOT use:

```env
NEXT_PUBLIC_SMTP_PASSWORD=
NEXT_PUBLIC_SMTP_USER=
```

SMTP credentials must always remain server-side.

---

# Firestore Collection

Collection:

```text
otp_verifications
```

Document structure:

```text
email
otpHash
expiresAt
attempts
resendCount
requestCount
createdAt
updatedAt
```

Never store the plain OTP.

Never return `otpHash` to the client.

---

# Cookie Rules

Verification cookie must be:

- HttpOnly
- Secure in production
- SameSite=Lax
- Signed
- MaxAge = 30 minutes
- Server-readable only
- Cannot be accessed from JavaScript

Cookie payload should contain only the minimum information required to identify the verified email/session.

Never trust client-side verification state.

---

# OTP Rules

OTP must:

- Contain exactly 6 digits
- Use cryptographically secure random generation
- Be hashed using bcrypt before Firestore storage
- Never be stored in plain text
- Never be logged
- Expire after 5 minutes
- Allow maximum 5 verification attempts
- Allow maximum 3 resend requests
- Have resend cooldown protection
- Have hourly request rate limiting
- Be deleted after successful verification

Use `crypto.randomInt()` or another cryptographically secure Node.js API.

Do NOT use:

```ts
Math.random();
```

for OTP generation.

---

# OTP Sending

The OTP must be sent using:

```text
GoDaddy SMTP
    ↓
Nodemailer
    ↓
info@alltinium.com
```

The OTP API should call:

```ts
await sendOtpEmail(email, otp);
```

The API route must not directly contain SMTP configuration.

---

# OTP Email

Create:

```text
lib/email/otp-email.ts
```

It should:

- Accept recipient email and OTP
- Generate HTML email
- Generate plain-text fallback
- Clearly display the 6-digit OTP
- Mention the 5-minute expiration
- Warn users not to share the OTP
- Not log the OTP

Example interface:

```ts
export async function sendOtpEmail(email: string, otp: string): Promise<void>;
```

---

# Contact Email

Create:

```text
lib/email/contact-email.ts
```

Contact submissions must be sent through GoDaddy SMTP.

Example:

```text
User
 ↓
Contact Form
 ↓
POST /api/contact
 ↓
Validate signed verification cookie
 ↓
Validate form using Zod
 ↓
Process submission
 ↓
Nodemailer
 ↓
GoDaddy SMTP
 ↓
info@alltinium.com
```

---

# Quote Email

Create:

```text
lib/email/quote-email.ts
```

Quote submissions must use the same centralized SMTP infrastructure.

```text
User
 ↓
Quote Form
 ↓
POST /api/quote
 ↓
Validate signed verification cookie
 ↓
Validate form using Zod
 ↓
Process submission
 ↓
Nodemailer
 ↓
GoDaddy SMTP
 ↓
info@alltinium.com
```

---

# Contact & Quote Security

Before processing any Contact or Quote request:

1. Read verification cookie server-side.
2. Verify cookie signature.
3. Verify cookie expiration.
4. Verify the email/session identity.
5. Reject missing cookies.
6. Reject invalid signatures.
7. Reject expired cookies.
8. Validate request body using Zod.
9. Process only after successful validation.

Never trust:

```text
verified=true
```

from the frontend.

Never trust hidden inputs or client-side state as proof of verification.

---

# Validation

Use Zod for:

- Email
- OTP
- Contact form
- Quote form
- API request bodies

Validation must happen on the server even if React Hook Form validates on the client.

Client validation is for UX.

Server validation is authoritative.

---

# Security

Implement:

- Cryptographically secure OTP generation
- bcrypt OTP hashing
- HttpOnly cookies
- Signed cookies
- Secure cookies in production
- SameSite protection
- OTP expiration
- Maximum OTP attempts
- OTP resend cooldown
- Hourly OTP request limits
- Server-side validation
- Zod validation
- Origin validation where appropriate
- Input sanitization/normalization
- Firebase Admin SDK on server only
- Environment variables for secrets
- SMTP credentials only on server
- Safe error responses
- Server-side error logging
- No sensitive information in logs

Never log:

- OTP
- OTP hash
- SMTP password
- Firebase private key
- Cookie secret
- Session secret
- Full authentication tokens

---

# Error Handling

Use safe error messages.

Do not expose:

- SMTP credentials
- Nodemailer internals
- Firebase credentials
- Firestore internals
- OTP hashes
- Stack traces
- Authentication secrets

Log detailed errors only on the server.

Return generic errors to clients.

Example:

```ts
return NextResponse.json(
  {
    success: false,
    message: "Failed to send verification email.",
  },
  { status: 502 },
);
```

---

# Environment Variables

Required:

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=465
SMTP_USER=info@alltinium.com
SMTP_PASSWORD=
SMTP_FROM=info@alltinium.com

CONTACT_EMAIL=info@alltinium.com

COOKIE_SECRET=
```

Never commit these values to Git.

Never expose them through `NEXT_PUBLIC_*`.

---

# Resend Removal

The project must contain **zero Resend dependencies or implementation**.

Remove:

```text
resend
```

Remove:

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
```

Remove:

```text
lib/resend/
```

Remove all imports such as:

```ts
import { Resend } from "resend";
```

or:

```ts
import { getResend } from "@/lib/resend";
```

Search the entire project for:

```text
resend
RESEND_API_KEY
RESEND_FROM_EMAIL
```

No Resend references should remain after migration.

---

# API Responsibilities

## `/api/auth/check-verification`

Responsibilities:

1. Validate email.
2. Check signed verification cookie.
3. Return `verified=true` when valid.
4. Otherwise initiate OTP verification flow.
5. Apply rate limits.
6. Generate secure OTP.
7. Hash OTP.
8. Store OTP in Firestore.
9. Send OTP through GoDaddy SMTP.
10. Never return OTP.

---

## `/api/auth/send-otp`

Responsibilities:

1. Validate email.
2. Check OTP rate limits.
3. Check resend cooldown.
4. Check hourly request limit.
5. Generate secure OTP.
6. Hash OTP.
7. Store OTP in Firestore.
8. Send OTP through Nodemailer.
9. Return safe response.
10. Never expose OTP.

---

## `/api/auth/verify-otp`

Responsibilities:

1. Validate email.
2. Validate OTP format.
3. Load Firestore OTP record.
4. Check record existence.
5. Check expiration.
6. Check attempt limit.
7. Compare OTP using bcrypt.
8. Increment attempts on failure.
9. Delete OTP record on success.
10. Create signed HttpOnly verification cookie.
11. Set cookie expiration to 30 minutes.
12. Return `verified=true`.

---

## `/api/contact`

Responsibilities:

1. Validate request body using Zod.
2. Validate signed verification cookie.
3. Reject unauthorized requests.
4. Process contact submission.
5. Send notification using GoDaddy SMTP.
6. Never trust frontend verification state.

---

## `/api/quote`

Responsibilities:

1. Validate request body using Zod.
2. Validate signed verification cookie.
3. Reject unauthorized requests.
4. Process quote submission.
5. Send notification using GoDaddy SMTP.
6. Never trust frontend verification state.

---

# Coding Standards

Follow:

- SOLID principles
- Strict TypeScript
- Small reusable modules
- Single Responsibility Principle
- Dependency separation
- Centralized email service
- Centralized validation
- Centralized authentication utilities
- Async/await
- No duplicated logic
- Clear folder separation
- Production-grade error handling
- Meaningful naming
- No unnecessary abstractions

Avoid:

- `any`
- duplicated SMTP configuration
- business logic inside UI components
- client-side security checks as the only protection
- direct Firestore access from client components
- direct SMTP access from client components
- secrets in source code

---

# Testing Requirements

Test at minimum:

### OTP

- Valid OTP
- Invalid OTP
- Expired OTP
- Missing OTP
- Incorrect OTP format
- Maximum attempts
- OTP deletion after success
- Resend cooldown
- Maximum resend count
- Hourly request limit

### Cookie

- Valid cookie
- Missing cookie
- Expired cookie
- Invalid signature
- Tampered cookie
- 30-minute expiration

### Email

- SMTP connection
- Successful OTP delivery
- SMTP authentication failure
- SMTP timeout
- Invalid recipient
- Contact email delivery
- Quote email delivery

### API

- Invalid email
- Missing fields
- Invalid OTP
- Unauthorized submission
- Valid submission
- Firestore failure
- SMTP failure

---

# Expected Final Flow

```text
1. User enters email.
        ↓
2. Check verification cookie.
        ↓
3. Cookie valid?
        ↓
   YES → Skip OTP
        ↓
   NO
        ↓
4. Generate secure 6-digit OTP.
        ↓
5. Hash OTP using bcrypt.
        ↓
6. Save hash to Firestore.
        ↓
7. Send OTP through GoDaddy SMTP.
        ↓
8. User receives OTP at email.
        ↓
9. User enters OTP.
        ↓
10. Verify OTP using bcrypt.
        ↓
11. Delete OTP record.
        ↓
12. Create signed HttpOnly cookie.
        ↓
13. Cookie expires after 30 minutes.
        ↓
14. User submits Contact/Quote form.
        ↓
15. Backend validates signed cookie.
        ↓
16. Backend validates request using Zod.
        ↓
17. Process request.
        ↓
18. Send email through GoDaddy SMTP.
```

---

# Primary Security Principle

The frontend is **never trusted**.

The server must independently verify:

```text
Email
+
OTP
+
Firestore OTP record
+
Cookie signature
+
Cookie expiration
+
Request validation
```

before allowing Contact or Quote submission.

The email transport layer must remain completely independent from authentication/business logic:

```text
Authentication
     ↓
OTP Service
     ↓
Email Service
     ↓
Nodemailer
     ↓
GoDaddy SMTP
```

Prioritize **security, scalability, maintainability, reliability, and clean architecture** over implementation shortcuts.

# CLAUDE.md

## Goal

Implement a production-grade Email OTP Verification system for a Next.js (App Router) project using TypeScript.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Firebase Firestore
- Firebase Admin SDK
- Resend Email API
- bcrypt
- Zod
- React Hook Form
- Tailwind CSS
- ShadCN UI

---

## Architecture

Contact Form / Quote Form

↓

User enters email

↓

POST `/api/auth/check-verification`

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

Store in Firestore

Fields:

- email
- otpHash
- expiresAt
- attempts
- resendCount
- createdAt

↓

Send OTP using Resend

↓

User enters OTP

↓

POST `/api/auth/verify-otp`

↓

Load OTP record

↓

Check expiry

↓

Compare bcrypt hash

↓

If valid

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

Cookie expires automatically

---

## Required APIs

```
POST /api/auth/check-verification
POST /api/auth/send-otp
POST /api/auth/verify-otp
POST /api/contact
POST /api/quote
```

---

## Folder Structure

```
app/
  api/
    auth/
      check-verification/
      send-otp/
      verify-otp/
    contact/
    quote/

components/
  auth/
    otp-dialog.tsx

lib/
  auth/
    cookie.ts
    otp.ts
    session.ts
  firebase/
  resend/
  validations/

types/
```

---

## Firestore Collection

```
otp_verifications

email
otpHash
expiresAt
attempts
resendCount
createdAt
```

---

## Cookie Rules

- HttpOnly
- Secure
- SameSite=Lax
- Signed
- MaxAge = 30 minutes
- Cannot be accessed from JavaScript

---

## OTP Rules

- 6 digits
- Cryptographically secure
- Hash using bcrypt
- Never store plain OTP
- Expiry = 5 minutes
- Maximum 5 verification attempts
- Maximum 3 resend requests
- Delete record after successful verification

---

## Contact & Quote Rules

Before processing:

- Validate signed cookie
- Reject if cookie missing
- Reject if cookie expired
- Reject if signature invalid

Never trust client state.

---

## Validation

Use Zod for:

- Email
- OTP
- Contact form
- Quote form

Validate again on server.

---

## Security

- Never expose OTP
- Never expose bcrypt hash
- Never trust frontend verification
- Use constant-time comparison via bcrypt
- Rate limit OTP APIs
- Validate origin
- Sanitize inputs
- Use environment variables
- Handle all errors safely
- Log server errors only

---

## Environment Variables

```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY

RESEND_API_KEY
RESEND_FROM_EMAIL

COOKIE_SECRET
```

---

## Coding Standards

- SOLID principles
- Small reusable modules
- Strict TypeScript
- Async/await only
- Centralized error handling
- Shared validation schemas
- No duplicated logic
- Clear folder separation
- Production-ready code

---

## Expected Flow

1. User enters email.
2. Check verification cookie.
3. Skip OTP if cookie valid.
4. Otherwise generate OTP.
5. Hash OTP.
6. Save hash in Firestore.
7. Send OTP through Resend.
8. Verify OTP.
9. Create signed HttpOnly cookie.
10. Submit Contact/Quote Form.
11. Server validates cookie.
12. Process request.
13. Cookie expires after 30 minutes.

Always build this feature with security, scalability, maintainability, and clean architecture as the highest priorities.

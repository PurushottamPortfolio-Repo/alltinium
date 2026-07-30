# Authentication Module

This folder contains reusable authentication utilities.

Contents

- OTP generation
- OTP hashing
- Firestore helpers
- Session helpers
- Cookie helpers
- Shared constants
- Shared types

No business logic should be implemented here.

Business logic belongs inside:

app/api/auth/*

src/
│
├── lib/
│ ├── firebase.ts
│ │
│ └── auth/
│ ├── constants.ts
│ ├── cookies.ts
│ ├── firestore.ts
│ ├── hash.ts
│ ├── index.ts
│ ├── otp.ts
│ ├── README.md
│ ├── session.ts
│ └── types.ts

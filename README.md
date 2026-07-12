# Alltinium

A modern, responsive, and high-performance full-stack portfolio/business website built with **Next.js**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **pnpm**.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- pnpm
- ESLint
- Prettier
- Husky
- lint-staged
- Resend (Email)
- Cloudinary (Media)
- MongoDB

---

## Requirements

- Node.js 20+
- pnpm 10+

Check versions:

```bash
node -v
pnpm -v
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd alltinium
```

Install dependencies:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
RESEND_API_KEY=
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Never commit `.env.local` to Git.

---

## Running the Project

Development:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

## Available Scripts

Start development server:

```bash
pnpm dev
```

Build production:

```bash
pnpm build
```

Run production build:

```bash
pnpm start
```

Lint:

```bash
pnpm lint
```

Format:

```bash
pnpm format
```

Type check:

```bash
pnpm type-check
```

---

## Code Quality

This project uses:

- ESLint
- Prettier
- Husky
- lint-staged

Every commit automatically:

- Checks ESLint
- Formats code
- Prevents committing invalid code

---

## Project Structure

```
src/
│
├── app/
├── components/
├── constants/
├── hooks/
├── lib/
├── providers/
├── styles/
├── types/
└── utils/
```

---

## Deployment

Build:

```bash
pnpm build
```

Production:

```bash
pnpm start
```

Recommended platforms:

- Vercel
- Cloudflare
- Netlify

---

## License

MIT License.

---

Developed with ❤️ using Next.js and pnpm.

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Materials",
    href: "/materials",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--surface-border)] bg-card">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          {/* Left */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-semibold tracking-wide"
            >
              Alltinium
            </Link>

            <p className="max-w-md text-sm leading-7 text-[var(--ink-muted)]">
              Building high-quality industrial solutions with precision, innovation, and long-term
              reliability. Designed for modern manufacturing and engineering excellence.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-[var(--ink)]"
            >
              Let&#39;s work together
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
                Navigation
              </h3>

              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--ink-muted)] transition hover:text-[var(--ink)]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ink)]">
                Contact
              </h3>

              <div className="space-y-3 text-sm text-[var(--ink-muted)]">
                <p>info@alltinium.com</p>
                <p>+91 XXX XX XXXX</p>
                <p>Mon – Fri</p>
                <p>09:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--surface-border)] pt-6 text-sm text-[var(--ink-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Alltinium. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-[var(--ink)]">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-[var(--ink)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

const quickLinks = [
  { title: "About", href: "/about" },
  { title: "Materials", href: "/materials" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--surface-border)] bg-card">
      {/* Top Accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold tracking-wide text-[var(--ink)]"
            >
              Alltinium
            </Link>

            <p className="max-w-lg leading-7 text-[15px] text-[var(--ink-muted)]">
              Aerospace &ndash; grade metals, precision sourcing, and engineering solutions built
              around complete material traceability, quality, and long &ndash; term manufacturing
              partnerships.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-medium text-primary transition-all duration-300 hover:gap-3"
            >
              Let&apos;s build together
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink)]">
              Navigation
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-[15px] text-[var(--ink-muted)] transition-colors duration-300 hover:text-[var(--ink)]"
                  >
                    <span className="relative">
                      {item.title}
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink)]">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-[var(--ink-muted)]">
              <a
                href="mailto:info@alltinium.com"
                className="flex items-center gap-3 transition hover:text-[var(--ink)]"
              >
                <Mail className="h-4 w-4" />
                info@alltinium.com
              </a>

              <p>+91 XXX XX XXXX</p>

              <div>
                <p>Mon &ndash; Fri</p>
                <p>09:00 &ndash; 18:00 IST</p>
              </div>

              <div className="pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-[var(--surface-border)] pt-6">
          <div className="flex flex-col items-center justify-between gap-5 text-sm text-[var(--ink-muted)] md:flex-row">
            <p>&copy; {new Date().getFullYear()} Alltinium Aerometrix. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="transition hover:text-[var(--ink)]">
                Privacy Policy
              </Link>

              <Link href="/terms" className="transition hover:text-[var(--ink)]">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

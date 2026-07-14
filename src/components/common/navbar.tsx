"use client";

import { useState } from "react";
import QuoteButton from "@/components/quote/QuoteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import { assets } from "@/assets";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import MobileMenu from "@/components/common/mobile-menu";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={assets.logo}
              alt="Alltinium Logo"
              width={42}
              height={42}
              priority
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
                Alltinium
              </span>
              <span className="text-xs text-muted-foreground">Aerometrix</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <QuoteButton className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex" />
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background md:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

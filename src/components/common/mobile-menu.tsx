"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { assets } from "@/assets";
import { NAV_LINKS } from "@/constants/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";
// import QuoteButton from "@/components/quote/quote-button";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-[60] flex h-screen w-[85%] max-w-sm flex-col border-l border-border bg-background shadow-2xl md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <Image
                  src={assets.logo}
                  alt="Alltinium Logo"
                  width={42}
                  height={42}
                  className="h-10 w-10 object-contain"
                  priority
                />

                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">Alltinium</h2>

                  <p className="font-body text-xs text-muted-foreground">Aerometrix</p>
                </div>
              </Link>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => {
                  const active = pathname === link.href;

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.06,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block rounded-xl px-4 py-3 font-body text-lg font-medium transition-all",
                          active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="space-y-4 border-t border-border p-6">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Theme</span>

                <ThemeToggle />
              </div>

              {/* <QuoteButton /> */}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

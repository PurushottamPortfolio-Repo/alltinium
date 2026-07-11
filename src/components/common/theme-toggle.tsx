"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "dark", icon: Moon, label: "Dark theme" },
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "system", icon: Laptop, label: "System theme" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — next-themes only knows the real theme client-side
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-28 rounded-full bg-[var(--surface-border)] animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[var(--surface-border)] glass p-1"
      role="radiogroup"
      aria-label="Theme"
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ease-out",
            theme === value
              ? "bg-[var(--color-brand)] text-white"
              : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
          )}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

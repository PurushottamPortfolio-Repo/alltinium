import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "success";
}

export function Badge({ children, dot = false, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-body font-medium transition-colors",

        {
          // Primary
          "border border-primary/20 bg-primary/10 text-primary": variant === "default",

          // Neutral
          "border border-border bg-muted text-muted-foreground": variant === "secondary",

          // Outline
          "border border-border bg-transparent text-foreground": variant === "outline",

          // Success
          "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400":
            variant === "success",
        },

        className,
      )}
    >
      {dot && <span className="size-2 rounded-full bg-current" />}

      {children}
    </span>
  );
}

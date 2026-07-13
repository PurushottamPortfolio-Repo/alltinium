import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-body font-medium text-muted-foreground backdrop-blur-sm",
        className,
      )}
    >
      {dot && <span className="h-2 w-2 rounded-full bg-primary" />}

      {children}
    </span>
  );
}

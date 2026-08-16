import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface QuoteButtonProps {
  children?: ReactNode;
  className?: string;
}

export function ManufactureButton({
  children = "Request Manufacturing",
  className = "",
}: QuoteButtonProps) {
  return (
    <Link href="/manufacturing" className={className}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
    </Link>
  );
}

export default ManufactureButton;

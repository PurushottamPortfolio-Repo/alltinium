"use client";

import React from "react";
import { useQuote } from "@/providers/QuoteProvider";
import { ArrowRight } from "lucide-react";
interface QuoteButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function QuoteButton({ children = "Raise Quote", className = "" }: QuoteButtonProps) {
  const { openModal } = useQuote();

  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
    </button>
  );
}

export default QuoteButton;

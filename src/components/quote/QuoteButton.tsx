"use client";

import React from "react";
import { useQuote } from "@/providers/QuoteProvider";

interface QuoteButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function QuoteButton({ children = "Request a Quote", className = "" }: QuoteButtonProps) {
  const { openModal } = useQuote();

  return (
    <button type="button" onClick={openModal} className={className}>
      {children}
    </button>
  );
}

export default QuoteButton;

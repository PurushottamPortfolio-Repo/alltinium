"use client";

import dynamic from "next/dynamic";
import React, { createContext, useContext, useState } from "react";

const QuoteModal = dynamic(
  () => import("@/components/quote/QuoteModal").then((m) => m.QuoteModal),
  { ssr: false },
);

type QuoteContextValue = {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
};

const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const value: QuoteContextValue = {
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
    isOpen: open,
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onOpenChange={setOpen} />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}

import type { Metadata } from "next";

import { QuoteForm } from "@/components/quote/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote | Material RFQ",
  description: "Submit your material specifications and get a detailed quote within 48 hours.",
};

export default function QuotePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <QuoteForm />
    </main>
  );
}

import type { Metadata } from "next";

import ManufactorPage from "@/components/manufactoring/manufactor";

export const metadata: Metadata = {
  title: "Request a Manufactor Quote | Manufactoring RFQ",
  description: "Submit your manufactoring specifications and get a detailed quote within 48 hours.",
};

export default function ManufactoringPage() {
  return (
    <main className="">
      <ManufactorPage />
    </main>
  );
}

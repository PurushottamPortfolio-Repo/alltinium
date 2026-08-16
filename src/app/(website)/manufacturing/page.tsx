import type { Metadata } from "next";

import ManufactorPage from "@/components/manufacturing/manufacture";

export const metadata: Metadata = {
  title: "Request a Manufacture Quote | Manufacturing RFQ",
  description: "Submit your manufacturing specifications and get a detailed quote within 48 hours.",
};

export default function ManufacturingPage() {
  return (
    <main className="">
      <ManufactorPage />
    </main>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { WhatsAppFloatButton } from "@/components/common/whatsapp-float-button";

export const metadata: Metadata = {
  title: "Alltinium | India's integrated supply chain for aerospace",
  description: "Four services. One supply chain. Zero compromises.",
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}

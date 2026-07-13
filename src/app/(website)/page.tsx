import { ServicesSection } from "@/components/sections/services";
import { MaterialsSection } from "@/components/sections/materials";
import { CTASection } from "@/components/sections/cta";
import dynamic from "next/dynamic";
import { QuoteSection } from "@/components/sections/quote";
import { InsightsSection } from "@/components/sections/insights";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then((module) => module.HeroSection),
  {
    loading: () => <div className="min-h-[40vh]" />,
  },
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="p-5  border border-red-600">
        <ServicesSection />
        <MaterialsSection />
        <CTASection />
        <InsightsSection />
        <QuoteSection />
      </div>
    </>
  );
}

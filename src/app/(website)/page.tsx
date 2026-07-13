import { ServicesSection } from "@/components/sections/services";
import { MaterialsSection } from "@/components/sections/materials";
import { CTASection } from "@/components/sections/cta";
import dynamic from "next/dynamic";
import { TechMarquee } from "@/components/sections/marquee";
import { WhyChooseMe } from "@/components/sections/why-choose-me";
import { NetworkSection } from "@/components/sections/network";
import { IndustriesSection } from "@/components/sections/industries";
import { TrustSection } from "@/components/sections/trust";
import { LatestBlogs } from "@/components/sections/latest-blogs";

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
      <TechMarquee />
      <div className="p-5">
        <MaterialsSection />
        <ServicesSection />
        <WhyChooseMe />
        <NetworkSection />
        <IndustriesSection />
        <TrustSection />
        <CTASection />
        <LatestBlogs />
      </div>
    </>
  );
}

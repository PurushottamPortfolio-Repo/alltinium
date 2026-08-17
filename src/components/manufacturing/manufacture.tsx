import ManufactoringForm from "./forms/manufacture-form";
import { PageHero } from "../ui/page-hero";
import { assets } from "@/assets";
import BuildSection from "./sections/buildfor";
import WorkSection from "./sections/work";
import NetworkSection from "./sections/network";
import RouteSection from "./sections/route";
import CtaSection from "./sections/cta";
import FAQSection from "./sections/faq";

export default function ManufacturePage() {
  return (
    <>
      <PageHero
        image={assets.heroBg}
        title="From drawing to delivered part : One PO, One QA chain, One partner"
        description="Alltinium coordinates precision machining, casting, forging, heat treatment and surface finishing across a vetted network of certified manufacturing partners. So you deal with a single accountable node, not a dozen job shops."
        buttonText="Request a Quote"
        buttonHref="/contact"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Manufacturing",
          },
        ]}
      />
      <BuildSection />
      <WorkSection />
      <NetworkSection />
      <ManufactoringForm />
      <RouteSection />
      <FAQSection />
      <CtaSection />
    </>
  );
}

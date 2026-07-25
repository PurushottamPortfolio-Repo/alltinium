"use client";

import { assets } from "@/assets";
import { PageHero } from "@/components/ui/page-hero";
import ServiceStripe from "./service-stripe";

export function ServicePage() {
  return (
    <>
      <PageHero
        image={assets.heroBg}
        title="Four services. One supply chain. Zero compromises."
        description="Each service was built to remove one of the four bottlenecks that slow aerospace procurement in India: sourcing, processing, testing and manufacturing."
        buttonText="Request a Quote"
        buttonHref="/contact"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Services",
          },
        ]}
      />
      <section className="relative PY-10 px-4">
        <div className="container p-4">
          {/* <h1 className="text-3xl ">One four supply chain and critical capabilities</h1> */}
          {/* Cards */}
          <ServiceStripe />
        </div>
      </section>
    </>
  );
}

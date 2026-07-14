"use client";

import { assets } from "@/assets";
import { PageHero } from "@/components/ui/page-hero";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/common/cards/service-card";

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
      <section className="relative PY-10">
        <div className="container px-4 mb-20">
          {/* Cards */}

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

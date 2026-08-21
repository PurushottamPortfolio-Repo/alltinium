"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { ServiceCard } from "@/components/common/cards/service-card";

export function ServicesSection() {
  return (
    <section className="relative bg-servicebg">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16"
        >
          <div className="max-w-3xl">
            <span className="mb-3 inline-block rounded-md bg-primary/10 px-4 py-2 text-sm font-medium font-heading text-primary">
              FOUR PILLARS
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading sm:text-4xl lg:text-5xl">
              One supply chain and four critical capabilities
            </h2>

            <p className="mt-5 max-w-2xl text-base font-body text-muted-foreground sm:text-lg">
              From the mill to the machined part - we close the loop so your QA, procurement and
              engineering teams talk to a single partner
            </p>
          </div>

          <div className="space-x-5">
            <Link
              href="/materials"
              className="p-2 rounded-md bg-accent-foreground/40 items-center font-semibold text-primary/70 hover:text-primary hover:border hover:border-primary"
            >
              Materials
            </Link>
            <Link
              href="/manufacturing"
              className="p-2 rounded-md bg-accent-foreground/40 items-center font-semibold text-primary/70 hover:text-primary hover:border hover:border-primary"
            >
              Manufacturing
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

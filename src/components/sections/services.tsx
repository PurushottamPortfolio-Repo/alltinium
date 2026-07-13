"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { ServiceCard } from "@/components/common/cards/service-card";

export function ServicesSection() {
  return (
    <section className="relative PY-10">
      <div className="container">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary font-heading">
              FOUR PILLARS
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              One supply chain.
              <br />
              Four critical capabilities.
            </h2>

            <p className="mt-5 max-w-2xl text-muted-foreground">
              From the mill to the machined part — we close the loop so your QA, procurement and
              engineering teams talk to a single partner.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-semibold text-primary"
          >
            View All Services
            <ArrowRight size={18} className="transition group-hover:translate-x-2" />
          </Link>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

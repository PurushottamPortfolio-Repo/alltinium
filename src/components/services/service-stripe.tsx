"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { services } from "@/data/services";

export default function ServiceStripe() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Services
          </span>

          <h2 className="text-4xl font-bold tracking-tight">
            One Supply Chain. Four Critical Capabilities.
          </h2>

          <p className="mt-4 text-muted-foreground">
            From certified aerospace metals to precision manufacturing, we provide a complete,
            traceable supply chain trusted by India&apos;s advanced engineering industries.
          </p>
        </div>

        {/* Services */}

        <div className="divide-y divide-border border-y border-border">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="grid gap-10 py-12 lg:grid-cols-5 lg:items-center"
              >
                {/* Image */}

                <div className="relative h-90 overflow-hidden rounded-md lg:col-span-2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                {/* Content */}

                <div className="lg:col-span-3">
                  <div className="flex gap-5">
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-3xl font-bold mt-2">{service.title}</h3>
                  </div>
                  <p className="mb-5 text-lg font-medium text-primary">{service.description}</p>

                  <p className="leading-8 text-muted-foreground">{service.message}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

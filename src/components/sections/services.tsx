"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { ServiceCard } from "@/components/common/cards/service-card";

export function ServicesSection() {
  return (
    <section className="relative ">
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
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              All Services
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Building Modern Digital
              <br />
              Experiences
            </h2>

            <p className="mt-5 max-w-2xl text-muted-foreground">
              From beautiful interfaces to secure backend systems, I build complete digital products
              that are scalable, maintainable and user-focused.
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

// export function ServicesSection() {
//   return (
//     <section className="py-20">
//       <div className="container">
//         <h2 className="text-3xl font-bold text-center">Our Services</h2>
//         <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-4">
//           We offer a wide range of services to help you achieve your goals.
//         </p>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { TrustSectionData } from "@/data/mock";
import { CertificationBadge } from "@/components/ui/certification-badge";

export function TrustSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="font-heading inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            Trust & Compliance
          </span>

          <h2 className="font-heading mt-5 text-4xl font-bold lg:text-5xl">
            Certified for quality and reliability.
          </h2>

          <p className="font-body mt-5 text-muted-foreground">
            Industry-recognized certifications and registrations that reflect our commitment to
            quality, compliance, and operational excellence.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {TrustSectionData.map((item) => (
            <CertificationBadge key={item.id} title={item.title} icon={item.icon as never} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

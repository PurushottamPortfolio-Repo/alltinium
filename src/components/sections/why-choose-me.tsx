"use client";

import { motion } from "framer-motion";
import { Layers, MessageSquare, ShieldCheck, Zap } from "lucide-react";

const REASONS = [
  {
    icon: Zap,
    title: "Founded",
    detail:
      "Built by aerospace and defence professionals with mission-critical supply chain experience.",
  },
  {
    icon: ShieldCheck,
    title: "Mill-Direct",
    detail: "Authorised distribution partnerships with leading mills.",
  },
  {
    icon: MessageSquare,
    title: "100% MTC",
    detail: "Full traceability - MTC chain, sample retention, NADCAP-aligned.",
  },
  {
    icon: Layers,
    title: "Made-in-India",
    detail: "Aligned with MAKE-II, iDEX and offset obligations.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

export function WhyChooseMe() {
  return (
    <section className="relative rounded-md border">
      {/* Heading */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center"
        >
          <span className="font-heading inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why Choose Us
          </span>

          <h2 className="font-heading mt-6 text-3xl font-bold tracking-tight">
            Engineering quality into every project.
          </h2>

          <p className="font-body mt-5 text-md leading-6 text-muted-foreground">
            We don&apos;t just build beautiful interfaces, we create scalable, performant, and
            maintainable digital products designed for business growth.
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {REASONS.map(({ icon: Icon, title, detail }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="flex item-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-7" />
                </div>

                <h3 className="font-heading text-xl font-semibold">{title}</h3>
              </div>

              <p className="font-body mt-2 leading-5 text-muted-foreground">{detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

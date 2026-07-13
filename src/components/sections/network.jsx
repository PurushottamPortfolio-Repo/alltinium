"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NetworkSectionData } from "@/data/mock";

export function NetworkSection() {
  return (
    <section className="relative py-10 ">
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
              Beyond raw material
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Get the part — through our certified network.
            </h2>

            <p className="mt-5 max-w-2xl text-muted-foreground">
              Pre-qualified AS9100/9120, EN9120 and NADCAP partners. You raise one PO; we
              consolidate QA, MTC and part traceability end-to-end.
            </p>
          </div>

          <Link
            href="/networks"
            className="group inline-flex items-center gap-2 font-semibold text-primary"
          >
            View All Networks
            <ArrowRight size={18} className="transition group-hover:translate-x-2" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {NetworkSectionData.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-white/15"
            >
              <div className="flex h-full items-center justify-center">
                <h3 className="font-heading text-center text-lg font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

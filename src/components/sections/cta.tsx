"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CtaSectionData } from "@/data/mock";

export function CTASection() {
  return (
    <section className="mt-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="overflow-hidden border border-border bg-card shadow-xl"
      >
        <div className="grid gap-12 p-8 lg:grid-cols-[1.3fr_0.9fr] lg:p-14 bg-gradient-to-r from-background to-primary rounded-md">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center "
          >
            <span className="font-heading inline-flex w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              RFQ • 48 HR SLA
            </span>

            <h2 className="font-heading mt-6 max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">
              Need a quote on aerospace-grade material?
            </h2>

            <p className="font-body mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Get a structured response with MTC certification, lead time, and landed cost within{" "}
              <strong>48 business hours.</strong> No commodity-trader noise—only engineered answers.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-all hover:cursor-pointer hover:scale-105 hover:bg-primary/90">
                Submit an RFQ
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="inline-flex items-center rounded-full border border-border hover:cursor-pointer px-6 py-3 font-body font-semibold transition hover:bg-muted">
                Talk to Engineering
              </button>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {CtaSectionData.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.45,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm transition-all"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="font-body text-sm text-muted-foreground">{item.title}</p>

                  <h3 className="font-heading mt-2 text-2xl font-bold">{item.value}</h3>

                  <p className="font-body mt-2 text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

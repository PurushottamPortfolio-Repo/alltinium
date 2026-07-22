"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NetworkSectionData } from "@/data/mock";

export function NetworkSection() {
  return (
    <section className="relative p-4 py-8 bg-primary/5 rounded-md border-border">
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

          <h2 className="mt-3 text-3xl font-bold font-heading tracking-tight">
            Get the part — through our certified network.
          </h2>

          <p className="mt-5 max-w-2xl text-muted-foreground font-body">
            Pre-qualified AS9100/9120, EN9120 and NADCAP partners. You raise one PO; we consolidate
            QA, MTC and part traceability end-to-end.
          </p>
        </div>
        <Link href="/networks" className="group inline-flex items-center gap-2 text-primary">
          View All Networks
          <ArrowRight size={18} className="transition group-hover:translate-x-2" />
        </Link>
      </motion.div>

      {/* Network Map */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl"
      >
        <div className="relative mx-auto h-[520px] w-full max-w-6xl">
          {/* SVG Connections */}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            {[
              [150, 250, 350, 120],
              [150, 250, 350, 380],
              [350, 120, 520, 250],
              [350, 380, 520, 250],
              [520, 250, 700, 120],
              [520, 250, 700, 380],
              [700, 120, 880, 250],
              [700, 380, 880, 250],
            ].map((line, index) => (
              <motion.line
                key={index}
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="currentColor"
                className="text-primary/25 dark:text-accent/25"
                strokeWidth="2"
                strokeDasharray="10 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.08,
                }}
              />
            ))}
          </svg>

          {/* Nodes */}

          {[
            {
              title: "Raw Material",
              left: "8%",
              top: "45%",
            },
            {
              title: "Forging",
              left: "28%",
              top: "18%",
            },
            {
              title: "Machining",
              left: "28%",
              top: "72%",
            },
            {
              title: "Quality",
              left: "48%",
              top: "45%",
            },
            {
              title: "Heat Treatment",
              left: "68%",
              top: "18%",
            },
            {
              title: "Surface Finish",
              left: "68%",
              top: "72%",
            },
            {
              title: "Final Assembly",
              left: "88%",
              top: "45%",
            },
          ].map((node, index) => (
            <motion.div
              key={node.title}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.08,
                y: -5,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: node.left,
                top: node.top,
              }}
            >
              <div className="group flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl dark:bg-accent dark:text-primary"
                >
                  <div className="absolute h-full w-full rounded-full border-2 border-primary/30 dark:border-accent/30 animate-ping" />

                  <div className="h-4 w-4 rounded-full bg-accent dark:bg-background" />
                </motion.div>

                <div className="mt-4 rounded-xl border border-border bg-background/80 px-4 py-2 text-center shadow-lg backdrop-blur">
                  <p className="font-heading text-sm font-semibold text-foreground">{node.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

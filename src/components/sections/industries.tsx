"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IndustriesSectionData } from "@/data/mock";

export function IndustriesSection() {
  return (
    <section className="relative py-10  px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none ">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-secondary/6 blur-3xl" />
      </div>

      {/* Floating orbits */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-1/4 top-0 h-full w-px bg-border"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute left-3/4 top-0 h-full w-px bg-border"
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />
      </div>

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
            Industries
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Get the part — through our certified network.
          </h2>

          {/* <p className="mt-5 text-muted-foreground">
            Pre-qualified AS9100/9120, EN9120 and NADCAP partners. You raise one PO; we consolidate
            QA, MTC and part traceability end-to-end.
          </p> */}
        </div>
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
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {IndustriesSectionData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 25 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <Link
              href={item.href ?? "#"}
              className="group relative flex h-24 overflow-hidden rounded-md border border-border bg-card p-7 transition-all duration-300 hover:border-accent hover:shadow-xl"
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-accent/30"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${15 + (i % 4) * 18}%`,
                    }}
                    animate={{
                      y: [-6, 8, -6],
                      x: [-2, 3, -2],
                      opacity: [0.15, 0.5, 0.15],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 4 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Background Number */}
              <span className=" absolute right-5 top-4 text-7xl font-black text-primary/5 transition-all duration-300 group-hover:text-primary/10">
                {(index + 1).toString().padStart(2, "0")}
              </span>

              {/* Left Accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-accent scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  {/* <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Industry
                  </p> */}

                  <h3 className="font-heading text-3xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

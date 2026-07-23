"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MATERIALS } from "./materials-data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 40,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.55,
//       ease: "easeOut",
//     },
//   },
// };

export default function MaterialGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-8 lg:grid-cols-3"
    >
      {MATERIALS.map((material) => (
        <motion.article
          key={material.id}
          // variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.015,
          }}
          transition={{
            duration: 0.3,
          }}
          className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
        >
          {/* Decorative Blur */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:scale-125" />

          {/* Animated Top Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute left-0 top-0 h-1 w-full origin-left bg-primary"
          />

          <div className="relative flex h-full flex-col p-7">
            {/* Header */}

            <div className="space-y-5">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Badge variant="custom">{material.title}</Badge>
              </motion.div>

              <p className="text-sm leading-7 text-muted-foreground">{material.description}</p>
            </div>

            {/* Series */}

            <div className="mt-8 flex-1 space-y-5">
              {material.series.map((series, index) => (
                <motion.div
                  key={series.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.4,
                  }}
                  className="rounded-2xl border border-border/70 bg-background/60 p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30"
                >
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{series.title}</h3>

                  {/* Grades */}

                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {series.grades.map((grade) => (
                        <motion.div
                          key={grade}
                          whileHover={{
                            y: -2,
                            scale: 1.05,
                          }}
                        >
                          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                            {grade}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Forms */}

                  <div className="flex flex-wrap gap-2">
                    {series.forms.map((form) => (
                      <motion.div
                        key={form.id}
                        whileHover={{
                          scale: 1.05,
                        }}
                      >
                        <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px]">
                          {form.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}

            <div className="my-7 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Buttons */}

            <div className="grid gap-3 sm:grid-cols-2">
              <motion.div
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href="/contact"
                  className="group/button flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                >
                  Request RFQ
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <Link
                  href={material.datasheet.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <FileText className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-6" />
                  Datasheet
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

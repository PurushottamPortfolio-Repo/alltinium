"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import MaterialGrid from "@/components/material1/material-card";

export function MaterialsSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16"
        >
          <div className="max-w-3xl">
            <span className="mb-3 inline-block rounded-md bg-primary/10 px-4 py-2 text-sm font-medium font-heading text-primary">
              Catalogue
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading sm:text-4xl lg:text-5xl">
              Materials We Stock
            </h2>

            <p className="mt-5 max-w-2xl text-base font-body text-muted-foreground sm:text-lg">
              Aerospace-grade material families with mill-traceable specifications, ready for
              machining and production
            </p>
          </div>

          <Link
            href="/materials"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-primary"
          >
            Browse Full Catalogue
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </motion.div>

        <div>
          <MaterialGrid />
        </div>
      </div>
    </section>
  );
}

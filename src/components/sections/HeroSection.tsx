"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const QuoteModal = dynamic(
  () => import("@/components/quote/QuoteModal").then((module) => module.QuoteModal),
  {
    ssr: false,
  },
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Industrial-grade digital experiences
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Precision engineering for modern aerospace and manufacturing brands.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We design high-performing websites, portals, and product stories that help ambitious
            teams move faster and win trust.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <QuoteModalTrigger />
          <a
            href="/about"
            className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function QuoteModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Request a Quote
      </button>
      <QuoteModal open={open} onOpenChange={setOpen} />
    </>
  );
}

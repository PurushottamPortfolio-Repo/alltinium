"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section className="container py-28">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-full bg-primary/10 px-4 py-2 text-primary"
      >
        Our Services
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 max-w-4xl text-6xl font-bold"
      >
        Building Secure, Modern & Scalable Software
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 max-w-3xl text-lg text-muted-foreground"
      >
        I design and develop high-performance web applications, modern UI/UX, scalable backend
        systems and secure cloud solutions tailored to your business.
      </motion.p>
    </section>
  );
}

"use client";

import Image from "next/image";
import QuoteButton from "@/components/quote/QuoteButton";
import { motion } from "framer-motion";
import { assets } from "@/assets";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      <div className="absolute inset-0 z-0">
        <Image
          src={assets.heroBg}
          alt="Hero background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-0 bg-black/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
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
          <QuoteButton className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90" />
          <a
            href="/about"
            className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
          >
            Explore Services
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  alloy: "Ti-6Al-4V",
                  grade: "Grade 5",
                },
                {
                  alloy: "Inconel 718",
                  grade: "AMS 5662",
                },
                {
                  alloy: "Al 7075-T651",
                  grade: "AMS 4045",
                },
                {
                  alloy: "300M Steel",
                  grade: "AMS 6257",
                },
              ].map((item) => (
                <motion.div
                  key={item.alloy}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  className="rounded-2xl border border-white/10 bg-background/80 p-5 text-center transition"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {item.alloy}
                  </h3>

                  <p className="font-body mt-2 text-sm text-muted-foreground">{item.grade}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

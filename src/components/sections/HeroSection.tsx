"use client";

import Image from "next/image";
import QuoteButton from "@/components/quote/QuoteButton";
import { motion } from "framer-motion";
import { assets } from "@/assets";

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
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

      {/* <div className="absolute inset-0 z-0 bg-" /> */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" /> */}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex rounded-full border-border bg-background px-3 py-1 text-sm font-medium text-foreground">
            Tailored solutions for Aerospace, Automo ve and Energy Industries.
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            India&apos;s integrated supply chain for aerospace-grade metals and alloys
          </h1>
          <p className="mt-5 max-w-2xl text-md">
            From mill to line, one integrated metal supply chain.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}

          className="flex flex-wrap gap-3"
        >
          <motion.div
            whileHover={{
              y: -6,
              scale: 1.03,
            }}
          >
            <QuoteButton className="inline-flex items-center rounded-sm px-5 py-3 text-sm font-semibold text-primary ring bg-background transition hover:cursor-pointer" />
          </motion.div>
          <motion.div
            whileHover={{
              y: -6,
              scale: 1.03,
            }}
          >
            <a
              href="/services"
              className="inline-flex items-center rounded-sm border border-border ring-1 bg-background px-5 py-3 text-sm font-semibold text-foreground transition"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-6xl rounded-md ring p-4 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                {
                  alloy: "Aluminium",
                  grade: "Series(2K, 5K, 6K, 7K)",
                },
                {
                  alloy: "Titanium",
                  grade: "(Pure, Alpha-Beta, Elevated-Temp, Beta)",
                },
                {
                  alloy: "Nickel",
                  grade: "(Inconel, Hastelloy, Waspaloy, Monel)",
                },
                {
                  alloy: "Special Steel",
                  grade: "(Stainless, Austenitic, HSLA, Maraging)",
                },
                {
                  alloy: "Tungsten",
                  grade: "(Heavy Alloy, Pure, Powder & Carbide)",
                },
                {
                  alloy: "Critical & Strategic",
                  grade: "(Refractory, Strategic, Superalloy Feedstock)",
                },
              ].map((item) => (
                <motion.div
                  key={item.alloy}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  className="rounded-xl border border-white/10 bg-background/80 p-5 text-center transition"
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

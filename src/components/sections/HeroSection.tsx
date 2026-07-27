"use client";

import Image from "next/image";
import QuoteButton from "@/components/quote/QuoteButton";
import { motion } from "framer-motion";
import { assets } from "@/assets";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative max-h-[95vh] overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 text-white px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            India&apos;s integrated supply chain for aerospace-grade metals and alloys
          </h1>
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
          className="mt-4 flex justify-center"
        >
          <div className="w-full max-w-6xl rounded-md bg-background/80 p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              {[
                { alloy: "Aluminium", href: "/materials" },
                { alloy: "Titanium", href: "/materials" },
                { alloy: "Nickel", href: "/materials" },
                { alloy: "Special Steel", href: "/materials" },
                { alloy: "Tungsten", href: "/materials" },
                { alloy: "Critical & Strategic", href: "/materials" },
              ].map((item) => (
                <Link key={item.alloy} href={item.href} className="block">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex h-full cursor-pointer items-center justify-center rounded-md border p-3 text-center backdrop-blur-xl transition-colors hover:bg-red-500/10"
                  >
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {item.alloy}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

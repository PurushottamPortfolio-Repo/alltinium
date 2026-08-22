"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  const targetId = "services";

  return (
    <div className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-8 bg-background px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="h-8 w-8" />
        </div>

        <div className="space-y-3">
          <p className="font-heading text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto max-w-md text-base leading-7 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Head back home,
            or browse what we offer.
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href={`/#${targetId}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-body font-semibold text-foreground transition hover:scale-105 hover:bg-muted"
          >
            All Services
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

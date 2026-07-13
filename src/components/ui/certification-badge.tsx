"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

type Props = {
  title: string;
  icon: keyof typeof Icons;
};

export function CertificationBadge({ title, icon }: Props) {
  const Icon = Icons[icon] as React.ElementType;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.04,
      }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-lg"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

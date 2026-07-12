"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/types/service";

interface Props {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: Props) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.15,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Icon size={34} />
        </div>

        <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>

        <p className="mb-8 leading-7 text-muted-foreground">{service.description}</p>

        <Link
          href={service.href}
          className="inline-flex items-center gap-2 font-medium text-primary transition group-hover:gap-4"
        >
          Learn More
          <ArrowUpRight size={18} className="transition group-hover:rotate-45" />
        </Link>
      </div>
    </motion.article>
  );
}

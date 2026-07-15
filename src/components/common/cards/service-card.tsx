"use client";

import Image from "next/image";
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
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
      }}
      whileHover={{
        y: -10,
      }}
      className="group relative overflow-hidden rounded-sm border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Image */}
      <div className="relative h-50 overflow-hidden rounded-t-md">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
        />

        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-bl via-black/10 to-transparent" /> */}

        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Icon */}
        {/* <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon size={32} />
        </div> */}

        {/* Title */}
        <h3 className="mb--2 text-xl font-heading transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-muted-foreground">{service.description}</p>

        {/* Button */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-medium text-primary transition-all duration-300 group-hover:gap-4"
        >
          Learn More
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </Link>
      </div>
    </motion.article>
  );
}

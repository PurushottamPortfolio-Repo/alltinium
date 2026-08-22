"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Service } from "@/types/service";

interface Props {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: Props) {
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
      className="group relative overflow-hidden rounded-sm border bg-card transition-all duration-500 hover:border-primary/40 hover:shadow-2xl "
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

        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Title */}
        <h3 className="mb--2 text-xl font-heading transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
        <p className="text-justify text-sm mt-1">{service.description}</p>
      </div>
    </motion.article>
  );
}

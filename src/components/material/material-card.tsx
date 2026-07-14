"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Material } from "@/types/material";

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Image */}

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={material.image.src}
          alt={material.image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4">
          <Badge>{material.category}</Badge>
        </div>
      </div>

      {/* Content */}

      <div className="space-y-5 p-6">
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground">{material.title}</h3>

          <p className="font-body mt-1 text-muted-foreground">Grade {material.grade}</p>
        </div>

        {/* Form */}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{material.form}</Badge>
        </div>

        {/* Specifications */}

        <div>
          <p className="font-heading mb-2 text-sm font-semibold uppercase tracking-wide">
            Specifications
          </p>

          <div className="flex flex-wrap gap-2">
            {material.specifications.map((spec) => (
              <Badge key={spec} variant="outline">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        {/* Applications */}

        <div>
          <p className="font-heading mb-2 text-sm font-semibold uppercase tracking-wide">
            Applications
          </p>

          <div className="flex flex-wrap gap-2">
            {material.applications.map((app) => (
              <Badge key={app} variant="secondary">
                {app}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}

        <div className="grid grid-cols-2 gap-3 pt-4">
          {/* RFQ */}

          <Link
            href="/contact"
            className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg active:scale-95"
          >
            RFQ
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>

          {/* Datasheet */}

          <Link
            href={material.datasheet.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-body font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-lg active:scale-95"
          >
            <FileText className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-6" />
            Datasheet
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

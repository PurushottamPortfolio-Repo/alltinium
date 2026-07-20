"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Material } from "@/types/material";
import { MATERIAL_CATEGORIES } from "@/data/materials/categories";
import { MATERIAL_FORMS } from "@/data/materials/forms";

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  const categoryName =
    MATERIAL_CATEGORIES.find((c) => c.id === material.category)?.name || material.category;

  const formName = MATERIAL_FORMS.find((f) => f.id === material.form)?.name || material.form;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Image */}

      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
        <Image
          src={material.image.src}
          alt={material.image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4">
          <Badge variant="custom">{categoryName}</Badge>
        </div>
      </div>

      {/* Content */}

      <div className="flex h-full flex-col gap-5 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
              {material.grade}
            </h3>
          </div>
          {/* Form */}

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs sm:text-sm">
              {formName}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {/* Specifications */}

          <div>
            <p className="font-heading mb-3 text-sm font-semibold uppercase tracking-wide text-foreground sm:text-[0.95rem]">
              Specifications
            </p>

            <div className="flex flex-wrap gap-2">
              {material.specifications.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-[0.68rem] sm:text-[0.78rem]">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Applications */}

          <div>
            <p className="font-heading mb-3 text-sm font-semibold uppercase tracking-wide text-foreground sm:text-[0.95rem]">
              Applications
            </p>

            <div className="flex flex-wrap gap-2">
              {material.applications.map((app) => (
                <Badge key={app} variant="secondary" className="text-[0.68rem] sm:text-[0.78rem]">
                  {app}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/contact"
            className="group/button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg active:scale-95"
          >
            RFQ
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>

          <Link
            href={material.datasheet.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-lg active:scale-95"
          >
            <FileText className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-6" />
            Datasheet
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

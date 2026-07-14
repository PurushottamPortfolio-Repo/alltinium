"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MaterialGrid } from "@/components/material/material-grid";
import { loadFeaturedMaterials } from "@/data/materials/loader";
import type { Material } from "@/types/material";

export function MaterialsSection() {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    let isMounted = true;

    loadFeaturedMaterials(3).then((loaded) => {
      if (isMounted) {
        setMaterials(loaded);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative py-10">
      <div className="container">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary font-heading">
              Catalogue
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">Materials we stock</h2>

            <p className="mt-5 max-w-2xl text-muted-foreground">
              Aerospace-grade families with mill-traceable specifications.
            </p>
          </div>

          <Link
            href="/materials"
            className="group inline-flex items-center gap-2 font-semibold text-primary"
          >
            Browse full catalogue
            <ArrowRight size={18} className="transition group-hover:translate-x-2" />
          </Link>
        </motion.div>

        {materials.length > 0 ? (
          <div className="mb-8">
            <MaterialGrid materials={materials} />
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
            Loading materials...
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Material } from "@/types/material";
import { MaterialCard } from "./material-card";
import { EmptyState } from "./empty-state";

interface MaterialGridProps {
  materials: Material[];
}

export function MaterialGrid({ materials }: MaterialGridProps) {
  if (materials.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div layout className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {materials.map((material, index) => (
          <motion.div
            key={material.id}
            layout
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
            }}
          >
            <MaterialCard material={material} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

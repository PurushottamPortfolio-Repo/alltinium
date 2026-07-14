"use client";

import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  onClear?: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center rounded-3xl border border-dashed border-border bg-card px-10 py-24 text-center"
    >
      <div className="rounded-full bg-primary/10 p-6">
        <PackageSearch className="h-12 w-12 text-primary" />
      </div>

      <h2 className="font-heading mt-8 text-3xl font-bold">No materials found</h2>

      <p className="font-body mt-4 max-w-lg text-muted-foreground">
        We couldn&#39;t find any material matching your search and filters.
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="mt-8 rounded-xl bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Clear Filters
        </button>
      )}
    </motion.div>
  );
}

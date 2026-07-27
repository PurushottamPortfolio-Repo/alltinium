"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

import { steps } from "@/lib/forms/quote-schema";

type QuoteProgressProps = {
  step: number;
};

export function QuoteProgress({ step }: QuoteProgressProps) {
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="mb-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            RFQ: Material Quote Request
          </p>
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Get your quote today.
          </h1>
        </div>
        <div className="w-full sm:w-56">
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {steps.map((item, index) => (
          <span key={item.title} className="flex items-center gap-2">
            {index <= step ? (
              <CheckCircle2 size={16} className="text-primary" />
            ) : (
              <Circle size={16} />
            )}
            <span className={index === step ? "font-medium text-foreground" : ""}>
              {item.title}
            </span>
            {index < steps.length - 1 && <span className="text-border">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

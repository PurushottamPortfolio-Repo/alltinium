import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { MAX_LENGTHS, type RFQFormValues } from "@/lib/forms/quote-schema";

type QuoteStepRequirementsProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
};

export function QuoteStepRequirements({ register }: QuoteStepRequirementsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">NDT requirements</span>
        <input
          {...register("ndtrequirements")}
          maxLength={MAX_LENGTHS.ndtrequirements}
          placeholder="e.g. Polished, Brushed, As-rolled"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Heat Treatment</span>
        <input
          {...register("heatTreatment")}
          maxLength={MAX_LENGTHS.heatTreatment}
          placeholder="e.g. Annealed, Aged, Solution treated"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Packaging</span>
        <input
          {...register("packaging")}
          maxLength={MAX_LENGTHS.packaging}
          placeholder="e.g. DIN 17200, ASTM E10, MIL Spec"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Special Requirements</span>
        <textarea
          {...register("specialRequirements")}
          maxLength={MAX_LENGTHS.specialRequirements}
          placeholder="Any additional specifications or requirements"
          rows={4}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>
    </div>
  );
}

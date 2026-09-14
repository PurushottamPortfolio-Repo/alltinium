"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
  MATERIAL_LINE_MAX_LENGTHS,
  materialFamilies,
  type RFQFormValues,
} from "@/lib/forms/quote-schema";

type QuoteStepRequirementsProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
  control: Control<RFQFormValues>;
};

function familyLabel(familyId: string) {
  return materialFamilies.find((family) => family.value === familyId)?.label ?? familyId;
}

export function QuoteStepRequirements({ register, control }: QuoteStepRequirementsProps) {
  const { fields } = useFieldArray({ control, name: "materials" });
  const materials = useWatch({ control, name: "materials" }) ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(fields.length ? 0 : null);

  if (fields.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Add at least one material on the previous step to set its requirements.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Requirements are optional and specific to each material. Select a material below to fill
        them in.
      </p>

      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => {
          const line = materials[index];
          const hasRequirements = Boolean(
            line?.surfaceFinish ||
            line?.ndtrequirements ||
            line?.heatTreatment ||
            line?.packaging ||
            line?.specialRequirements,
          );

          return (
            <button key={field.id} type="button" onClick={() => setOpenIndex(index)}>
              <Badge
                dot={hasRequirements}
                variant={openIndex === index ? "default" : "secondary"}
                className="cursor-pointer"
              >
                {familyLabel(line?.materialFamily ?? field.materialFamily)}
                {line?.grade ? ` — ${line.grade}` : ""}
              </Badge>
            </button>
          );
        })}
      </div>

      {openIndex !== null && fields[openIndex] && (
        <div
          key={fields[openIndex].id}
          className="mt-4 grid gap-4 rounded-xl border border-border p-4 md:grid-cols-2"
        >
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Surface Finish (optional)</span>
            <input
              {...register(`materials.${openIndex}.surfaceFinish`)}
              maxLength={MATERIAL_LINE_MAX_LENGTHS.surfaceFinish}
              placeholder="e.g. Polished, Brushed, As-rolled"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">NDT requirements (optional)</span>
            <input
              {...register(`materials.${openIndex}.ndtrequirements`)}
              maxLength={MATERIAL_LINE_MAX_LENGTHS.ndtrequirements}
              placeholder="e.g. DIN 17200, ASTM E10, MIL Spec"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Heat Treatment (optional)</span>
            <input
              {...register(`materials.${openIndex}.heatTreatment`)}
              maxLength={MATERIAL_LINE_MAX_LENGTHS.heatTreatment}
              placeholder="e.g. Annealed, Aged, Solution treated"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Packaging (optional)</span>
            <input
              {...register(`materials.${openIndex}.packaging`)}
              maxLength={MATERIAL_LINE_MAX_LENGTHS.packaging}
              placeholder="e.g. Seaworthy export crate, palletized"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">
              Special Requirements (optional)
            </span>
            <textarea
              {...register(`materials.${openIndex}.specialRequirements`)}
              maxLength={MATERIAL_LINE_MAX_LENGTHS.specialRequirements}
              placeholder="Any additional specifications or requirements"
              rows={4}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </label>
        </div>
      )}
    </div>
  );
}

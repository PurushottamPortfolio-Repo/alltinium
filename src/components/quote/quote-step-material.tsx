import { getFormsByGrade, getGrades } from "@/lib/materials/utils";
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { X } from "lucide-react";
import { useFieldArray, useWatch } from "react-hook-form";
import {
  MATERIAL_LINE_MAX_LENGTHS,
  emptyMaterialLine,
  materialFamilies,
  type RFQFormValues,
} from "@/lib/forms/quote-schema";
import { Badge } from "@/components/ui/badge";

import { MaterialFamilySelect } from "./material-family-select";

type QuoteStepMaterialProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
  control: Control<RFQFormValues>;
  setValue: UseFormSetValue<RFQFormValues>;
};

function familyLabel(familyId: string) {
  return materialFamilies.find((family) => family.value === familyId)?.label ?? familyId;
}

export function QuoteStepMaterial({ register, errors, control, setValue }: QuoteStepMaterialProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "materials" });
  const materials = useWatch({ control, name: "materials" }) ?? [];

  const selectedFamilies = fields.map((field) => field.materialFamily);

  function toggleFamily(familyId: string) {
    const existingIndex = fields.findIndex((field) => field.materialFamily === familyId);

    if (existingIndex >= 0) {
      remove(existingIndex);
    } else {
      append({ ...emptyMaterialLine, materialFamily: familyId });
    }
  }

  const arrayError = errors.materials?.message ?? errors.materials?.root?.message;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MaterialFamilySelect
        selectedFamilies={selectedFamilies}
        onToggle={toggleFamily}
        errorMessage={arrayError}
      />

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground md:col-span-2">
          Select one or more material families above to begin.
        </p>
      )}

      {fields.map((field, index) => {
        const materialFamily = materials[index]?.materialFamily ?? field.materialFamily;
        const grade = materials[index]?.grade ?? "";

        const grades = getGrades(materialFamily);
        const forms = getFormsByGrade(materialFamily, grade);

        const lineErrors = errors.materials?.[index];

        return (
          <div
            key={field.id}
            className="grid gap-4 rounded-xl border border-border p-4 md:col-span-2 md:grid-cols-2"
          >
            <div className="flex items-center justify-between md:col-span-2">
              <Badge variant="secondary">{familyLabel(materialFamily)}</Badge>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Remove ${familyLabel(materialFamily)}`}
              >
                <X size={16} />
              </button>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Grade *</span>
              <select
                {...register(`materials.${index}.grade`)}
                onChange={(event) => {
                  setValue(`materials.${index}.grade`, event.target.value);
                  setValue(`materials.${index}.form`, "");
                }}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              >
                <option value="">Select Grade</option>
                {grades.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {lineErrors?.grade && (
                <p className="mt-1 text-sm text-red-600">{lineErrors.grade.message}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Specification (optional)</span>
              <input
                {...register(`materials.${index}.specification`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.specification}
                placeholder="e.g. AMS 4928"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Form *</span>
              <select
                {...register(`materials.${index}.form`)}
                disabled={!grade}
                title={!grade ? "Select Grade first" : ""}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              >
                <option value="">Select Form</option>
                {forms.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {lineErrors?.form && (
                <p className="mt-1 text-sm text-red-600">{lineErrors.form.message}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Temper / Condition (optional)
              </span>
              <input
                {...register(`materials.${index}.temper`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.temper}
                placeholder="e.g. T651, Solution + Aged"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Units *</span>
              <select
                {...register(`materials.${index}.units`)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              >
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Length (optional)</span>
              <input
                {...register(`materials.${index}.length`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.length}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Width (optional)</span>
              <input
                {...register(`materials.${index}.width`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.width}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Thickness (optional)</span>
              <input
                {...register(`materials.${index}.thickness`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.thickness}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Diameter (optional)</span>
              <input
                {...register(`materials.${index}.diameter`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.diameter}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Quantity *</span>
              <input
                {...register(`materials.${index}.quantity`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.quantity}
                placeholder="e.g. 500 kg / 200 pcs"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
              {lineErrors?.quantity && (
                <p className="mt-1 text-sm text-red-600">{lineErrors.quantity.message}</p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">
                Required Tolerance (optional)
              </span>
              <input
                {...register(`materials.${index}.tolerance`)}
                maxLength={MATERIAL_LINE_MAX_LENGTHS.tolerance}
                placeholder="e.g. ±0.2 mm"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

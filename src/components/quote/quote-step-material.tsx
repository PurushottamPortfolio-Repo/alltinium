import { getFormsByGrade, getGrades } from "@/lib/materials/utils";
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import {
  MAX_LENGTHS,
  formTypes,
  materialFamilies,
  type RFQFormValues,
} from "@/lib/forms/quote-schema";

type QuoteStepMaterialProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
  control: Control<RFQFormValues>;
  setValue: UseFormSetValue<RFQFormValues>;
};

export function QuoteStepMaterial({ register, errors, control, setValue }: QuoteStepMaterialProps) {
  const materialFamily = useWatch({
    control,
    name: "materialFamily",
  });
  const grade = useWatch({
    control,
    name: "grade",
  });

  const grades = useMemo(() => getGrades(materialFamily), [materialFamily]);

  const forms = useMemo(() => getFormsByGrade(materialFamily, grade), [materialFamily, grade]);

  useEffect(() => {
    setValue("grade", "");
    setValue("form", "");
  }, [materialFamily]);

  useEffect(() => {
    setValue("form", "");
  }, [grade]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-foreground">Material Family *</span>
        <select
          {...register("materialFamily")}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        >
          <option value="">Select…</option>
          {materialFamilies.map((family) => (
            <option key={family.value} value={family.value}>
              {family.label}
            </option>
          ))}
        </select>
        {errors.materialFamily && (
          <p className="mt-1 text-sm text-red-600">{errors.materialFamily.message}</p>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Grade *</span>
        {/* <input
          {...register("grade")}
          maxLength={MAX_LENGTHS.grade}
          placeholder="e.g. Ti-6Al-4V"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        /> */}
        <select
          {...register("grade")}
          disabled={!materialFamily}
          title={!materialFamily ? "Select Material Family first" : ""}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        >
          <option value="">Select Grade</option>

          {grades.map((grade) => (
            <option key={grade.value} value={grade.value}>
              {grade.label}
            </option>
          ))}
        </select>
        {errors.grade && <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Specification</span>
        <input
          {...register("specification")}
          maxLength={MAX_LENGTHS.specification}
          placeholder="e.g. AMS 4928"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Form *</span>

        <select
          {...register("form")}
          disabled={!grade}
          title={!grade ? "Select Grade first" : ""}
          // disabled={!materialFamily}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        >
          <option value="">Select Form</option>

          {forms.map((form) => (
            <option key={form.value} value={form.value}>
              {form.label}
            </option>
          ))}
        </select>

        {errors.form && <p className="mt-1 text-sm text-red-600">{errors.form.message}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Temper / Condition</span>
        <input
          {...register("temper")}
          maxLength={MAX_LENGTHS.temper}
          placeholder="e.g. T651, Solution + Aged"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Units *</span>
        <select
          {...register("units")}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        >
          <option value="mm">mm</option>
          <option value="inch">inch</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Length</span>
        <input
          {...register("length")}
          maxLength={MAX_LENGTHS.length}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Width</span>
        <input
          {...register("width")}
          maxLength={MAX_LENGTHS.width}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Thickness</span>
        <input
          {...register("thickness")}
          maxLength={MAX_LENGTHS.thickness}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Diameter</span>
        <input
          {...register("diameter")}
          maxLength={MAX_LENGTHS.diameter}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Quantity *</span>
        <input
          {...register("quantity")}
          maxLength={MAX_LENGTHS.quantity}
          placeholder="e.g. 500 kg / 200 pcs"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Required Tolerance</span>
        <input
          {...register("tolerance")}
          maxLength={MAX_LENGTHS.tolerance}
          placeholder="e.g. ±0.2 mm"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>
    </div>
  );
}

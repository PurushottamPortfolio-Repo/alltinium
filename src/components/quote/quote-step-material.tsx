import type { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  MAX_LENGTHS,
  formTypes,
  materialFamilies,
  type RFQFormValues,
} from "@/lib/forms/quote-schema";

type QuoteStepMaterialProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
};

export function QuoteStepMaterial({ register, errors }: QuoteStepMaterialProps) {
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
        <input
          {...register("grade")}
          maxLength={MAX_LENGTHS.grade}
          placeholder="e.g. Ti-6Al-4V"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
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
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        >
          <option value="">Select…</option>
          {formTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
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

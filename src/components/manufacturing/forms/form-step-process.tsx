import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { ManufacturingFormValues } from "@/lib/forms/manufacturing-schema";

import { PROCESS_CATEGORIES, getProcessCategory } from "./form-data";

type FormStepProcessProps = {
  errors: FieldErrors<ManufacturingFormValues>;
  control: Control<ManufacturingFormValues>;
  setValue: UseFormSetValue<ManufacturingFormValues>;
};

export function FormStepProcess({ errors, control, setValue }: FormStepProcessProps) {
  const processCategory = useWatch({ control, name: "processCategory" });
  const process = useWatch({ control, name: "process" });
  const processVariant = useWatch({ control, name: "processVariant" });

  const category = getProcessCategory(processCategory);
  const selectedProcess = category?.processes.find((item) => item.id === process);

  function selectCategory(categoryId: string) {
    if (categoryId === processCategory) return;
    setValue("processCategory", categoryId, { shouldValidate: true });
    setValue("process", "", { shouldValidate: false });
    setValue("processVariant", "", { shouldValidate: false });
  }

  function selectProcess(processId: string) {
    if (processId === process) return;
    setValue("process", processId, { shouldValidate: true });
    setValue("processVariant", "", { shouldValidate: false });
  }

  function selectVariant(variantId: string) {
    setValue("processVariant", variantId, { shouldValidate: true });
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-foreground">What process does your part need?</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose a category — we&apos;ll narrow it down. Multi-process jobs (e.g. machining +
        anodising)? Pick the primary process and list the rest in the description on the next step.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PROCESS_CATEGORIES.map((item) => {
          const Icon = item.icon;
          const selected = item.id === processCategory;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectCategory(item.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.sub}</span>
            </button>
          );
        })}
      </div>

      {errors.processCategory && (
        <p className="mt-2 text-sm text-red-600">{errors.processCategory.message}</p>
      )}

      {category && (
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-foreground">
            {category.title} — select process
          </h4>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            Narrow the requirement within this category.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {category.processes.map((item) => {
              const selected = item.id === process;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectProcess(item.id)}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sub}</span>
                </button>
              );
            })}
          </div>

          {errors.process && <p className="mt-2 text-sm text-red-600">{errors.process.message}</p>}
        </div>
      )}

      {selectedProcess?.variants && selectedProcess.variants.length > 0 && (
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-foreground">
            {selectedProcess.label} — variant
          </h4>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedProcess.variants.map((variant) => {
              const selected = variant.id === processVariant;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => selectVariant(variant.id)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40",
                  )}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>

          {errors.processVariant && (
            <p className="mt-2 text-sm text-red-600">{errors.processVariant.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FormStepProcess;

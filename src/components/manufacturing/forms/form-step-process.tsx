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
  const processCategory = useWatch({
    control,
    name: "processCategory",
  });

  const process = useWatch({
    control,
    name: "process",
  });

  const processVariant = useWatch({
    control,
    name: "processVariant",
  });

  const category = getProcessCategory(processCategory);

  const selectedProcess = category?.processes.find((item) => item.id === process);

  function selectCategory(categoryId: string) {
    if (categoryId === processCategory) return;

    setValue("processCategory", categoryId, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("process", "", {
      shouldValidate: false,
      shouldDirty: true,
    });

    setValue("processVariant", "", {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  function selectProcess(processId: string) {
    if (processId === process) return;

    setValue("process", processId, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("processVariant", "", {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  function selectVariant(variantId: string) {
    setValue("processVariant", variantId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  return (
    <div className="w-full min-w-0">
      {/* Step Description */}
      <div className="max-w-3xl">
        <h4 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          What process does your part need?
        </h4>

        <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          Choose a category: we&apos;ll narrow it down. Multi-process jobs (e.g. machining +
          anodising)? Pick the primary process and list the rest in the description on the next
          step.
        </p>
      </div>

      {/* Process Categories */}
      <div className="mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PROCESS_CATEGORIES.map((item) => {
          const Icon = item.icon;
          const selected = item.id === processCategory;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectCategory(item.id)}
              className={cn(
                "group flex min-h-[132px] w-full min-w-0 flex-col items-start rounded-xl border p-4 text-left",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "active:scale-[0.99]",
                selected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-background hover:border-primary/40 hover:bg-muted/40",
              )}
            >
              {/* Icon */}
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  "transition-colors duration-200",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                )}
              >
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>

              {/* Title */}
              <span className="mt-3 w-full break-words text-sm font-semibold leading-5 text-foreground">
                {item.title}
              </span>

              {/* Description */}
              <span className="mt-1 w-full break-words text-xs leading-5 text-muted-foreground">
                {item.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Error */}
      {errors.processCategory && (
        <p role="alert" className="mt-2 text-xs font-medium text-destructive sm:text-sm">
          {errors.processCategory.message}
        </p>
      )}

      {/* Process Level */}
      {category && (
        <div className="mt-7 border-t border-border/70 pt-7 sm:mt-8 sm:pt-8">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {category.title} — select process
            </h4>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              Narrow the requirement within this category.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
            {category.processes.map((item) => {
              const selected = item.id === process;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectProcess(item.id)}
                  className={cn(
                    "group flex min-h-[86px] w-full min-w-0 flex-col items-start justify-center rounded-xl border p-4 text-left",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "active:scale-[0.99]",
                    selected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/40",
                  )}
                >
                  <span className="w-full break-words text-sm font-semibold leading-5 text-foreground">
                    {item.label}
                  </span>

                  <span className="mt-1 w-full break-words text-xs leading-5 text-muted-foreground">
                    {item.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {errors.process && (
            <p role="alert" className="mt-2 text-xs font-medium text-destructive sm:text-sm">
              {errors.process.message}
            </p>
          )}
        </div>
      )}

      {/* Process Variant */}
      {selectedProcess?.variants && selectedProcess.variants.length > 0 && (
        <div className="mt-7 border-t border-border/70 pt-7 sm:mt-8 sm:pt-8">
          <h4 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {selectedProcess.label} — variant
          </h4>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedProcess.variants.map((variant) => {
              const selected = variant.id === processVariant;

              return (
                <button
                  key={variant.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectVariant(variant.id)}
                  className={cn(
                    "max-w-full rounded-full border px-3.5 py-2 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "active:scale-[0.98]",
                    selected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/40",
                  )}
                >
                  <span className="break-words">{variant.label}</span>
                </button>
              );
            })}
          </div>

          {errors.processVariant && (
            <p role="alert" className="mt-2 text-xs font-medium text-destructive sm:text-sm">
              {errors.processVariant.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FormStepProcess;

import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MAX_LENGTHS, type ManufacturingFormValues } from "@/lib/forms/manufacturing-schema";

import { CERTIFICATIONS } from "./form-data";

type FormStepCertificationProps = {
  register: UseFormRegister<ManufacturingFormValues>;
  errors: FieldErrors<ManufacturingFormValues>;
  control: Control<ManufacturingFormValues>;
  setValue: UseFormSetValue<ManufacturingFormValues>;
};

export function FormStepCertification({ register, control, setValue }: FormStepCertificationProps) {
  const certifications = useWatch({ control, name: "certifications" }) ?? [];

  function toggleCertification(id: string) {
    const next = certifications.includes(id)
      ? certifications.filter((item) => item !== id)
      : [...certifications, id];

    setValue("certifications", next, { shouldValidate: true });
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-foreground">Certifications &amp; delivery</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Select every certification your programme requires — facility matching is filtered against
        this. Leave blank if standard commercial quality is fine.
      </p>

      <div className="mt-5">
        <span className="text-sm font-medium text-foreground">
          Required certifications / quality standards
        </span>

        <div className="mt-3 flex flex-wrap gap-2">
          {CERTIFICATIONS.map((cert) => {
            const selected = certifications.includes(cert.id);

            return (
              <button
                key={cert.id}
                type="button"
                onClick={() => toggleCertification(cert.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/40",
                )}
              >
                {cert.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Target delivery date
          </span>

          <Controller
            control={control}
            name="deliveryDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(new Date(field.value), "PPP") : "Select delivery date"}
                    </Button>
                  }
                />

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">
            Delivery location (city / PIN)
          </span>
          <input
            {...register("deliveryLocation")}
            maxLength={MAX_LENGTHS.deliveryLocation}
            placeholder="e.g. Bengaluru 560049"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            {...register("requestNda")}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-sm text-foreground">Request NDA before sharing drawings</span>
        </label>
      </div>
    </div>
  );
}

export default FormStepCertification;

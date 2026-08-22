import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MAX_LENGTHS, type ManufacturingFormValues } from "@/lib/forms/manufacturing-schema";

import { CUSTOMER_TYPES } from "./form-data";

type FormStepCompanyProps = {
  register: UseFormRegister<ManufacturingFormValues>;
  errors: FieldErrors<ManufacturingFormValues>;
  emailReady: boolean;
  isEmailVerified: boolean;
  onRequestVerify: () => void | Promise<void>;
};

export function FormStepCompany({
  register,
  errors,
  emailReady,
  isEmailVerified,
  onRequestVerify,
}: FormStepCompanyProps) {
  return (
    <div>
      <h4 className="text-base font-semibold text-foreground">Your details</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        So the right person on our team can come back to you — typically within 48 business hours.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Company / organisation *</span>
          <input
            {...register("companyName")}
            maxLength={MAX_LENGTHS.companyName}
            placeholder="Company name"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">You are a *</span>
          <select
            {...register("customerType")}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {CUSTOMER_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.customerType && (
            <p className="mt-1 text-sm text-red-600">{errors.customerType.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Contact name *</span>
          <input
            {...register("contactName")}
            maxLength={MAX_LENGTHS.contactName}
            placeholder="Full name"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
          {errors.contactName && (
            <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Designation (optional)</span>
          <input
            {...register("designation")}
            maxLength={MAX_LENGTHS.designation}
            placeholder="e.g. Head of Supply Chain"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-foreground">Email *</span>

          <input
            {...register("email")}
            maxLength={MAX_LENGTHS.email}
            type="email"
            inputMode="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />

          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {!isEmailVerified && emailReady && (
              <Button type="button" variant="outline" onClick={onRequestVerify}>
                Verify Email
              </Button>
            )}

            {isEmailVerified && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={16} />
                Email verified
              </div>
            )}

            {!emailReady && (
              <p className="text-xs text-muted-foreground">
                Enter a valid email address to verify it.
              </p>
            )}
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Phone / WhatsApp *</span>
          <input
            {...register("phone")}
            maxLength={MAX_LENGTHS.phone}
            inputMode="tel"
            placeholder="+91 …"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">GSTIN (optional)</span>
          <input
            {...register("gstin")}
            maxLength={MAX_LENGTHS.gstin}
            placeholder="For faster commercial processing"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
          />
        </label>
      </div>
    </div>
  );
}

export default FormStepCompany;

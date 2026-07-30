import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_LENGTHS, type RFQFormValues } from "@/lib/forms/quote-schema";

type QuoteStepCompanyProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
  emailReady: boolean;
  isEmailVerified: boolean;
  onRequestVerify: () => void;
};

export function QuoteStepCompany({
  register,
  errors,
  emailReady,
  isEmailVerified,
  onRequestVerify,
}: QuoteStepCompanyProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-foreground">Company Name *</span>
        <input
          {...register("companyName")}
          maxLength={MAX_LENGTHS.companyName}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Contact Name *</span>
        <input
          {...register("contactName")}
          maxLength={MAX_LENGTHS.contactName}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.contactName && (
          <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
        )}
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Email *</span>

        <input
          {...register("email")}
          maxLength={MAX_LENGTHS.email}
          type="email"
          inputMode="email"
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
        <span className="text-sm font-medium text-foreground">Phone / Contact *</span>
        <input
          {...register("phone")}
          maxLength={MAX_LENGTHS.phone}
          inputMode="tel"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </label>
    </div>
  );
}

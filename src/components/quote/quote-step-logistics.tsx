import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { MAX_LENGTHS, type RFQFormValues } from "@/lib/forms/quote-schema";

type QuoteStepLogisticsProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
};

export function QuoteStepLogistics({ register, errors }: QuoteStepLogisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-foreground">Delivery Date *</span>
        <input
          {...register("deliveryDate")}
          type="date"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.deliveryDate && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryDate.message}</p>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Delivery Location *</span>
        <input
          {...register("deliveryLocation")}
          maxLength={MAX_LENGTHS.deliveryLocation}
          placeholder="City, Country or complete address"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.deliveryLocation && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryLocation.message}</p>
        )}
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Shipping Preference</span>
        <input
          {...register("shippingPreference")}
          maxLength={MAX_LENGTHS.shippingPreference}
          placeholder="e.g. Air freight, Sea freight, Courier"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
      </label>
    </div>
  );
}

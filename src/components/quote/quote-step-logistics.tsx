import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import { MAX_LENGTHS, type RFQFormValues } from "@/lib/forms/quote-schema";

import { Controller } from "react-hook-form";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type QuoteStepLogisticsProps = {
  register: UseFormRegister<RFQFormValues>;
  control: Control<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
};

export function QuoteStepLogistics({ register, errors, control }: QuoteStepLogisticsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* <label className="block">
        <span className="text-sm font-medium text-foreground">Delivery Date *</span>
        <input
          {...register("deliveryDate")}
          type="date"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.deliveryDate && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryDate.message}</p>
        )}
      </label> */}
      <label className="block">
        <span className="mb-2 block cursor-pointer text-sm font-medium text-foreground">
          Delivery Date *
        </span>

        <Controller
          control={control}
          name="deliveryDate"
          render={({ field }) => (
            <Popover>
              {/* <PopoverTrigger>
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
              </PopoverTrigger> */}
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

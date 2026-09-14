"use client";

import { Check, ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { materialFamilies } from "@/lib/forms/quote-schema";
import { cn } from "@/lib/utils";

type MaterialFamilySelectProps = {
  selectedFamilies: string[];
  onToggle: (familyId: string) => void;
  errorMessage?: string;
};

function familyLabel(familyId: string) {
  return materialFamilies.find((family) => family.value === familyId)?.label ?? familyId;
}

export function MaterialFamilySelect({
  selectedFamilies,
  onToggle,
  errorMessage,
}: MaterialFamilySelectProps) {
  return (
    <div className="md:col-span-2">
      <span className="text-sm font-medium text-foreground">
        Material Family * (select one or more)
      </span>

      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="mt-2 flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-left outline-none focus:border-primary"
            >
              <span
                className={selectedFamilies.length ? "text-foreground" : "text-muted-foreground"}
              >
                {selectedFamilies.length
                  ? `${selectedFamilies.length} selected`
                  : "Select material families…"}
              </span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          }
        />

        <PopoverContent className="w-64 p-1" align="start">
          {materialFamilies.map((family) => {
            const checked = selectedFamilies.includes(family.value);

            return (
              <button
                key={family.value}
                type="button"
                onClick={() => onToggle(family.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted",
                  checked && "text-primary",
                )}
              >
                {family.label}
                {checked && <Check size={16} />}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>

      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}

      {selectedFamilies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedFamilies.map((familyId) => (
            <button key={familyId} type="button" onClick={() => onToggle(familyId)}>
              <Badge variant="default" className="cursor-pointer pr-2 hover:bg-primary/20">
                {familyLabel(familyId)}
                <X size={12} />
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface MaterialFilterProps {
  title: string;

  selected: string;

  onSelect: (value: string) => void;

  items: Record<string, number>;
}

export function MaterialFilter({ title, selected, onSelect, items }: MaterialFilterProps) {
  const total = Object.values(items).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <h3 className="font-heading text-lg font-semibold">{title}</h3>

      <div className="flex flex-wrap gap-3 lg:flex-col">
        <button
          onClick={() => onSelect("all")}
          className={cn(
            "flex items-center justify-between rounded-xl px-4 py-2 text-left font-body transition",
            selected === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          <span>All</span>

          <span>{total}</span>
        </button>

        {Object.entries(items).map(([key, count]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              "flex items-center justify-between rounded-xl px-4 py-2 text-left font-body transition",
              selected === key ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            {/* <span className="capitalize">{key.replace("-", " ")}</span> */}
            <span className="capitalize">
              {key
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>

            <span>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Search, X } from "lucide-react";

interface MaterialSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function MaterialSearch({ value, onChange }: MaterialSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, grade, category, form or specification..."
        className="font-body h-12 w-full rounded-2xl border border-border bg-background pl-12 pr-12 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

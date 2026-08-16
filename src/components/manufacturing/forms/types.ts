import type { LucideIcon } from "lucide-react";

export interface ProcessVariant {
  id: string;
  label: string;
}

export interface ProcessOption {
  id: string;
  label: string;
  sub: string;
  variants?: ProcessVariant[];
}

export interface ProcessCategory {
  id: string;
  title: string;
  sub: string;
  icon: LucideIcon;
  processes: ProcessOption[];
}

export interface CertificationOption {
  id: string;
  label: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

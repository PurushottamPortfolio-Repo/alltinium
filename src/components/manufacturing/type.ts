import type { LucideIcon } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

export interface AssuranceItem {
  title: string;
  description: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface AudienceItem {
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}

export interface FormDataType {
  title: string;
}

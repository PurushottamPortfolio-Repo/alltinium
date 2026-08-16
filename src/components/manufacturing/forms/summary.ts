import type { ManufacturingFormValues } from "@/lib/forms/manufacturing-schema";

import {
  CERTIFICATIONS,
  CUSTOMER_TYPES,
  MATERIAL_FAMILIES,
  QUANTITY_TYPES,
  TOLERANCE_CLASSES,
  getProcessCategory,
  getProcessOption,
  getProcessVariant,
} from "./form-data";
import type { SelectOption } from "./types";

function labelFor(options: SelectOption[], value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

export function buildRfqSummaryLines(
  values: ManufacturingFormValues,
  referenceNumber?: string,
): string[] {
  const category = getProcessCategory(values.processCategory);
  const process = getProcessOption(values.processCategory, values.process);
  const variant = values.processVariant
    ? getProcessVariant(values.processCategory, values.process, values.processVariant)
    : undefined;

  const certLabels = values.certifications
    .map((id) => CERTIFICATIONS.find((cert) => cert.id === id)?.label)
    .filter((label): label is string => Boolean(label));

  const lines: string[] = [];

  if (referenceNumber) lines.push(`RFQ Reference: ${referenceNumber}`);

  lines.push(
    `Process: ${category?.title ?? values.processCategory} > ${process?.label ?? values.process}${
      variant ? ` (${variant.label})` : ""
    }`,
  );

  lines.push(
    `Material: ${labelFor(MATERIAL_FAMILIES, values.materialFamily)}${
      values.materialGrade ? ` — ${values.materialGrade}` : ""
    }`,
  );
  lines.push(
    `Quantity: ${labelFor(QUANTITY_TYPES, values.quantityType)}${
      values.quantity ? ` (${values.quantity})` : ""
    }`,
  );

  if (values.envelope) lines.push(`Max envelope: ${values.envelope}`);
  if (values.tolerance) lines.push(`Tolerance: ${labelFor(TOLERANCE_CLASSES, values.tolerance)}`);

  lines.push("", "Requirement:", values.description);

  if (certLabels.length) lines.push("", `Certifications: ${certLabels.join(", ")}`);
  if (values.deliveryDate) lines.push(`Target delivery date: ${values.deliveryDate}`);
  if (values.deliveryLocation) lines.push(`Delivery location: ${values.deliveryLocation}`);
  if (values.requestNda) lines.push("NDA requested before sharing drawings.");

  lines.push(
    "",
    `Company: ${values.companyName} (${labelFor(CUSTOMER_TYPES, values.customerType)})`,
    `Contact: ${values.contactName}${values.designation ? `, ${values.designation}` : ""}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
  );

  if (values.gstin) lines.push(`GSTIN: ${values.gstin}`);

  return lines;
}

export function buildRfqSummaryText(
  values: ManufacturingFormValues,
  referenceNumber?: string,
): string {
  return buildRfqSummaryLines(values, referenceNumber).join("\n");
}

export function generateReferenceNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `MFG-${y}${m}${d}-${rand}`;
}

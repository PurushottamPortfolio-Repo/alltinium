import { formTypes, materialFamilies, type RFQFormValues } from "@/lib/forms/quote-schema";

type LabeledOption = { value: string; label: string };

function labelFor(options: ReadonlyArray<LabeledOption>, value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

export function buildQuoteSummaryLines(values: RFQFormValues, referenceNumber?: string): string[] {
  const dimensions = [
    values.length ? `Length: ${values.length} ${values.units}` : null,
    values.width ? `Width: ${values.width} ${values.units}` : null,
    values.thickness ? `Thickness: ${values.thickness} ${values.units}` : null,
    values.diameter ? `Diameter: ${values.diameter} ${values.units}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const lines: string[] = [];

  if (referenceNumber) lines.push(`RFQ Reference: ${referenceNumber}`);

  lines.push(`Material: ${labelFor(materialFamilies, values.materialFamily)} (${values.grade})`);
  if (values.specification) lines.push(`Specification: ${values.specification}`);
  lines.push(`Form: ${labelFor(formTypes, values.form)}`);
  if (values.temper) lines.push(`Temper: ${values.temper}`);
  if (dimensions) lines.push(`Dimensions: ${dimensions}`);
  lines.push(`Quantity: ${values.quantity}`);
  if (values.tolerance) lines.push(`Tolerance: ${values.tolerance}`);

  if (values.ndtrequirements) lines.push(`NDT requirements: ${values.ndtrequirements}`);
  if (values.heatTreatment) lines.push(`Heat treatment: ${values.heatTreatment}`);
  if (values.packaging) lines.push(`Packaging: ${values.packaging}`);
  if (values.specialRequirements) lines.push(`Special requirements: ${values.specialRequirements}`);

  lines.push(
    "",
    `Delivery date: ${values.deliveryDate}`,
    `Delivery location: ${values.deliveryLocation}`,
  );
  if (values.shippingPreference) lines.push(`Shipping preference: ${values.shippingPreference}`);

  lines.push(
    "",
    `Company: ${values.companyName}`,
    `Contact: ${values.contactName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
  );

  return lines;
}

export function buildQuoteSummaryText(values: RFQFormValues, referenceNumber?: string): string {
  return buildQuoteSummaryLines(values, referenceNumber).join("\n");
}

export function generateReferenceNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RFQ-${y}${m}${d}-${rand}`;
}

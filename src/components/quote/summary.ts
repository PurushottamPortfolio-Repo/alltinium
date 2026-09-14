import { formTypes, materialFamilies, type RFQFormValues } from "@/lib/forms/quote-schema";

type LabeledOption = { value: string; label: string };

function labelFor(options: ReadonlyArray<LabeledOption>, value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

export function buildQuoteSummaryLines(values: RFQFormValues, referenceNumber?: string): string[] {
  const lines: string[] = [];

  if (referenceNumber) lines.push(`RFQ Reference: ${referenceNumber}`);

  (values.materials ?? []).forEach((material, index) => {
    const dimensions = [
      material.length ? `Length: ${material.length} ${material.units}` : null,
      material.width ? `Width: ${material.width} ${material.units}` : null,
      material.thickness ? `Thickness: ${material.thickness} ${material.units}` : null,
      material.diameter ? `Diameter: ${material.diameter} ${material.units}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    lines.push(
      "",
      `Material ${index + 1}: ${labelFor(materialFamilies, material.materialFamily)} (${material.grade})`,
    );
    if (material.specification) lines.push(`  Specification: ${material.specification}`);
    lines.push(`  Form: ${labelFor(formTypes, material.form)}`);
    if (material.temper) lines.push(`  Temper: ${material.temper}`);
    if (dimensions) lines.push(`  Dimensions: ${dimensions}`);
    lines.push(`  Quantity: ${material.quantity}`);
    if (material.tolerance) lines.push(`  Tolerance: ${material.tolerance}`);

    if (material.surfaceFinish) lines.push(`  Surface finish: ${material.surfaceFinish}`);
    if (material.ndtrequirements) lines.push(`  NDT requirements: ${material.ndtrequirements}`);
    if (material.heatTreatment) lines.push(`  Heat treatment: ${material.heatTreatment}`);
    if (material.packaging) lines.push(`  Packaging: ${material.packaging}`);
    if (material.specialRequirements)
      lines.push(`  Special requirements: ${material.specialRequirements}`);
  });

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

"use client";

import type { ReactNode } from "react";

import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RFQ_NOTIFY_EMAIL, RFQ_WHATSAPP_NUMBER } from "@/components/manufacturing/forms/form-data";
import { formTypes, materialFamilies, type RFQFormValues } from "@/lib/forms/quote-schema";

import { buildQuoteSummaryText } from "./summary";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88zm8.42-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.16-3.47-8.4z" />
    </svg>
  );
}

type QuoteStepReviewProps = {
  values: RFQFormValues;
  referenceNumber: string;
  isEmailVerified: boolean;
  submitting: boolean;
  onSendEmail: () => void | Promise<void>;
};

function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="flex justify-between gap-4 py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <h5 className="mb-2 text-sm font-semibold text-foreground">{title}</h5>
      {children}
    </div>
  );
}

export function QuoteStepReview({
  values,
  referenceNumber,
  isEmailVerified,
  submitting,
  onSendEmail,
}: QuoteStepReviewProps) {
  const summaryText = buildQuoteSummaryText(values, referenceNumber);
  const actionsDisabled = !isEmailVerified || submitting;
  const materials = values.materials ?? [];

  function handleWhatsapp() {
    const url = `https://wa.me/${RFQ_WHATSAPP_NUMBER}?text=${encodeURIComponent(summaryText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-foreground">Review &amp; send</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Your RFQ reference is generated below. Send via WhatsApp for the fastest response — or email
        ({RFQ_NOTIFY_EMAIL}) if you prefer. Both routes reach the same team.
      </p>

      <div className="mt-5 inline-flex items-center rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-sm text-foreground">
        {referenceNumber}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <h5 className="mb-2 text-sm font-semibold text-foreground">
            Materials ({materials.length})
          </h5>
          <div className="space-y-3">
            {materials.map((material, index) => {
              const dimensions = [
                material.length ? `${material.length} ${material.units}` : null,
                material.width ? `${material.width} ${material.units}` : null,
                material.thickness ? `${material.thickness} ${material.units}` : null,
                material.diameter ? `${material.diameter} ${material.units}` : null,
              ]
                .filter(Boolean)
                .join(" × ");

              const hasRequirements = Boolean(
                material.surfaceFinish ||
                material.ndtrequirements ||
                material.heatTreatment ||
                material.packaging ||
                material.specialRequirements,
              );

              return (
                <ReviewSection
                  key={`${material.materialFamily}-${index}`}
                  title={`${index + 1}. ${labelFor(materialFamilies, material.materialFamily)} — ${material.grade}`}
                >
                  <ReviewRow label="Specification" value={material.specification} />
                  <ReviewRow label="Form" value={labelFor(formTypes, material.form)} />
                  <ReviewRow label="Temper / Condition" value={material.temper} />
                  <ReviewRow label="Dimensions" value={dimensions} />
                  <ReviewRow label="Quantity" value={material.quantity} />
                  <ReviewRow label="Tolerance" value={material.tolerance} />

                  {hasRequirements && (
                    <div className="mt-2 border-t border-border pt-2">
                      <ReviewRow label="Surface Finish" value={material.surfaceFinish} />
                      <ReviewRow label="NDT requirements" value={material.ndtrequirements} />
                      <ReviewRow label="Heat treatment" value={material.heatTreatment} />
                      <ReviewRow label="Packaging" value={material.packaging} />
                      <ReviewRow
                        label="Special requirements"
                        value={material.specialRequirements}
                      />
                    </div>
                  )}
                </ReviewSection>
              );
            })}
          </div>
        </div>

        <ReviewSection title="Delivery & Logistics">
          <ReviewRow label="Delivery date" value={values.deliveryDate} />
          <ReviewRow label="Delivery location" value={values.deliveryLocation} />
          <ReviewRow label="Shipping preference" value={values.shippingPreference} />
        </ReviewSection>

        <ReviewSection title="Company & Contact">
          <ReviewRow label="Company" value={values.companyName} />
          <ReviewRow label="Contact" value={values.contactName} />
          <ReviewRow label="Email" value={values.email} />
          <ReviewRow label="Phone" value={values.phone} />
        </ReviewSection>
      </div>

      {!isEmailVerified && (
        <p className="mt-4 text-sm text-amber-600">
          Please verify your email on the Company step before sending your RFQ.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" onClick={() => void onSendEmail()} disabled={actionsDisabled}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail size={16} />}
          {submitting ? "Sending…" : "Send via Email"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleWhatsapp}
          disabled={actionsDisabled}
          className="border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 dark:text-[#25D366]"
        >
          <WhatsAppIcon />
          Send via WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default QuoteStepReview;

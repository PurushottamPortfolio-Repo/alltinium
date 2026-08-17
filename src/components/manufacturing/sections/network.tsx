import { CheckCircle2 } from "lucide-react";

import { capabilityItems } from "../manufacture-data";

export default function NetworkSection() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-y border-border bg-background py-14 transition-colors duration-300 sm:py-18 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex max-w-full items-center justify-center rounded-full border border-border bg-muted px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-3.5 sm:text-xs sm:tracking-[0.16em]">
            Network capabilities
          </span>

          <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-4xl lg:text-5xl">
            Certified processes,
            <span className="block text-muted-foreground">matched to your part</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            Partner facilities are onboarded under collaboration agreements and qualified against
            certification, capability and capacity criteria. Alltinium remains your sole commercial
            interface.
          </p>
        </div>

        {/* Capability Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {capabilityItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex min-w-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-6 lg:p-6"
              >
                {/* Icon + Title */}
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
                    <Icon
                      aria-hidden="true"
                      className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="min-w-0 pt-1 font-heading text-base font-semibold leading-snug tracking-tight text-card-foreground sm:text-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-6 text-muted-foreground sm:mt-6">
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="max-w-full rounded-md border border-border bg-muted/60 px-2.5 py-1.5 text-[10px] font-medium leading-none text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:text-foreground sm:text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Certification Note */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:mt-8 sm:p-5 lg:p-7">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-9 sm:w-9">
              <CheckCircle2
                aria-hidden="true"
                className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                strokeWidth={2}
              />
            </div>

            <p className="min-w-0 text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
              <strong className="font-semibold text-card-foreground">
                Certification-matched routing.
              </strong>{" "}
              Need NADCAP heat treatment, an AS9100D machine shop, or NABL-witnessed test reports?
              Specify it in the RFQ — facility selection is filtered against your certification
              requirement, not just capability. Partner identities are disclosed under NDA where
              programmes require it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

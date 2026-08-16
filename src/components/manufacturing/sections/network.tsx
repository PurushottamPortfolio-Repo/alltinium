import { CheckCircle2 } from "lucide-react";

import { capabilityItems } from "../manufacture-data";

export default function NetworkSection() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-y border-border bg-background py-16 transition-colors duration-300 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Network capabilities
          </span>

          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Certified processes,
            <span className="block text-muted-foreground">matched to your part</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Partner facilities are onboarded under collaboration agreements and qualified against
            certification, capability and capacity criteria. Alltinium remains your sole commercial
            interface.
          </p>
        </div>

        {/* Capability Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {capabilityItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-7"
              >
                {/* Icon */}
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg font-semibold tracking-tight text-card-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-muted/60 px-2.5 py-1.5 text-[11px] font-medium leading-none text-muted-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Certification Note */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:mt-10 sm:p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle2 aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
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

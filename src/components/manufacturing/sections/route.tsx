import { Check } from "lucide-react";
import { assuranceItems } from "../manufacture-data";

export default function WhyAlltinium() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Why route it through Alltinium
          </span>

          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            A collegiate of industries.
            <span className="block text-muted-foreground">One accountable node.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Our partner facilities operate under collaboration agreements with defined quality
            obligations — you get network breadth with single-vendor accountability.
          </p>
        </div>

        {/* Assurance Grid */}
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow-soft)] sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {assuranceItems.map((item) => (
            <article
              key={item.title}
              className="group bg-card p-6 transition-colors duration-300 hover:bg-muted/60 sm:p-7 lg:p-8"
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                <Check aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </div>

              <h3 className="font-heading text-base font-semibold tracking-tight text-card-foreground sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

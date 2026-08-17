import { assuranceItems } from "../manufacture-data";

export default function WhyAlltinium() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-servicebg py-12 transition-colors duration-300 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex max-w-full items-center justify-center rounded-full border border-border bg-muted px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-3.5 sm:text-xs sm:tracking-[0.16em]">
            Why route it through Alltinium
          </span>

          <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
            A collegiate of industries.
            <span className="mt-1 block text-muted-foreground sm:mt-0">One accountable node.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            Our partner facilities operate under collaboration agreements with defined quality
            obligations, you get network breadth with single-vendor accountability.
          </p>
        </div>

        {/* Assurance Grid */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {assuranceItems.map((item) => (
            <article
              key={item.title}
              className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-muted/60 hover:shadow-[var(--shadow-soft)] sm:rounded-2xl sm:p-6 lg:min-h-[230px] lg:p-7 xl:p-8"
            >
              <h3 className="break-words font-heading text-base font-semibold leading-snug tracking-tight text-card-foreground sm:text-lg lg:text-xl">
                {item.title}
              </h3>

              <p className="mt-3 break-words text-sm leading-6 text-muted-foreground sm:mt-4">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

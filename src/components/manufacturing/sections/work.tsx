import { processSteps } from "../manufacture-data";

export default function WorkSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/40 py-12 transition-colors duration-300 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:px-3.5 sm:text-xs sm:tracking-[0.16em]">
            How it works
          </span>

          <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
            You send a requirement.
            <span className="mt-1 block text-muted-foreground sm:mt-0">
              We deliver a finished part.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            Alltinium is your single point of contact and single invoice. Partner facilities are
            matched to your process, certification and volume requirements from our qualified
            network.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-10 sm:mt-14 md:mt-16">
          {/* Desktop connector */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border lg:block"
          />

          {/* Tablet / Mobile vertical connector */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 w-px bg-border sm:left-6 lg:hidden"
          />

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-0">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                className="group relative flex min-w-0 gap-4 px-0 sm:block sm:px-2 lg:px-6"
              >
                {/* Step number */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-semibold text-foreground shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-11 sm:w-11 lg:h-10 lg:w-10">
                  {step.number}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0 sm:mt-5 sm:pt-0 lg:pr-4">
                  <h3 className="font-heading text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg lg:text-xl">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Accountability callout */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:mt-14 sm:p-6 md:p-8 lg:mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold leading-6 text-foreground sm:text-base">
                One accountable partner from RFQ to delivery.
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Coordinated sourcing, manufacturing, inspection and documentation.
              </p>
            </div>

            <div className="shrink-0 self-start text-sm font-semibold text-primary sm:self-auto">
              Alltinium
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { processSteps } from "../manufacture-data";

export default function WorkSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/40 py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </span>

          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            You send a requirement.
            <span className="block text-muted-foreground">We deliver a finished part.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Alltinium is your single point of contact and single invoice. Partner facilities are
            matched to your process, certification and volume requirements from our qualified
            network.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 sm:mt-16">
          {/* Desktop connector */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {processSteps.map((step) => (
              <article key={step.number} className="group relative px-0 sm:px-3 lg:px-6">
                {/* Step number */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-semibold text-foreground shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  {step.number}
                </div>

                <div className="mt-5 lg:pr-4">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Accountability callout */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:mt-16 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-sm font-semibold text-foreground sm:text-base">
                One accountable partner from RFQ to delivery.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Coordinated sourcing, manufacturing, inspection and documentation.
              </p>
            </div>

            <div className="shrink-0 text-sm font-semibold text-primary">Alltinium</div>
          </div>
        </div>
      </div>
    </section>
  );
}

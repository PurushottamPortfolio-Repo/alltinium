import { audienceItems } from "../manufactor-data";

export default function WhoWeBuildFor() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Who we build for
          </span>

          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Built for teams that need parts,
            <span className="block text-muted-foreground">not paperwork.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Whether you are iterating a prototype or scaling a qualified sub-assembly, we match your
            requirement to the right certified facility and manage the job end-to-end.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {audienceItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-7 lg:p-8"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-card-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:border-accent/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

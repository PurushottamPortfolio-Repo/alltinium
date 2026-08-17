import { faqData } from "../manufacture-data";

export default function FAQSection() {
  return (
    <section className="band px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[860px]">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <span className="kicker text-primary">FAQ</span>

          <h2 className="sec-title mt-4 text-3xl font-bold leading-tight sm:mt-5 sm:text-4xl md:text-5xl">
            Common questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="w-full">
          {faqData.map((faq) => (
            <details key={faq.question} className="group border-b border-border">
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-medium leading-6 text-foreground outline-none transition-colors hover:text-primary focus-visible:text-primary sm:py-5 sm:text-base md:gap-6 md:py-6">
                <span className="min-w-0 flex-1 break-words pr-2">{faq.question}</span>

                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm text-primary transition-all duration-300 group-open:rotate-180 group-open:bg-primary group-open:text-primary-foreground sm:h-8 sm:w-8"
                >
                  ↓
                </span>
              </summary>

              <div className="overflow-hidden">
                <p className="max-w-3xl pb-5 pr-0 text-sm leading-6 text-muted-foreground sm:pb-6 sm:text-base sm:leading-7 md:pr-12">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

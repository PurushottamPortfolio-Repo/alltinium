import { faqData } from "../manufacture-data";

export default function FAQSection() {
  return (
    <section className="band">
      <div className="mx-auto max-w-[860px] px-4">
        <span className="kicker">FAQ</span>

        <h2 className="sec-title mb-9">Common questions</h2>

        <div>
          {faqData.map((faq) => (
            <details key={faq.question} className="group border-b">
              <summary className="cursor-pointer list-none py-5 font-medium">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}

                  <span className="shrink-0 transition-transform group-open:rotate-180">↓</span>
                </span>
              </summary>

              <p className="pb-5 leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

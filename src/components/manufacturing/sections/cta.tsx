export default function CtaSection() {
  return (
    <>
      <section className="py-[70px]">
        <div className="mx-auto w-full max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-semibold">Have a part on your desk right now?</h2>

          <p className="mx-auto mb-[30px] mt-4 max-w-2xl text-base text-muted-foreground">
            Send the RFQ — a structured response with route, lead time and single-invoice pricing,
            typically within 48 business hours.
          </p>

          <a
            href="#rfq"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-black transition-colors hover:bg-primary/70"
          >
            Start a Manufacturing RFQ
          </a>
        </div>
      </section>
    </>
  );
}

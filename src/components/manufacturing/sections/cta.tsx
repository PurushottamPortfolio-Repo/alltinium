export default function CtaSection() {
  return (
    <section className="bg-servicebg px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:py-[70px]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-4xl">
          Have a part on your desk right now?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Send the RFQ: a structured response with route, lead time and single-invoice pricing,
          typically within 48 business hours.
        </p>

        <a
          href="#manufacturing-form"
          className="mt-7 inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:mt-8 sm:w-auto sm:max-w-none sm:px-6 sm:text-base"
        >
          Start a Manufacturing RFQ
        </a>
      </div>
    </section>
  );
}

import { assets } from "@/assets";
import { PageHero } from "../ui/page-hero";
import MaterialGrid from "./material-card";

export default function MaterialList() {
  return (
    <>
      <PageHero
        image={assets.heroBg}
        title="Premium Engineering Materials"
        description="Browse aerospace-grade aluminium, titanium, nickel superalloys and special steels for demanding engineering applications."
        buttonText="Request a Quote"
        buttonHref="/contact"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Materials",
          },
        ]}
      />

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
          <h1 className="flex item-center justify-center text-4xl font-heading mb-10 border rounded-md p-4 text-primary">
            Following are the list of Materials
          </h1>
          <div>
            <MaterialGrid />
          </div>
        </div>
      </section>
    </>
  );
}

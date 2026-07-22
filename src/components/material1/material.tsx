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

      <section className="">
        <div className="p-10 flex flex-col gap-10">
          <h1 className="flex item-center justify-center text-4xl font-heading">
            Following are the list of Materials
          </h1>
          <div className="p-5">
            <MaterialGrid />
          </div>
        </div>
      </section>
    </>
  );
}

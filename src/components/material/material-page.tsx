"use client";

import { assets } from "@/assets";
import { MATERIALS } from "@/data/materials/materials";

import { PageHero } from "@/components/ui/page-hero";
import { MaterialSearch } from "@/components/material/material-search";
import { MaterialFilter } from "@/components/material/material-filter";
import { MaterialGrid } from "@/components/material/material-grid";

import { useMaterialFilter } from "@/hooks/use-material-filter";

export function MaterialPage() {
  const {
    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    selectedForm,
    setSelectedForm,

    filteredMaterials,

    categoryCounts,
    formCounts,
  } = useMaterialFilter({
    materials: MATERIALS,
  });

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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search */}

          <div className="mb-10">
            <MaterialSearch value={search} onChange={setSearch} />
          </div>

          {/* Layout */}

          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <MaterialFilter
                title="Material Category"
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                items={categoryCounts}
              />

              <MaterialFilter
                title="Material Form"
                selected={selectedForm}
                onSelect={setSelectedForm}
                items={formCounts}
              />
            </aside>

            {/* Content */}

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold">Materials</h2>

                <p className="font-body text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">{filteredMaterials.length}</span>{" "}
                  material
                  {filteredMaterials.length !== 1 && "s"}
                </p>
              </div>

              <MaterialGrid materials={filteredMaterials} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

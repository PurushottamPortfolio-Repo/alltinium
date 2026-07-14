"use client";

import { useState } from "react";

import { assets } from "@/assets";
import { MATERIALS } from "@/data/materials/materials";

import { PageHero } from "@/components/ui/page-hero";
import { MaterialSearch } from "@/components/material/material-search";
import { MaterialFilter } from "@/components/material/material-filter";
import { MaterialGrid } from "@/components/material/material-grid";

import { cn } from "@/lib/utils";
import { useMaterialFilter } from "@/hooks/use-material-filter";
import { MATERIAL_CATEGORIES } from "@/data/materials/categories";
import { MATERIAL_FORMS } from "@/data/materials/forms";
import { SlidersHorizontal, X } from "lucide-react";

export function MaterialPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    allCategories: MATERIAL_CATEGORIES.map((c) => c.id),
    allForms: MATERIAL_FORMS.map((f) => f.id),
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

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4">
                <div>
                  <p className="font-heading text-sm font-semibold">Filters</p>
                  <p className="text-sm text-muted-foreground">
                    Refine materials by category and form.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label={sidebarOpen ? "Close filters" : "Open filters"}
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <SlidersHorizontal className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div
                className={cn(
                  "mt-6 overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 lg:mt-8",
                  sidebarOpen ? "max-h-[calc(100vh-10rem)] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="space-y-6 overflow-y-auto px-4 py-6 pr-2 lg:max-h-[calc(100vh-12rem)]">
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
                </div>
              </div>
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

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MATERIALS } from "./materials-data";

export default function MaterialGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {MATERIALS.map((material) => (
        <motion.article
          key={material.id}
          whileHover={{ y: -8 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
        >
          <div className="flex flex-col gap-6 p-6">
            {/* Header */}

            <div className="space-y-3">
              <Badge variant="custom">{material.title}</Badge>

              {/* <h2 className="font-heading text-2xl font-bold text-foreground">{material.title}</h2> */}

              <p className="text-sm leading-7 text-muted-foreground">{material.description}</p>
            </div>

            {/* Series */}

            <div className="space-y-5">
              {material.series.map((series) => (
                <div
                  key={series.id}
                  className="rounded-2xl border border-border bg-background/40 p-4"
                >
                  <h3 className="font-heading mb-4 text-lg font-semibold text-foreground">
                    {series.title}
                  </h3>

                  {/* Products */}

                  <div className="mb-4">
                    {/* <p className="mb-2 text-sm font-semibold lowercase tracking-wide">Grades</p> */}

                    <div className="flex flex-wrap gap-2">
                      {series.products.map((product) => (
                        <Badge key={product} variant="secondary" className="text-[0.72rem]">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Forms */}

                  <div>
                    {/* <p className="mb-2 text-sm font-semibold lowercase tracking-wide">Forms</p> */}

                    <div className="flex flex-wrap gap-2">
                      {series.forms.map((form) => (
                        <Badge key={form.id} variant="outline" className="text-[0.72rem]">
                          {form.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact"
                className="group/button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg active:scale-95"
              >
                RFQ
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>

              <Link
                href={material.datasheet.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-lg active:scale-95"
              >
                <FileText className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-6" />
                Datasheet
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

// import { MATERIALS } from "./materials-data";

// export default function MaterialGrid() {
//   return (
//     <div className="grid gap-6 md:grid-cols-2">
//       {MATERIALS.map((material) => (
//         <div key={material.id} className="rounded-xl border p-6">
//           <h2 className="text-2xl font-bold">{material.title}</h2>

//           <p className="mt-2 text-muted-foreground">{material.description}</p>

//           <div className="mt-6 space-y-4">
//             {material.series.map((series) => (
//               <div key={series.id}>
//                 <h3 className="font-semibold">{series.title}</h3>

//                 <p className="text-sm">
//                   <strong>Products:</strong> {series.products.join(", ")}
//                 </p>

//                 <p className="text-sm">
//                   <strong>Forms:</strong> {series.forms.map((f) => f.name).join(", ")}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <a
//             href={material.datasheet.file}
//             className="mt-6 inline-flex rounded bg-primary px-4 py-2 text-white"
//           >
//             Download Datasheet
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

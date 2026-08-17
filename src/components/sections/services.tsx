"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";
import { ServiceCard } from "@/components/common/cards/service-card";

export function ServicesSection() {
  return (
    <section className="relative bg-servicebg">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16"
        >
          <div className="max-w-3xl">
            <span className="mb-3 inline-block rounded-md bg-primary/10 px-4 py-2 text-sm font-medium font-heading text-primary">
              FOUR PILLARS
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight font-heading sm:text-4xl lg:text-5xl">
              One supply chain and four critical capabilities.
            </h2>

            <p className="mt-5 max-w-2xl text-base font-body text-muted-foreground sm:text-lg">
              From the mill to the machined part - we close the loop so your QA, procurement and
              engineering teams talk to a single partner.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-primary"
          >
            View All Services
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// import { services } from "@/data/services";
// import { ServiceCard } from "@/components/common/cards/service-card";

// export function ServicesSection() {
//   return (
//     <section className="relative bg-servicebg rounded-md border-border px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
//       {/* Heading */}

//       <motion.div
//         initial={{ opacity: 0, y: 25 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
//       >
//         <div>
//           <span className="mb-3 inline-block rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary font-heading">
//             FOUR PILLARS
//           </span>

//           <h2 className="mt-3 text-3xl font-bold font-heading tracking-tight">
//             One supply chain and four critical capabilities.
//             <br />
//           </h2>

//           <p className="mt-5 text-muted-foreground font-body">
//             From the mill to the machined part — we close the loop so your QA, procurement and
//             engineering teams talk to a single partner.
//           </p>
//         </div>

//         <Link
//           href="/services"
//           className="group inline-flex items-center gap-2 font-semibold text-primary"
//         >
//           View All Services
//           <ArrowRight size={18} className="transition group-hover:translate-x-2" />
//         </Link>
//       </motion.div>

//       {/* Cards */}
//       <Link href="/services">
//         <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
//           {services.map((service, index) => (
//             <ServiceCard key={service.id} service={service} index={index} />
//           ))}
//         </div>
//       </Link>
//     </section>
//   );
// }

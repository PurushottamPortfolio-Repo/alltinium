"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

export default function ServiceStripe() {
  const [active, setActive] = useState(0);

  const service = services[active];
  const Icon = service.icon;

  return (
    <section className="mt-10 rounded-xl border bg-primary/10 overflow-hidden">
      {/* Top Stripe */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b">
        {services.slice(0, 4).map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActive(index)}
            className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
              active === index ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
            }`}
          >
            {item.title}

            {active === index && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-0 left-0 h-1 w-full bg-primary-foreground"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="p-8"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-5">
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
              </div>
            </div>

            <p className="text-muted-foreground">{service.message}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { services } from "@/data/services";

// export default function ServiceStripe() {
//   return (
//     <section className="relative mt-10 rounded-xl border bg-primary/10">
//       <div className="flex flex-col">
//         {services.slice(0, 4).map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{
//                 duration: 0.5,
//                 delay: index * 0.15,
//                 ease: "easeOut",
//               }}
//               whileHover={{
//                 y: -2,
//                 backgroundColor: "rgba(255,255,255,0.04)",
//               }}
//               className=" group w-full border-b last:border-b-0 transition-colors"
//             >
//               <div className="flex flex-col gap-6 px-8 py-8">
//                 {/* Left */}
//                 <div className="flex flex-1 items-start gap-5">
//                   <div className="rounded-lg bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
//                     <Icon className="h-6 w-6" />
//                   </div>

//                   <div className="space-y-2">
//                     <h3 className="text-xl font-semibold">{item.title}</h3>

//                     <p className="max-w-2xl text-muted-foreground">{item.description}</p>
//                   </div>
//                 </div>

//                 {/* Right */}
//                 <div className="p-">
//                   <p className="text-sm leading-relaxed text-muted-foreground md:text-left">
//                     {item.message}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import { Hammer, Microscope, Network, Cog } from "lucide-react";

import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: 1,
    title: "Distribution",
    description:
      "Aluminium, Titanium, Nickel, Superalloys, Special Steels. Mill-direct sourcing with full MTC chain.",
    href: "/services/distribution",
    icon: Cog,
  },
  {
    id: 2,
    title: "Cut-to-Size",
    description:
      "Precision sawing and waterjet cutting to your part print — reducing inventory and scrap. Best size supply.",
    href: "/services/cut-to-size",
    icon: Hammer,
  },
  {
    id: 3,
    title: "NABL-Accredited Testing",
    description:
      "Chemical (PMI/OES), mechanical, and metallurgical and dimentional inspection. Open to third-party testing.",
    href: "/services/backend",
    icon: Microscope,
  },
  {
    id: 4,
    title: "Manufacturing Network",
    description:
      "Pre-qualified AS9100/9120, EN9120 and NADCAP partners for machining, forming, treatments, and assemblies.",
    href: "/services/security",
    icon: Network,
  },
];

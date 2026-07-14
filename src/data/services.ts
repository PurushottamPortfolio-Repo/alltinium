import { Hammer, Microscope, Network, Cog } from "lucide-react";

import { Services } from "@/assets/services"; // <-- Update this path
import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: 1,
    title: "Distribution",
    description:
      "Aluminium, Titanium, Nickel, Superalloys, Special Steels. Mill-direct sourcing with full MTC chain.",
    href: "/services/distribution",
    icon: Cog,
    image: Services.service1,
  },
  {
    id: 2,
    title: "Cut-to-Size",
    description:
      "Precision sawing and waterjet cutting to your part print — reducing inventory and scrap.",
    href: "/services/cut-to-size",
    icon: Hammer,
    image: Services.service2,
  },
  {
    id: 3,
    title: "NABL-Accredited Testing",
    description:
      "Chemical (PMI/OES), mechanical, metallurgical and dimensional inspection. Open to third-party testing.",
    href: "/services/testing",
    icon: Microscope,
    image: Services.service3,
  },
  {
    id: 4,
    title: "Manufacturing Network",
    description:
      "Pre-qualified AS9100/9120, EN9120 and NADCAP partners for machining, forming, treatments, and assemblies.",
    href: "/services/manufacturing",
    icon: Network,
    image: Services.service4,
  },
];

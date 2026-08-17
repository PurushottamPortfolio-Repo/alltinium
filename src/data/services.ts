import { Hammer, Microscope, Network, Cog } from "lucide-react";

import { Services } from "@/assets/services"; // <-- Update this path
import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: 1,
    title: "Distribution",
    description: "Aerospace-grade metals, ex-stock, with the paperwork that survives an audit",
    message:
      "We hold aluminium, titanium, nickel superalloys (Inconel 718 and beyond) and aerospace special steels sourced directly from qualified mills and master distributors. Every consignment ships with a full material test certificate (EN 10204 3.1) and unbroken heat/lot traceability from mill to your goods-inward. As India's first independent, open-market, multi-mill hub, we serve the 200+ manufacturers who fall outside captive OEM-programme supply - so you get mill-quality material on open-market terms, without waiting on a contracted programme allocation.",
    icon: Cog,
    image: Services.service1,
  },
  {
    id: 2,
    title: "Cut-to-Size",
    description: "Buy the metal you need, not the bar you have to store.",
    message:
      "Precision sawing and waterjet cutting to your part print means you carry material by the piece, not the full mill length. That cuts the capital you tie up in inventory, the scrap you write off, and the shop-floor time your team spends breaking down stock. Each cut piece retains its parent heat number and certification, so traceability is never lost in the cutting cell. Ideal for prototype runs, low-volume programmes, and MSMEs who can't justify holding full-length stock across a dozen alloys.",
    icon: Hammer,
    image: Services.service2,
  },
  {
    id: 3,
    title: "Accredited Testing",
    description: "Independent verification that the metal is what the cert says it is.",
    message:
      "Chemical analysis (PMI / OES - positive material identification and optical emission spectrometry), mechanical testing, metallurgical examination and dimensional inspection, delivered through accredited partner labs. This is your defence against counterfeit and mixed-heat material - the single largest quality risk in open-market metal supply, and the reason AS9120 exists. Whether you need incoming verification, a disputed batch re-checked, or a full conformance package for your own customer, the results come with documentation an auditor will accept.",
    icon: Microscope,
    image: Services.service3,
  },
  {
    id: 4,
    title: "Manufacturing",
    description: "A pre-qualified route from raw stock to finished, certified part.",
    message:
      "For work beyond cut-to-size, we connect you to a vetted network of AS9100 / AS9120, EN 9120 and NADCAP-approved manufacturing and special-process partners - machining, forming, heat treatment, surface finishing. You deal with one accountable supply chain instead of chasing and qualifying multiple vendors yourself, while material provenance and certification carry through every processing step.",
    icon: Network,
    image: Services.service4,
  },
];

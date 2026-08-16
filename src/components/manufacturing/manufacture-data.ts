import type { FAQItem, AssuranceItem, CapabilityItem, ProcessStep, AudienceItem } from "./type";
import {
  Box,
  Flame,
  Layers3,
  Link2,
  ScanLine,
  Settings2,
  Sparkles,
  Wrench,
  Building2,
  Rocket,
} from "lucide-react";

export const faqData: FAQItem[] = [
  {
    question: "Who actually manufactures my part?",
    answer:
      "A facility from our qualified partner network, selected against your process, certification and volume requirement. Alltinium manages the job and remains your contractual counterparty; partner identity can be disclosed under NDA where your programme's quality system requires it.",
  },
  {
    question: "Can you handle multi-process jobs — e.g. machining plus anodising plus assembly?",
    answer:
      "Yes. That is precisely the use case: we sequence the routing across facilities, manage inter-process logistics and inspection, and deliver the finished part with a consolidated documentation package.",
  },
  {
    question: "Do you supply the raw material too?",
    answer:
      "Yes — material supply is our core business. Parts can be quoted on Alltinium-supplied, fully certified material (MTC EN 10204 3.1) or on customer-supplied stock.",
  },
  {
    question: "What about IP and drawing confidentiality?",
    answer:
      'We execute NDAs before receiving controlled drawings, and partner collaboration agreements carry confidentiality flow-down obligations. Tick "Request NDA" in the RFQ form and we send our mutual NDA first.',
  },
  {
    question: "What volumes do you take on?",
    answer:
      "From single-piece prototypes to recurring production contracts. For prototypes we prioritise speed and DFM feedback; for production we qualify the route formally before rate supply.",
  },
];

export const assuranceItems: AssuranceItem[] = [
  {
    title: "Vetted, certified partners",
    description:
      "Facilities qualified on certification scope, capability, capacity and track record before any job is routed to them.",
  },
  {
    title: "Traceability by default",
    description:
      "Material MTC chain, route cards and inspection records maintained across every process step — audit-ready documentation.",
  },
  {
    title: "Material + manufacturing",
    description:
      "We stock the aerospace-grade material and coordinate its conversion — closing the loop from mill certificate to finished part.",
  },
  {
    title: "Single commercial interface",
    description:
      "One RFQ, one quotation, one purchase order, one invoice — Alltinium carries the coordination burden, not your team.",
  },
];

export const capabilityItems: CapabilityItem[] = [
  {
    title: "Machining",
    description: "CNC milling, turning, EDM, grinding",
    icon: Wrench,
    tags: ["CNC Milling", "CNC Turning", "EDM", "Grinding"],
  },
  {
    title: "Forming",
    description: "Forging, extrusion, sheet-metal forming",
    icon: Sparkles,
    tags: ["Forging", "Extrusion", "Roll Forming", "Sheet-Metal Forming"],
  },
  {
    title: "Casting",
    description: "Investment, sand, die & vacuum casting",
    icon: Layers3,
    tags: ["Investment Casting", "Sand Casting", "Die / Pressure Casting", "Centrifugal Casting"],
  },
  {
    title: "Heat Treatment",
    description: "Annealing, aging, nitriding, vacuum HT",
    icon: Flame,
    tags: [
      "Annealing / Normalising",
      "Hardening & Tempering",
      "Solution Treatment & Aging",
      "Case Hardening",
    ],
  },
  {
    title: "Surface Treatment",
    description: "Anodising, plating, coating, peening",
    icon: ScanLine,
    tags: ["Anodising", "Plating", "Passivation", "Chemical Conversion Coating"],
  },
  {
    title: "Welding & Joining",
    description: "TIG, laser, EB welding, brazing",
    icon: Link2,
    tags: [
      "TIG / GTAW Welding",
      "Laser Welding",
      "Electron-Beam Welding",
      "Resistance / Spot Welding",
    ],
  },
  {
    title: "Additive Manufacturing",
    description: "Metal & polymer 3D printing",
    icon: Box,
    tags: ["Metal AM", "Polymer AM", "Post-processing & HIP"],
  },
  {
    title: "Assembly & Testing",
    description: "Sub-assemblies, kitting, NDT & inspection",
    icon: Settings2,
    tags: ["Sub-assembly Build", "Kitting & Integration", "NDT", "Dimensional Inspection"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Submit your RFQ",
    description:
      "Define the process, material, quantities and certifications in the structured form below. Attach drawings under NDA if required.",
  },
  {
    number: "02",
    title: "We match & quote",
    description:
      "We select the right certified facility from our vetted network and return a single consolidated quotation — typically within 48 business hours.",
  },
  {
    number: "03",
    title: "We manage the job",
    description:
      "Alltinium coordinates the work order, material, inspection and special processes — with route-card and MTC traceability maintained throughout.",
  },
  {
    number: "04",
    title: "One invoice, delivered",
    description:
      "You receive the finished part or sub-assembly with the full documentation package. One PO, one invoice, one accountable partner.",
  },
];

export const audienceItems: AudienceItem[] = [
  {
    title: "Technology Startups",
    description:
      "Mobility, robotics, drones/UAS, launch vehicles, weapons systems and aerospace & defence equipment builders who need prototype and low-volume production without building a supplier base from scratch.",
    tags: ["Prototyping", "DFM input", "Low MOQ"],
    icon: Rocket,
  },
  {
    title: "OEMs & Tier-1s",
    description:
      "Primes and integrators looking for pre-qualified sub-vendors for components and sub-assemblies — with consolidated QA, one commercial interface, and audit-ready traceability on every lot.",
    tags: ["Sub-assemblies", "Vendor development", "Serial supply"],
    icon: Building2,
  },
  {
    title: "MRO & R&D Programmes",
    description:
      "Repair organisations and research programmes needing certified special processes — heat treatment, surface treatment, NDT — on aerospace-grade materials with full documentation.",
    tags: ["Special processes", "Cert packages", "Material + process"],
    icon: Wrench,
  },
];

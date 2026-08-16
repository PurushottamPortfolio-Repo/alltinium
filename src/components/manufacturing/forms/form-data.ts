import { Box, Flame, Layers3, Link2, ScanLine, Settings2, Sparkles, Wrench } from "lucide-react";

import type { CertificationOption, ProcessCategory, SelectOption } from "./types";

export const PROCESS_CATEGORIES: ProcessCategory[] = [
  {
    id: "machining",
    title: "Machining",
    sub: "CNC milling, turning, EDM, grinding",
    icon: Wrench,
    processes: [
      {
        id: "cnc-milling",
        label: "CNC Milling",
        sub: "3 variants",
        variants: [
          { id: "3-axis", label: "3-axis" },
          { id: "4-axis", label: "4-axis" },
          { id: "5-axis", label: "5-axis" },
        ],
      },
      {
        id: "cnc-turning",
        label: "CNC Turning",
        sub: "3 variants",
        variants: [
          { id: "2-axis", label: "2-axis" },
          { id: "live-tooling", label: "Live tooling" },
          { id: "swiss-type", label: "Swiss-type" },
        ],
      },
      {
        id: "edm",
        label: "EDM",
        sub: "2 variants",
        variants: [
          { id: "wire-edm", label: "Wire EDM" },
          { id: "sinker-edm", label: "Sinker EDM" },
        ],
      },
      {
        id: "grinding",
        label: "Grinding",
        sub: "3 variants",
        variants: [
          { id: "surface-grinding", label: "Surface grinding" },
          { id: "cylindrical-grinding", label: "Cylindrical grinding" },
          { id: "centerless-grinding", label: "Centerless grinding" },
        ],
      },
      { id: "drilling-boring", label: "Drilling & Boring", sub: "—" },
      { id: "micro-machining", label: "Precision Micro-machining", sub: "—" },
    ],
  },
  {
    id: "forming",
    title: "Forming",
    sub: "Forging, extrusion, sheet-metal forming",
    icon: Sparkles,
    processes: [
      {
        id: "forging",
        label: "Forging",
        sub: "3 variants",
        variants: [
          { id: "open-die", label: "Open-die" },
          { id: "closed-die", label: "Closed-die" },
          { id: "ring-rolling", label: "Ring rolling" },
        ],
      },
      {
        id: "extrusion",
        label: "Extrusion",
        sub: "2 variants",
        variants: [
          { id: "direct", label: "Direct" },
          { id: "indirect", label: "Indirect" },
        ],
      },
      { id: "roll-forming", label: "Roll Forming", sub: "—" },
      {
        id: "sheet-metal-forming",
        label: "Sheet-Metal Forming",
        sub: "3 variants",
        variants: [
          { id: "press-brake", label: "Press brake" },
          { id: "deep-drawing", label: "Deep drawing" },
          { id: "stamping", label: "Stamping" },
        ],
      },
    ],
  },
  {
    id: "casting",
    title: "Casting",
    sub: "Investment, sand, die & vacuum casting",
    icon: Layers3,
    processes: [
      { id: "investment-casting", label: "Investment Casting", sub: "—" },
      { id: "sand-casting", label: "Sand Casting", sub: "—" },
      { id: "die-pressure-casting", label: "Die / Pressure Casting", sub: "—" },
      { id: "vacuum-casting", label: "Vacuum Casting", sub: "—" },
      { id: "centrifugal-casting", label: "Centrifugal Casting", sub: "—" },
    ],
  },
  {
    id: "heat-treatment",
    title: "Heat Treatment",
    sub: "Annealing, aging, nitriding, vacuum HT",
    icon: Flame,
    processes: [
      { id: "annealing-normalising", label: "Annealing / Normalising", sub: "—" },
      { id: "hardening-tempering", label: "Hardening & Tempering", sub: "—" },
      { id: "solution-treatment-aging", label: "Solution Treatment & Aging", sub: "—" },
      { id: "case-hardening", label: "Case Hardening", sub: "—" },
      { id: "vacuum-heat-treatment", label: "Vacuum Heat Treatment", sub: "—" },
      { id: "nitriding", label: "Nitriding", sub: "—" },
    ],
  },
  {
    id: "surface-treatment",
    title: "Surface Treatment",
    sub: "Anodising, plating, coating, peening",
    icon: ScanLine,
    processes: [
      {
        id: "anodising",
        label: "Anodising",
        sub: "2 variants",
        variants: [
          { id: "type-ii", label: "Type II" },
          { id: "type-iii-hard", label: "Type III (hard anodising)" },
        ],
      },
      {
        id: "plating",
        label: "Plating",
        sub: "4 variants",
        variants: [
          { id: "cadmium", label: "Cadmium" },
          { id: "nickel", label: "Nickel" },
          { id: "chrome", label: "Chrome" },
          { id: "zinc-nickel", label: "Zinc-Nickel" },
        ],
      },
      { id: "passivation", label: "Passivation", sub: "—" },
      { id: "chemical-conversion-coating", label: "Chemical Conversion Coating", sub: "—" },
      { id: "shot-peening", label: "Shot Peening", sub: "—" },
    ],
  },
  {
    id: "welding-joining",
    title: "Welding & Joining",
    sub: "TIG, laser, EB welding, brazing",
    icon: Link2,
    processes: [
      { id: "tig-gtaw-welding", label: "TIG / GTAW Welding", sub: "—" },
      { id: "laser-welding", label: "Laser Welding", sub: "—" },
      { id: "electron-beam-welding", label: "Electron-Beam Welding", sub: "—" },
      { id: "resistance-spot-welding", label: "Resistance / Spot Welding", sub: "—" },
      { id: "brazing", label: "Brazing", sub: "—" },
    ],
  },
  {
    id: "additive-manufacturing",
    title: "Additive Manufacturing",
    sub: "Metal & polymer 3D printing",
    icon: Box,
    processes: [
      {
        id: "metal-am",
        label: "Metal AM",
        sub: "2 variants",
        variants: [
          { id: "dmls-slm", label: "DMLS / SLM" },
          { id: "ebm", label: "EBM" },
        ],
      },
      {
        id: "polymer-am",
        label: "Polymer AM",
        sub: "3 variants",
        variants: [
          { id: "sla", label: "SLA" },
          { id: "sls", label: "SLS" },
          { id: "fdm", label: "FDM" },
        ],
      },
      { id: "post-processing-hip", label: "Post-processing & HIP", sub: "—" },
    ],
  },
  {
    id: "assembly-testing",
    title: "Assembly & Testing",
    sub: "Sub-assemblies, kitting, NDT & inspection",
    icon: Settings2,
    processes: [
      { id: "sub-assembly-build", label: "Sub-assembly Build", sub: "—" },
      { id: "kitting-integration", label: "Kitting & Integration", sub: "—" },
      {
        id: "ndt",
        label: "NDT",
        sub: "4 variants",
        variants: [
          { id: "x-ray", label: "X-ray" },
          { id: "ultrasonic", label: "Ultrasonic" },
          { id: "dye-penetrant", label: "Dye Penetrant" },
          { id: "magnetic-particle", label: "Magnetic Particle" },
        ],
      },
      {
        id: "dimensional-inspection",
        label: "Dimensional Inspection",
        sub: "1 variant",
        variants: [{ id: "cmm", label: "CMM" }],
      },
    ],
  },
];

export const MATERIAL_FAMILIES: SelectOption[] = [
  { value: "aluminium-alloy", label: "Aluminium alloy" },
  { value: "titanium-alloy", label: "Titanium alloy" },
  { value: "nickel-superalloy", label: "Nickel superalloy" },
  { value: "special-stainless-steel", label: "Special / stainless steel" },
  { value: "tungsten-heavy-alloy", label: "Tungsten / heavy alloy" },
  { value: "composite-polymer", label: "Composite / polymer" },
  { value: "customer-supplied", label: "Customer-supplied material" },
  { value: "not-sure", label: "Not sure — advise me" },
];

export const QUANTITY_TYPES: SelectOption[] = [
  { value: "prototype", label: "Prototype (1–10)" },
  { value: "small-batch", label: "Small batch (10–100)" },
  { value: "production", label: "Production (100+)" },
  { value: "recurring", label: "Recurring / rate contract" },
];

export const TOLERANCE_CLASSES: SelectOption[] = [
  { value: "general-iso-2768-m", label: "General (ISO 2768-m)" },
  { value: "fine-iso-2768-f", label: "Fine (ISO 2768-f)" },
  { value: "precision-gdt", label: "Precision (per drawing GD&T)" },
  { value: "na", label: "Not applicable / process-defined" },
];

export const CERTIFICATIONS: CertificationOption[] = [
  { id: "iso-9001", label: "ISO 9001" },
  { id: "as9100d", label: "AS9100D" },
  { id: "as9120", label: "AS9120" },
  { id: "en-9100", label: "EN 9100" },
  { id: "nadcap-heat-treating", label: "NADCAP — Heat Treating" },
  { id: "nadcap-chemical-processing", label: "NADCAP — Chemical Processing" },
  { id: "nadcap-ndt", label: "NADCAP — NDT" },
  { id: "nadcap-welding", label: "NADCAP — Welding" },
  { id: "nadcap-coatings", label: "NADCAP — Coatings" },
  { id: "nabl", label: "NABL test reports" },
  { id: "mtc-en-10204-3-1", label: "MTC EN 10204 3.1" },
  { id: "mtc-en-10204-3-2", label: "MTC EN 10204 3.2" },
  { id: "cemilac-dgaqa", label: "CEMILAC / DGAQA oversight" },
  { id: "iso-13485", label: "ISO 13485" },
  { id: "iatf-16949", label: "IATF 16949" },
  { id: "none-commercial-grade", label: "None / commercial grade" },
];

export const CUSTOMER_TYPES: SelectOption[] = [
  { value: "startup", label: "Startup" },
  { value: "oem", label: "OEM" },
  { value: "tier-1-supplier", label: "Tier-1 supplier" },
  { value: "tier-2-3-supplier", label: "Tier-2/3 supplier" },
  { value: "mro", label: "MRO" },
  { value: "defence-psu-govt", label: "Defence PSU / Govt" },
  { value: "rd-academia", label: "R&D / Academia" },
  { value: "other", label: "Other" },
];

export const RFQ_WHATSAPP_NUMBER = "919289080696";
export const RFQ_NOTIFY_EMAIL = "info@alltinium.com";

export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_FILE_EXTENSIONS = ".pdf,.step,.stp,.igs,.iges,.dxf,.dwg,.png,.jpg,.jpeg,.zip";

export function getProcessCategory(categoryId: string) {
  return PROCESS_CATEGORIES.find((category) => category.id === categoryId);
}

export function getProcessOption(categoryId: string, processId: string) {
  return getProcessCategory(categoryId)?.processes.find((process) => process.id === processId);
}

export function getProcessVariant(categoryId: string, processId: string, variantId: string) {
  return getProcessOption(categoryId, processId)?.variants?.find(
    (variant) => variant.id === variantId,
  );
}

import { FileText, Clock3, BadgeCheck, ShieldCheck } from "lucide-react";
import { assets } from "@/assets";

export const CtaSectionData = [
  {
    icon: FileText,
    title: "MTC EN 10204",
    value: "3.1 / 3.2",
    description: "Included on request",
  },
  {
    icon: Clock3,
    title: "Lead Time",
    value: "48 Hrs",
    description: "Structured quotation",
  },
  {
    icon: BadgeCheck,
    title: "Landed Cost",
    value: "Accurate",
    description: "Transparent pricing",
  },
  {
    icon: ShieldCheck,
    title: "Sample Retention",
    value: "Available",
    description: "Quality assurance",
  },
];

export const TECH_STACK = [
  "MAKE-II · iDEX Aligned",
  "DGR Registered",
  "KIADB Aerospace Park · Bengaluru",
  "AS9120 · Stage-1 Audit Q4 2026",
];

export const NetworkSectionData = [
  {
    id: 1,
    title: "5-Axis Machining",
  },
  {
    id: 2,
    title: "Wire EDM",
  },
  {
    id: 3,
    title: "Vacuum Heat Treat",
  },
  {
    id: 4,
    title: "Hot Isostatic Press",
  },
  {
    id: 5,
    title: "NDT (LPI · MPI · UT · RT)",
  },
  {
    id: 6,
    title: "Surface Treatments",
  },
  {
    id: 7,
    title: "Sheet Metal Forming",
  },
  {
    id: 8,
    title: "Brazing & Welding",
  },
];

export const IndustriesSectionData = [
  {
    id: 1,
    icon: "Building2",
    title: "Civil Aerospace",
    href: "",
  },
  {
    id: 2,
    icon: "Building2",
    title: "Defence",
    href: "",
  },
  {
    id: 3,
    icon: "Building2",
    title: "Space",
    href: "",
  },
  {
    id: 4,
    icon: "Building2",
    title: "MRO",
    href: "",
  },
];

export const TrustSectionData = [
  {
    id: 1,
    icon: "ShieldCheck",
    title: "NABL Accredited",
  },
  {
    id: 2,
    icon: "BadgeCheck",
    title: "AS9120 Stage-1",
  },
  {
    id: 3,
    icon: "Award",
    title: "ISO 9001:2015",
  },
  {
    id: 4,
    icon: "Factory",
    title: "Udyam MSME",
  },
  {
    id: 5,
    icon: "Landmark",
    title: "GeM Registered",
  },
  {
    id: 6,
    icon: "Shield",
    title: "DGR Registered",
  },
];

export const BLOG_POSTS = [
  {
    slug: "/choosing-between-7050-and-7075-for-aero-structures",
    title: "Choosing between 7050 and 7075 for aero-structures",
    excerpt:
      "The choice between 7050 and 7075 aluminum alloys for aerospace structures depends on the specific requirements of the application, including strength, corrosion resistance, and performance.",
    category: "Materials",
    tags: ["Next.js", "Architecture"],
    readingTime: 7,
    date: "2026-05-12",
    cover: assets.blog.b1,
  },
  {
    slug: "mtc-chain-what-your-qa-team-should-verify-on-every-consignment",
    title: "MTC chain: what your QA team should verify on every consignment",
    excerpt:
      "Ensuring the quality of materials and components in aerospace manufacturing requires a robust MTC (Material Test Certificate) chain. ",
    category: "Quality",
    tags: ["Design Systems", "Figma"],
    readingTime: 6,
    date: "2026-04-02",
    cover: assets.blog.b1,
  },
  {
    slug: "as9120-what-it-really-means-for-aerospace-buyers-in-india",
    title: "AS9120 — what it really means for aerospace buyers in India",
    excerpt:
      "AS9120 is a quality management standard specifically for aerospace distributors. It ensures that suppliers meet stringent requirements. which is crucial for aerospace buyers in India.",
    category: "Certifications",
    tags: ["Freelance", "Process"],
    readingTime: 5,
    date: "2026-02-18",
    cover: assets.blog.b1,
  },
];

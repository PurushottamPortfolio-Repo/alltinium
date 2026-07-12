import { Code2, MonitorSmartphone, Database, ShieldCheck } from "lucide-react";

import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Fast, scalable and SEO-friendly websites built using Next.js, React and TypeScript.",
    href: "/services/web-development",
    icon: Code2,
  },
  {
    id: 2,
    title: "UI / UX Design",
    description:
      "Beautiful interfaces focused on accessibility, usability and modern user experience.",
    href: "/services/ui-ux",
    icon: MonitorSmartphone,
  },
  {
    id: 3,
    title: "Backend Development",
    description:
      "Secure APIs, authentication, databases and cloud integrations for modern applications.",
    href: "/services/backend",
    icon: Database,
  },
  {
    id: 4,
    title: "Application Security",
    description:
      "Security-first architecture with authentication, authorization and best practices.",
    href: "/services/security",
    icon: ShieldCheck,
  },
];

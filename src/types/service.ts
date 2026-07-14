import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export interface Service {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image: StaticImageData;
}

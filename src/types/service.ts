import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

export interface Service {
  id: number;
  title: string;
  description: string;
  message: string;
  icon: LucideIcon;
  image: StaticImageData;
}

import type { StaticImageData } from "next/image";

export interface BlogPost {
  id: number;
  slug: string;

  title: string;
  excerpt: string;
  content: string;

  category: BlogCategory;
  tags: string[];

  date: string;
  readingTime: number;

  cover: StaticImageData;

  featured?: boolean;
}

export type BlogCategory = "Materials" | "Quality" | "Certifications";

export type BlogFilterCategory = "All" | BlogCategory;

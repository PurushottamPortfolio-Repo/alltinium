export interface MaterialCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MaterialForm {
  id: string;
  name: string;
  description?: string;
}

import { StaticImageData } from "next/image";

export interface MaterialSpecification {
  id: string;
  code: string; // ASTM B221, AMS 4928, etc.
  title?: string;
}

export interface MaterialApplication {
  id: string;
  name: string;
}

export interface MaterialImage {
  id: string;
  src: string | StaticImageData;
  alt: string;
  isPrimary?: boolean;
}

export interface MaterialDatasheet {
  title: string;
  file: string; // PDF path or Cloudinary URL
}

export interface Material {
  // Required
  id: string;
  title: string;

  category: string; // Category ID
  form: string; // Forms ID

  specifications: string[]; // Specification IDs
  applications: string[]; // Application IDs

  image: MaterialImage;
  datasheet: MaterialDatasheet;

  // Optional (recommended)
  slug?: string;
  grade?: string;
  alloy?: string;
  description?: string;
  shortDescription?: string;

  images?: MaterialImage[];

  features?: string[];

  industries?: string[];

  standards?: string[];

  dimensions?: {
    diameter?: string;
    thickness?: string;
    width?: string;
    length?: string;
    custom?: string;
  };

  mechanicalProperties?: {
    tensileStrength?: string;
    yieldStrength?: string;
    elongation?: string;
    hardness?: string;
  };

  chemicalComposition?: Record<string, string>;

  availability?: {
    inStock?: boolean;
    leadTime?: string;
  };

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };

  featured?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

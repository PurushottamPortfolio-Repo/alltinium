import { MaterialCategory } from "./types";
import { assets } from "@/assets";
export const MATERIALS: MaterialCategory[] = [
  {
    id: "aluminium",
    title: "Aluminium",
    slug: "aluminium",

    image: "/materials/aluminium.webp",

    description: "High-strength aerospace and industrial aluminium alloys.",

    datasheet: {
      title: "Aluminium Datasheet",
      file: "/datasheets/aluminium.pdf",
    },

    series: [
      {
        id: "2000",
        title: "2000 Series(Al-Cu)",

        products: ["2014", "2024", "2219", "2099/2195 Al-Li"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
          { id: "extrusion", name: "Extrusion" },
          { id: "forging", name: "Forging" },
          { id: "wire", name: "Wire" },
        ],
      },

      {
        id: "5000",
        title: "5000 Series(Al-Mg, Marine)",

        products: ["5083", "5086"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
        ],
      },

      {
        id: "6000",
        title: "6000 Series(Al-Mg-Si)",

        products: ["6061", "6082"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "tube", name: "Tube" },
          { id: "bar", name: "Bar" },
          { id: "extrusion", name: "Extrusion" },
          { id: "profile", name: "Profile" },
        ],
      },

      {
        id: "7000",
        title: "7000 Series(Al-Zn)",

        products: ["7050", "7075"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "extrusion", name: "extrusion" },
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
        ],
      },
    ],
  },

  {
    id: "titanium",
    title: "Titanium",
    slug: "titanium",

    image: "/materials/titanium.webp",

    description: "Commercially pure and aerospace-grade titanium alloys.",

    datasheet: {
      title: "Titanium Datasheet",
      file: "/datasheets/titanium.pdf",
    },

    series: [
      {
        id: "cp",
        title: "Commercially Pure",

        products: ["CP Grade 2(1-4)"],

        forms: [
          { id: "tube", name: "Tube" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
          { id: "wire", name: "Wire" },
        ],
      },

      {
        id: "alpha-beta",
        title: "Alpha-Beta",

        products: ["Grade 5", "Grade 23", "Grade 9"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
        ],
      },

      {
        id: "beta",
        title: "Beta",

        products: ["Ti-15-3", "Beta C"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "bar", name: "Bar" },
        ],
      },

      {
        id: "high-temp",
        title: "Elevated Temperature",

        products: ["Ti-6242", "Ti-6246"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
        ],
      },
    ],
  },
];

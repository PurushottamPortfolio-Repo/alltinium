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
          { name: "Plate" },
          { name: "Sheet" },
          { name: "Bar" },
          { name: "Extrusion" },
          { name: "Forging" },
          { name: "Wire" },
        ],
      },

      {
        id: "5000",
        title: "5000 Series(Al-Mg, Marine)",

        products: ["5083", "5086"],

        forms: [{ name: "Plate" }, { name: "Sheet" }, { name: "Bar" }],
      },

      {
        id: "6000",
        title: "6000 Series(Al-Mg-Si)",

        products: ["6061", "6082"],

        forms: [
          { name: "Plate" },
          { name: "Tube" },
          { name: "Bar" },
          { name: "Extrusion" },
          { name: "Profile" },
        ],
      },

      {
        id: "7000",
        title: "7000 Series(Al-Zn)",

        products: ["7050", "7075"],

        forms: [{ name: "Plate" }, { name: "extrusion" }, { name: "Bar" }, { name: "Forging" }],
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

        forms: [{ name: "Tube" }, { name: "Sheet" }, { name: "Bar" }, { name: "Wire" }],
      },

      {
        id: "alpha-beta",
        title: "Alpha-Beta",

        products: ["Grade 5", "Grade 23", "Grade 9"],

        forms: [{ name: "Plate" }, { name: "Sheet" }, { name: "Bar" }, { name: "Forging" }],
      },

      {
        id: "beta",
        title: "Beta",

        products: ["Ti-15-3", "Beta C"],

        forms: [{ name: "Plate" }, { name: "Bar" }],
      },

      {
        id: "high-temp",
        title: "Elevated Temperature",

        products: ["Ti-6242", "Ti-6246"],

        forms: [{ name: "Plate" }, { name: "Bar" }, { name: "Forging" }],
      },
    ],
  },
];

import { Material } from "@/types/material";
import { assets } from "@/assets";

export const MATERIALS: Material[] = [
  {
    id: "alu-6061-bar",

    title: "Aluminium 6061 Bar",

    category: "aluminium",

    form: "bar",

    grade: "6061",

    specifications: ["ASTM B221", "AMS 4127"],

    applications: ["Aerospace", "Automotive"],

    image: {
      id: "alu-6061-bar-image",
      src: assets.materials.aluminium.bar6061,
      alt: "Aluminium 6061 Bar",
      isPrimary: true,
    },

    datasheet: {
      title: "Aluminium 6061 Bar Datasheet",
      file: "/datasheets/aluminium/6061-bar.pdf",
    },

    description:
      "Heat-treatable aluminium alloy with excellent strength, corrosion resistance and machinability.",

    featured: true,
  },
];

import { Material } from "@/types/material";
import { assets } from "@/assets";

export const ALUMINIUM_MATERIALS: Material[] = [
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
  {
    id: "alu-7075-bar",
    title: "Aluminium 7075 Bar",
    category: "aluminium",
    form: "bar",
    grade: "7075",
    specifications: ["ASTM B221", "AMS 4127"],
    applications: ["Aerospace", "Defence"],
    image: {
      id: "alu-7075-bar-image",
      src: assets.materials.aluminium.bar7075,
      alt: "Aluminium 7075 Bar",
    },
    datasheet: {
      title: "Aluminium 7075 Bar Datasheet",
      file: "/datasheets/aluminium/7075-bar.pdf",
    },
    description:
      "High-strength aluminium alloy used in demanding aerospace and defence components.",
  },
  {
    id: "alu-5083-plate",
    title: "Aluminium 5083 Plate",
    category: "aluminium",
    form: "plate",
    grade: "5083",
    specifications: ["ASTM B209", "DIN EN 573"],
    applications: ["Marine", "Automotive"],
    image: {
      id: "alu-5083-plate-image",
      src: assets.materials.aluminium.plate5083,
      alt: "Aluminium 5083 Plate",
    },
    datasheet: {
      title: "Aluminium 5083 Plate Datasheet",
      file: "/datasheets/aluminium/5083-plate.pdf",
    },
    description:
      "Excellent corrosion resistance and weldability for marine and structural applications.",
  },
];

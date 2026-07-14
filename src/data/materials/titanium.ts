import { Material } from "@/types/material";
import { assets } from "@/assets";

export const TITANIUM_MATERIALS: Material[] = [
  {
    id: "ti-grade2-bar",
    title: "Titanium Grade 2 Bar",
    category: "titanium",
    form: "bar",
    grade: "Grade 2",
    specifications: ["ASTM B348"],
    applications: ["Aerospace", "Medical"],
    image: {
      id: "ti-grade2-bar-image",
      src: assets.materials.titanium.grade2Bar,
      alt: "Titanium Grade 2 Bar",
    },
    datasheet: {
      title: "Titanium Grade 2 Bar Datasheet",
      file: "/datasheets/titanium/grade2-bar.pdf",
    },
    description: "Commercially pure titanium with excellent corrosion resistance and formability.",
  },
];

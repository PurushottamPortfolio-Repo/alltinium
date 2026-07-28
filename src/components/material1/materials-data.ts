import { MaterialCategory } from "./types";
export const MATERIALS: MaterialCategory[] = [
  {
    id: "aluminium",
    title: "Aluminium",
    slug: "aluminium",

    description: "High-strength aerospace and industrial aluminium alloys.",

    datasheet: {
      title: "Aluminium Datasheet",
      file: "/datasheets/aluminium.pdf",
    },

    series: [
      {
        id: "2000",
        title: "2000 Series(Al-Cu)",

        grades: ["2014", "2024", "2219", "2099/2195 Al-Li"],

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

        grades: ["5083", "5086"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
        ],
      },

      {
        id: "6000",
        title: "6000 Series(Al-Mg-Si)",

        grades: ["6061", "6082"],

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

        grades: ["7050", "7075"],

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

    description: "Commercially pure and aerospace-grade titanium alloys.",

    datasheet: {
      title: "Titanium Datasheet",
      file: "/datasheets/titanium.pdf",
    },

    series: [
      {
        id: "cp",
        title: "Commercially Pure",

        grades: ["CP Grade 2(1-4)"],

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

        grades: ["Grade 5", "Grade 23", "Grade 9"],

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

        grades: ["Ti-15-3", "Beta C"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "bar", name: "Bar" },
        ],
      },

      {
        id: "high-temp",
        title: "Elevated Temperature",

        grades: ["Ti-6242", "Ti-6246"],

        forms: [
          { id: "plate", name: "Plate" },
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
        ],
      },
    ],
  },

  {
    id: "nickel",
    title: "Nickel Superalloys",
    slug: "nickel",

    description: "Commercially pure and aerospace-grade nickel alloys.",

    datasheet: {
      title: "Nickel Datasheet",
      file: "/datasheets/nickel.pdf",
    },
    series: [
      {
        id: "inc",
        title: "Inconel",

        grades: ["718", "625", "600/601", "X-750"],

        forms: [
          { id: "tube", name: "Tube" },
          { id: "sheet", name: "Sheet" },
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
          { id: "powder", name: "Powder" },
        ],
      },
      {
        id: "hst",
        title: "Hastelloy",

        grades: ["C-276", "X"],

        forms: [
          { id: "tube", name: "Tube" },
          { id: "plate", name: "Plate" },
          { id: "bar", name: "Bar" },
          { id: "wire", name: "Wire" },
        ],
      },
      {
        id: "wsp",
        title: "Waspaloy",

        grades: ["Waspaloy"],

        forms: [
          { id: "forging", name: "Forging" },
          { id: "bar", name: "Bar" },
        ],
      },
      {
        id: "monel",
        title: "Monel",

        grades: ["400", "K-500"],

        forms: [
          { id: "tube", name: "Tube" },
          { id: "bar", name: "Bar" },
          { id: "wire", name: "Wire" },
        ],
      },
    ],
  },
  {
    id: "steel",
    title: "Special steel",
    slug: "nickel",

    description: "Commercially pure and aerospace-grade steel alloys.",

    datasheet: {
      title: "Steel Datasheet",
      file: "/datasheets/steel.pdf",
    },
    series: [
      {
        id: "phs",
        title: "PH Stainless",

        grades: ["15-5PH", "17-4PH", "13-8Mo"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
          { id: "wire", name: "Wire" },
        ],
      },
      {
        id: "Austenetic",
        title: "Austenetic / Martensitic",

        grades: ["316L", "321", "410", "440C"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "sheet", name: "Sheet" },
          { id: "tube", name: "Tube" },
        ],
      },
      {
        id: "HSLA",
        title: "HSLA / Ultra-High-strength",

        grades: ["4340", "300M", "4130", "9310"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
          { id: "tube", name: "Tube" },
        ],
      },
      {
        id: "Maraging",
        title: "Maraging - Tool - Nitronic",

        grades: ["250/300/350", "H13/D2/M2", "N60"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "forging", name: "Forging" },
          { id: "plate", name: "Plate" },
        ],
      },
    ],
  },
  {
    id: "tungsten",
    title: "Tungsten",
    slug: "tungsten",
    description: "Commercially pure and aerospace-grade titanium alloys.",
    datasheet: {
      title: "Tungsten Datasheet",
      file: "/datasheets/tungsten.pdf",
    },
    series: [
      {
        id: "tha",
        title: "Tungsten Heavy Alloy",

        grades: ["90W", "95W-Ni-Fe"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "block", name: "Block" },
          { id: "cube", name: "Cube" },
          { id: "billet", name: "Billet" },
        ],
      },
      {
        id: "pt",
        title: "Pure Tungsten",

        grades: ["W >= 99.95"],

        forms: [
          { id: "rod", name: "Rod" },
          { id: "plate", name: "Plate" },
          { id: "sheet", name: "Sheet" },
        ],
      },
      {
        id: "pac",
        title: "Powder & Carbide",

        grades: ["HP Powder", "WC-Co"],

        forms: [
          { id: "rod", name: "Rod" },
          { id: "powder", name: "Powder" },
          { id: "insert", name: "Insert" },
        ],
      },
    ],
  },

  {
    id: "cas",
    title: "Critical & Strategic",
    slug: "criticalandstrategic",
    description: "Commercially pure and aerospace-grade titanium alloys.",
    datasheet: {
      title: "Critical & Strategic Datasheet",
      file: "/datasheets/CAS.pdf",
    },
    series: [
      {
        id: "rs",
        title: "Refractory / Strategic",

        grades: ["Niobiun/FeNb", "Cobalt", "Hafnium"],

        forms: [
          { id: "bar", name: "Bar" },
          { id: "ingot", name: "Ingot" },
          { id: "powder", name: "Powder" },
        ],
      },
      {
        id: "sf",
        title: "Superalloy Feedstock",

        grades: ["Vanadium", "Rhenium", "Tantalum"],

        forms: [
          { id: "cathode", name: "Cthode" },
          { id: "pellet", name: "Pellet" },
          { id: "powder", name: "Powder" },
        ],
      },
    ],
  },
];

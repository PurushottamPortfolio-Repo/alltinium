import { BlogPost } from "@/types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",

    slug: "difference-between-6061-and-7075-aluminium",

    title: "Difference Between 6061 and 7075 Aluminium for Aerospace Applications",

    excerpt:
      "Learn which aluminium alloy should be selected for aerospace, defence and precision machining projects.",

    cover: "/blogs/6061-vs-7075.webp",

    category: "Materials",

    publishedAt: "2026-07-10",

    readingTime: 6,

    featured: true,

    tags: ["6061", "7075", "Aluminium", "Aerospace"],

    author: {
      name: "Purushottam Kumar",
      role: "Materials Engineer",
      avatar: "/author.jpg",
    },

    content: [
      {
        paragraph: "Choosing the correct aluminium alloy is essential for aerospace applications.",
      },
      {
        heading: "6061 Aluminium",
      },
      {
        paragraph: "6061 provides excellent corrosion resistance and weldability.",
      },
      {
        heading: "7075 Aluminium",
      },
      {
        paragraph: "7075 offers superior tensile strength but lower corrosion resistance.",
      },
      {
        heading: "Comparison",
      },
      {
        list: [
          "6061 is easier to machine.",
          "7075 is stronger.",
          "6061 is less expensive.",
          "7075 is preferred in aircraft structures.",
        ],
      },
    ],
  },
];

import heroBg from "./images/hero-bg.jpg";
import b1 from "./images/blog/b1.jpg";
import logo from "./logo/logo.png";

import { materialImages } from "./materials";

export const assets = {
  heroBg,

  logo,

  blog: {
    b1,
  },

  materials: materialImages,
} as const;

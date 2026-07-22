import heroBg from "./images/hero-bg.jpg";
import b1 from "./services/manufactoring.png";
import logo from "./logo/logo.png";
// import { alumsheet } from "./datasheets/aluminium.pdf";
import { profileImages } from "./profiles";
import { materialImages } from "./materials";

export const assets = {
  heroBg,

  logo,
  // sheet: {
  //   alumsheet,
  // },
  blog: {
    b1,
  },
  profiles: profileImages,
  materials: materialImages,
} as const;

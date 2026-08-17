import heroBg from "./images/hero-bg.jpg";
import b1 from "./services/manufactoring.png";
import logo from "./logo/logo.png";
import { themeLogo } from "./logo";
import { profileImages } from "./profiles";

export const assets = {
  heroBg,
  logo,
  logo1: themeLogo,
  blog: {
    b1,
  },
  profiles: profileImages,
} as const;

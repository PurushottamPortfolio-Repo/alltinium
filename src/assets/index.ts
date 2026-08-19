import heroBg from "./images/hero-bg.jpg";
import logo from "./logo/logo.png";
import { themeLogo } from "./logo";
import { profileImages } from "./profiles";
import { BlogCover } from "./blog";
import { Services } from "./services";

export const assets = {
  heroBg,
  logo,
  logo1: themeLogo,
  blogCover: BlogCover,
  profiles: profileImages,
  services: Services,
} as const;

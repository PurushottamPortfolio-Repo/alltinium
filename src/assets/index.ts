import heroBg from "./images/hero-bg.jpg";
import { themeLogo } from "./logo";
import { profileImages } from "./profiles";
import { BlogCover } from "./blog";
import { Services } from "./services";
import fevi from "@/app/favicon.ico";

export const assets = {
  heroBg,
  logo: fevi,
  logo1: themeLogo,
  blogCover: BlogCover,
  profiles: profileImages,
  services: Services,
} as const;

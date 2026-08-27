import heroBg from "./images/hero-bg.jpg";
import { themeLogo } from "./logo";
import { profileImages } from "./profiles";
import { BlogCover } from "./blog";
import { Services } from "./services";

export const assets = {
  heroBg,
  logo1: themeLogo,
  blogCover: BlogCover,
  profiles: profileImages,
  services: Services,
} as const;

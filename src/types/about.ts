import { StaticImageData } from "next/image";

export interface About {
  id: number;
  title: string;
  text: string;
  text2: string;
  image: StaticImageData;
}

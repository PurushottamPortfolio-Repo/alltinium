import { Material } from "@/types/material";
import { ALUMINIUM_MATERIALS } from "./aluminium";
import { TITANIUM_MATERIALS } from "./titanium";
import { NICKEL_SUPERALLOYS_MATERIALS } from "./nickel-superalloys";
import { SPECIAL_STEELS_MATERIALS } from "./special-steels";

export const MATERIALS: Material[] = [
  ...ALUMINIUM_MATERIALS,
  ...TITANIUM_MATERIALS,
  ...NICKEL_SUPERALLOYS_MATERIALS,
  ...SPECIAL_STEELS_MATERIALS,
];

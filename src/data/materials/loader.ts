import type { Material } from "@/types/material";

export async function loadAllMaterials(): Promise<Material[]> {
  const [
    { ALUMINIUM_MATERIALS },
    { TITANIUM_MATERIALS },
    { NICKEL_SUPERALLOYS_MATERIALS },
    { SPECIAL_STEELS_MATERIALS },
  ] = await Promise.all([
    import("./aluminium"),
    import("./titanium"),
    import("./nickel-superalloys"),
    import("./special-steels"),
  ]);

  return [
    ...ALUMINIUM_MATERIALS,
    ...TITANIUM_MATERIALS,
    ...NICKEL_SUPERALLOYS_MATERIALS,
    ...SPECIAL_STEELS_MATERIALS,
  ];
}

export async function loadFeaturedMaterials(limit = 3): Promise<Material[]> {
  const materials = await loadAllMaterials();
  return materials.filter((material) => material.featured).slice(0, limit);
}

export async function loadMaterialsByCategory(category: string): Promise<Material[]> {
  const materials = await loadAllMaterials();
  return materials.filter((material) => material.category === category);
}

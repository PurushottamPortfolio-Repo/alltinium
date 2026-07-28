import { MATERIALS } from "@/components/material1/materials-data";

export function getMaterialById(id: string) {
  return MATERIALS.find((m) => m.id === id);
}

export function getGrades(materialId: string) {
  const material = getMaterialById(materialId);

  if (!material) return [];

  return material.series.flatMap((series) =>
    series.grades.map((grade) => ({
      value: grade,
      label: grade,
    })),
  );
}

export function getFormsByGrade(materialId: string, grade: string) {
  const material = MATERIALS.find((m) => m.id === materialId);

  if (!material) return [];

  const series = material.series.find((series) => series.grades.includes(grade));

  if (!series) return [];

  return series.forms.map((form) => ({
    value: form.id,
    label: form.name,
  }));
}

// export function getForms(materialId: string) {
//   const material = getMaterialById(materialId);

//   if (!material) return [];

//   const forms = material.series.flatMap((series) => series.forms);

//   // remove duplicates
//   return Array.from(new Map(forms.map((f) => [f.id, f])).values()).map((form) => ({
//     value: form.id,
//     label: form.name,
//   }));
// }

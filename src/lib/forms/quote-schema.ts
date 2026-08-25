import { z } from "zod";
import { MATERIALS } from "@/components/material1/materials-data";

export const rfqFormSchema = z
  .object({
    // Material Step
    materialFamily: z.string().min(1, "Material family is required"),
    grade: z.string().min(1, "Grade is required"),
    specification: z.string().optional(),
    form: z.string().min(1, "Form is required"),
    temper: z.string().optional(),
    units: z.enum(["mm", "inch"]).default("mm"),
    length: z.string().optional(),
    width: z.string().optional(),
    thickness: z.string().optional(),
    diameter: z.string().optional(),
    quantity: z.string().min(1, "Quantity is required"),
    tolerance: z.string().optional(),

    // Requirements
    ndtrequirements: z.string().optional(),
    heatTreatment: z.string().optional(),
    packaging: z.string().optional(),
    specialRequirements: z.string().optional(),

    // Logistics
    deliveryDate: z.string().min(1, "Delivery date is required"),
    deliveryLocation: z.string().min(1, "Delivery location is required"),
    shippingPreference: z.string().optional(),

    // Company
    companyName: z.string().min(1, "Company name is required"),
    contactName: z.string().min(1, "Contact name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),

    // Review (cosmetic, generated client-side)
    referenceNumber: z.string().max(40).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const material = MATERIALS.find((m) => m.id === data.materialFamily);

    if (!material) return;

    const validGrades = material.series.flatMap((series) => series.grades);

    // const validForms = [
    //   ...new Set(material.series.flatMap((series) => series.forms.map((form) => form.id))),
    // ];

    const selectedSeries = material.series.find((series) => series.grades.includes(data.grade));
    if (!selectedSeries) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["grade"],
        message: "Invalid grade for selected material.",
      });

      return;
    }

    const validForms = selectedSeries.forms.map((f) => f.id);

    if (!validGrades.includes(data.grade)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["grade"],
        message: "Please select a valid grade.",
      });
    }

    if (!validForms.includes(data.form)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["form"],
        message: "Selected form is not available for this grade.",
      });
    }
  });

export type RFQFormValues = z.infer<typeof rfqFormSchema>;

export const defaultValues: RFQFormValues = {
  materialFamily: "",
  grade: "",
  specification: "",
  form: "",
  temper: "",
  units: "mm",
  length: "",
  width: "",
  thickness: "",
  diameter: "",
  quantity: "",
  tolerance: "",
  ndtrequirements: "",
  heatTreatment: "",
  packaging: "",
  specialRequirements: "",
  deliveryDate: "",
  deliveryLocation: "",
  shippingPreference: "",
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  referenceNumber: "",
};

export const MAX_LENGTHS = {
  materialFamily: 50,
  grade: 100,
  specification: 100,
  form: 50,
  temper: 100,
  length: 20,
  width: 20,
  thickness: 20,
  diameter: 20,
  quantity: 100,
  tolerance: 50,
  ndtrequirements: 200,
  heatTreatment: 200,
  packaging: 200,
  specialRequirements: 500,
  deliveryDate: 20,
  deliveryLocation: 200,
  shippingPreference: 100,
  companyName: 100,
  contactName: 100,
  email: 100,
  phone: 20,
  referenceNumber: 40,
} as const;

export const steps = [
  {
    title: "Material",
    description: "Specify material type and dimensions",
  },
  {
    title: "Requirements",
    description: "Surface finish and special requirements",
  },
  {
    title: "Logistics",
    description: "Delivery timeline and location",
  },
  {
    title: "Company",
    description: "Your contact information",
  },
  {
    title: "Review",
    description: "Confirm & send",
  },
] as const;

// Fields validated before moving on from each step (index-aligned with `steps`)
export const fieldsByStep: Array<Array<keyof RFQFormValues>> = [
  ["materialFamily", "grade", "form", "quantity"],
  ["ndtrequirements", "heatTreatment"],
  ["deliveryDate", "deliveryLocation"],
  ["companyName", "contactName", "email", "phone"],
  [],
];

export const materialFamilies = [
  { value: "aluminium", label: "Aluminium" },
  { value: "titanium", label: "Titanium" },
  { value: "nickel", label: "Nickel Superalloys" },
  { value: "steel", label: "Special Steel" },
  { value: "tungsten", label: "Tungsten" },
  { value: "cas", label: "Critical & Strategic" },
] as const;

export const formTypes = [
  { value: "sheet", label: "Sheet" },
  { value: "plate", label: "Plate" },
  { value: "bar", label: "Bar" },
  { value: "billet", label: "Billet" },
  { value: "forging", label: "Forging" },
  { value: "tube", label: "Tube" },
  { value: "wire", label: "Wire" },
  { value: "extrusion", label: "Extrusion" },
] as const;

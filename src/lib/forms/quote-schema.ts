import { z } from "zod";

export const rfqFormSchema = z.object({
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

  // Requirements Step
  surfaceFinish: z.string().optional(),
  heatTreatment: z.string().optional(),
  certification: z.string().optional(),
  specialRequirements: z.string().optional(),

  // Logistics Step
  deliveryDate: z.string().min(1, "Delivery date is required"),
  deliveryLocation: z.string().min(1, "Delivery location is required"),
  shippingPreference: z.string().optional(),

  // Company Step
  companyName: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
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
  surfaceFinish: "",
  heatTreatment: "",
  certification: "",
  specialRequirements: "",
  deliveryDate: "",
  deliveryLocation: "",
  shippingPreference: "",
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
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
  surfaceFinish: 200,
  heatTreatment: 200,
  certification: 200,
  specialRequirements: 500,
  deliveryDate: 20,
  deliveryLocation: 200,
  shippingPreference: 100,
  companyName: 100,
  contactName: 100,
  email: 100,
  phone: 20,
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
] as const;

// Fields validated before moving on from each step (index-aligned with `steps`)
export const fieldsByStep: Array<Array<keyof RFQFormValues>> = [
  ["materialFamily", "grade", "form", "quantity"],
  ["surfaceFinish", "heatTreatment"],
  ["deliveryDate", "deliveryLocation"],
  ["companyName", "contactName", "email", "phone"],
];

export const materialFamilies = [
  { value: "aluminum", label: "Aluminum" },
  { value: "titanium", label: "Titanium" },
  { value: "nickel-superalloys", label: "Nickel Superalloy" },
  { value: "special-steels", label: "Special Steel" },
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

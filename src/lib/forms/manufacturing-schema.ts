import { z } from "zod";

import { getProcessCategory, getProcessOption } from "@/components/manufacturing/forms/form-data";

export const MAX_LENGTHS = {
  materialGrade: 120,
  quantity: 100,
  envelope: 100,
  description: 1500,
  deliveryLocation: 200,
  companyName: 100,
  contactName: 100,
  designation: 100,
  email: 254,
  phone: 20,
  gstin: 20,
  referenceNumber: 40,
} as const;

const optionalTrimmed = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const manufacturingFormSchema = z
  .object({
    // Step 1: Process
    processCategory: z.string().min(1, "Please select a process category"),
    process: z.string().min(1, "Please select a process"),
    processVariant: z.string().optional().or(z.literal("")),

    // Step 2: Part & material
    materialFamily: z.string().min(1, "Material family is required"),
    materialGrade: optionalTrimmed(MAX_LENGTHS.materialGrade),
    quantityType: z.string().min(1, "Quantity type is required"),
    quantity: optionalTrimmed(MAX_LENGTHS.quantity),
    envelope: optionalTrimmed(MAX_LENGTHS.envelope),
    tolerance: z.string().optional().or(z.literal("")),
    description: z
      .string()
      .trim()
      .min(10, "Please describe the part or job in a bit more detail")
      .max(MAX_LENGTHS.description),

    // Step 3: Certifications & delivery
    certifications: z.array(z.string()).default([]),
    deliveryDate: z.string().optional().or(z.literal("")),
    deliveryLocation: optionalTrimmed(MAX_LENGTHS.deliveryLocation),
    requestNda: z.boolean().default(false),

    // Step 4: Company
    companyName: z.string().trim().min(1, "Company name is required").max(MAX_LENGTHS.companyName),
    customerType: z.string().min(1, "Please select what best describes you"),
    contactName: z.string().trim().min(1, "Contact name is required").max(MAX_LENGTHS.contactName),
    designation: optionalTrimmed(MAX_LENGTHS.designation),
    email: z.string().trim().email("Invalid email address").max(MAX_LENGTHS.email),
    phone: z.string().trim().min(1, "Phone number is required").max(MAX_LENGTHS.phone),
    gstin: optionalTrimmed(MAX_LENGTHS.gstin),

    // Step 5: Review (cosmetic, generated client-side)
    referenceNumber: optionalTrimmed(MAX_LENGTHS.referenceNumber),
  })
  .superRefine((data, ctx) => {
    const category = getProcessCategory(data.processCategory);

    if (!category) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["processCategory"],
        message: "Please select a valid process category.",
      });
      return;
    }

    const process = getProcessOption(data.processCategory, data.process);

    if (!process) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["process"],
        message: "Please select a valid process.",
      });
      return;
    }

    if (process.variants?.length && !data.processVariant) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["processVariant"],
        message: "Please select a variant for this process.",
      });
    }
  });

export type ManufacturingFormValues = z.infer<typeof manufacturingFormSchema>;

export const defaultValues: ManufacturingFormValues = {
  processCategory: "",
  process: "",
  processVariant: "",
  materialFamily: "",
  materialGrade: "",
  quantityType: "",
  quantity: "",
  envelope: "",
  tolerance: "",
  description: "",
  certifications: [],
  deliveryDate: "",
  deliveryLocation: "",
  requestNda: false,
  companyName: "",
  customerType: "",
  contactName: "",
  designation: "",
  email: "",
  phone: "",
  gstin: "",
  referenceNumber: "",
};

export const steps = [
  { title: "Process", description: "Category, process & variant" },
  { title: "Part & Material", description: "Material, quantity & drawing" },
  { title: "Certifications", description: "Quality standards & delivery" },
  { title: "Company", description: "Your contact details" },
  { title: "Review", description: "Confirm & send" },
] as const;

// Fields validated before moving on from each step (index-aligned with `steps`)
export const fieldsByStep: Array<Array<keyof ManufacturingFormValues>> = [
  ["processCategory", "process", "processVariant"],
  ["materialFamily", "quantityType", "description"],
  [],
  ["companyName", "customerType", "contactName", "email", "phone"],
  [],
];

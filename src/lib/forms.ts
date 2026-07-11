import { z } from "zod";

export const MAX_LENGTHS = {
  name: 80,
  company: 120,
  phone: 20,
  message: 1200,
  projectName: 120,
  industry: 80,
  features: 400,
  stack: 120,
  budget: 80,
  timeline: 80,
  email: 254,
};

const baseNameSchema = z
  .string()
  .trim()
  .min(2, "Please enter at least 2 characters")
  .max(MAX_LENGTHS.name);
const optionalTextSchema = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(MAX_LENGTHS.email);
const phoneSchema = z
  .string()
  .trim()
  .max(MAX_LENGTHS.phone)
  .regex(/^[+()\d\s-]*$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));

export const contactFormSchema = z.object({
  name: baseNameSchema,
  email: emailSchema,
  company: optionalTextSchema(MAX_LENGTHS.company),
  phone: phoneSchema,
  message: z.string().trim().min(10, "Please share a bit more detail").max(MAX_LENGTHS.message),
});

export const quoteFormSchema = z.object({
  projectName: baseNameSchema,
  industry: z.string().trim().min(2, "Please enter the industry").max(MAX_LENGTHS.industry),
  features: z.string().trim().min(4, "Please describe the main features").max(MAX_LENGTHS.features),
  stack: z.string().trim().min(2, "Please mention the stack").max(MAX_LENGTHS.stack),
  budget: z.string().trim().min(2, "Please mention the budget range").max(MAX_LENGTHS.budget),
  timeline: z.string().trim().min(2, "Please mention the timeline").max(MAX_LENGTHS.timeline),
  email: emailSchema,
  phone: phoneSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

// Define the form schema
const rfqFormSchema = z.object({
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

type RFQFormValues = z.infer<typeof rfqFormSchema>;

const MAX_LENGTHS = {
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
};

type QuoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const steps = [
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
];

const materialFamilies = [
  { value: "aluminum", label: "Aluminum" },
  { value: "titanium", label: "Titanium" },
  { value: "nickel-superalloys", label: "Nickel Superalloy" },
  { value: "special-steels", label: "Special Steel" },
];

const formTypes = [
  { value: "sheet", label: "Sheet" },
  { value: "plate", label: "Plate" },
  { value: "bar", label: "Bar" },
  { value: "billet", label: "Billet" },
  { value: "forging", label: "Forging" },
  { value: "tube", label: "Tube" },
  { value: "wire", label: "Wire" },
  { value: "extrusion", label: "Extrusion" },
];

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RFQFormValues>({
    resolver: zodResolver(rfqFormSchema),
    mode: "onBlur",
  });

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const emailValue = useWatch({ control, name: "email" });
  const emailReady = Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));

  const resetFormState = () => {
    reset({
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
    });
    setStep(0);
    setSubmitted(false);
    setStatus("idle");
    setMessage("");
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode("");
    setVerificationToken("");
    setOtpError("");
    setResendCountdown(0);
  };

  useEffect(() => {
    if (!open) {
      const timeoutId = window.setTimeout(() => {
        resetFormState();
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [open]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  async function sendOtp() {
    if (!emailReady) {
      setOtpError("Please enter a valid email address.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue }),
      });
      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to send code");
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtpCode("");
      setOtpError("");
      setResendCountdown(60);
      setMessage("Verification code sent to your email.");
      setStatus("idle");
    } catch (error) {
      setOtpSent(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to send code";
      setOtpError(errorMessage);
      console.error("sendOtp error:", errorMessage);
    } finally {
      setOtpLoading(false);
    }
  }

  async function verifyOtp() {
    if (!emailReady || otpCode.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, code: otpCode }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        token?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "The verification code is invalid or expired. Please try again.",
        );
      }

      if (!data.token) {
        throw new Error("No verification token received");
      }

      setOtpVerified(true);
      setVerificationToken(data.token);
      setOtpError("");
      setMessage("Email verified successfully!");
      setStatus("idle");
    } catch (error) {
      setOtpVerified(false);
      const errorMessage = error instanceof Error ? error.message : "Verification failed";
      setOtpError(errorMessage);
      console.error("verifyOtp error:", errorMessage);
    } finally {
      setOtpLoading(false);
    }
  }

  const validateAndAdvance = async () => {
    const fieldsByStep: Array<Array<keyof RFQFormValues>> = [
      ["materialFamily", "grade", "form", "quantity"],
      ["surfaceFinish", "heatTreatment"],
      ["deliveryDate", "deliveryLocation"],
      ["companyName", "contactName", "email", "phone"],
    ];

    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    await handleSubmit(onSubmit)();
  };

  async function onSubmit(values: RFQFormValues) {
    if (!otpVerified || !verificationToken) {
      setStatus("error");
      setMessage("Please verify your email before submitting.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, verificationToken }),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RFQ");
      }

      setStatus("success");
      setMessage("Thanks! We'll reach out to your inbox shortly with a quote.");
      resetFormState();
      setSubmitted(true);
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Failed to submit";
      setMessage(errorMessage);
      console.error("onSubmit error:", errorMessage);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60  backdrop-blur-sm border border-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            resetFormState();
            onOpenChange(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl border border-yellow-500 bg-background p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => {
                resetFormState();
                onOpenChange(false);
              }}
              className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground transition hover:text-foreground"
              aria-label="Close quote form"
            >
              <X size={16} />
            </button>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  RFQ: Material Quote Request
                </p>
                <h2 className="text-2xl font-semibold text-foreground">Get your quote today.</h2>
              </div>
              <div className="w-full sm:w-56">
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {step + 1} of {steps.length}
                </p>
              </div>
            </div>

            {!submitted ? (
              <>
                <div className="mb-6 rounded-2xl border border-border/80 bg-card/70 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{steps[step].title}</h3>
                    <span className="text-sm text-muted-foreground">{steps[step].description}</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Step 0: Material */}
                    {step === 0 && (
                      <>
                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Material Family *
                          </span>
                          <select
                            {...register("materialFamily")}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          >
                            <option value="">Select…</option>
                            {materialFamilies.map((family) => (
                              <option key={family.value} value={family.value}>
                                {family.label}
                              </option>
                            ))}
                          </select>
                          {errors.materialFamily && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.materialFamily.message}
                            </p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Grade *</span>
                          <input
                            {...register("grade")}
                            maxLength={MAX_LENGTHS.grade}
                            placeholder="e.g. Ti-6Al-4V"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.grade && (
                            <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Specification</span>
                          <input
                            {...register("specification")}
                            maxLength={MAX_LENGTHS.specification}
                            placeholder="e.g. AMS 4928"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Form *</span>
                          <select
                            {...register("form")}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          >
                            <option value="">Select…</option>
                            {formTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {errors.form && (
                            <p className="mt-1 text-sm text-red-600">{errors.form.message}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Temper / Condition
                          </span>
                          <input
                            {...register("temper")}
                            maxLength={MAX_LENGTHS.temper}
                            placeholder="e.g. T651, Solution + Aged"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Units *</span>
                          <select
                            {...register("units")}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          >
                            <option value="mm">mm</option>
                            <option value="inch">inch</option>
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Length</span>
                          <input
                            {...register("length")}
                            maxLength={MAX_LENGTHS.length}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Width</span>
                          <input
                            {...register("width")}
                            maxLength={MAX_LENGTHS.width}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Thickness</span>
                          <input
                            {...register("thickness")}
                            maxLength={MAX_LENGTHS.thickness}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Diameter</span>
                          <input
                            {...register("diameter")}
                            maxLength={MAX_LENGTHS.diameter}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">Quantity *</span>
                          <input
                            {...register("quantity")}
                            maxLength={MAX_LENGTHS.quantity}
                            placeholder="e.g. 500 kg / 200 pcs"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.quantity && (
                            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Required Tolerance
                          </span>
                          <input
                            {...register("tolerance")}
                            maxLength={MAX_LENGTHS.tolerance}
                            placeholder="e.g. ±0.2 mm"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>
                      </>
                    )}

                    {/* Step 1: Requirements */}
                    {step === 1 && (
                      <>
                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">
                            Surface Finish
                          </span>
                          <input
                            {...register("surfaceFinish")}
                            maxLength={MAX_LENGTHS.surfaceFinish}
                            placeholder="e.g. Polished, Brushed, As-rolled"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">
                            Heat Treatment
                          </span>
                          <input
                            {...register("heatTreatment")}
                            maxLength={MAX_LENGTHS.heatTreatment}
                            placeholder="e.g. Annealed, Aged, Solution treated"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">Certification</span>
                          <input
                            {...register("certification")}
                            maxLength={MAX_LENGTHS.certification}
                            placeholder="e.g. DIN 17200, ASTM E10, MIL Spec"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>

                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">
                            Special Requirements
                          </span>
                          <textarea
                            {...register("specialRequirements")}
                            maxLength={MAX_LENGTHS.specialRequirements}
                            placeholder="Any additional specifications or requirements"
                            rows={4}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>
                      </>
                    )}

                    {/* Step 2: Logistics */}
                    {step === 2 && (
                      <>
                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Delivery Date *
                          </span>
                          <input
                            {...register("deliveryDate")}
                            type="date"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.deliveryDate && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.deliveryDate.message}
                            </p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Delivery Location *
                          </span>
                          <input
                            {...register("deliveryLocation")}
                            maxLength={MAX_LENGTHS.deliveryLocation}
                            placeholder="City, Country or complete address"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.deliveryLocation && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.deliveryLocation.message}
                            </p>
                          )}
                        </label>

                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">
                            Shipping Preference
                          </span>
                          <input
                            {...register("shippingPreference")}
                            maxLength={MAX_LENGTHS.shippingPreference}
                            placeholder="e.g. Air freight, Sea freight, Courier"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                        </label>
                      </>
                    )}

                    {/* Step 3: Company */}
                    {step === 3 && (
                      <>
                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Company Name *
                          </span>
                          <input
                            {...register("companyName")}
                            maxLength={MAX_LENGTHS.companyName}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.companyName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.companyName.message}
                            </p>
                          )}
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Contact Name *
                          </span>
                          <input
                            {...register("contactName")}
                            maxLength={MAX_LENGTHS.contactName}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.contactName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.contactName.message}
                            </p>
                          )}
                        </label>

                        <label className="block md:col-span-2">
                          <span className="text-sm font-medium text-foreground">Email *</span>
                          <input
                            {...register("email")}
                            maxLength={MAX_LENGTHS.email}
                            type="email"
                            inputMode="email"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                          <div className="mt-3 rounded-lg border border-border/70 bg-muted/40 p-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => void sendOtp()}
                                disabled={
                                  otpLoading || !emailReady || otpVerified || resendCountdown > 0
                                }
                              >
                                {otpLoading
                                  ? "Sending..."
                                  : otpVerified
                                    ? "✓ Verified"
                                    : resendCountdown > 0
                                      ? `Resend in ${resendCountdown}s`
                                      : otpSent
                                        ? "Resend code"
                                        : "Send code"}
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                Verify your email before sending the RFQ.
                              </p>
                            </div>
                            {(otpSent || otpVerified) && (
                              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                                <input
                                  value={otpCode}
                                  onChange={(event) =>
                                    setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                                  }
                                  maxLength={6}
                                  inputMode="numeric"
                                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                  placeholder="Enter 6-digit code"
                                  disabled={otpVerified || otpLoading}
                                />
                                <Button
                                  type="button"
                                  onClick={() => void verifyOtp()}
                                  disabled={otpLoading || otpVerified || otpCode.length !== 6}
                                >
                                  {otpLoading
                                    ? "Checking..."
                                    : otpVerified
                                      ? "✓ Verified"
                                      : "Verify"}
                                </Button>
                              </div>
                            )}
                            {otpError && <p className="mt-2 text-sm text-red-600">{otpError}</p>}
                            {otpVerified && (
                              <p className="mt-2 text-sm text-green-600">
                                ✓ Email verified successfully
                              </p>
                            )}
                          </div>
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-foreground">
                            Phone / Contact *
                          </span>
                          <input
                            {...register("phone")}
                            maxLength={MAX_LENGTHS.phone}
                            inputMode="tel"
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {steps.map((item, index) => (
                      <span key={item.title} className="flex items-center gap-2">
                        {index <= step ? (
                          <CheckCircle2 size={16} className="text-primary" />
                        ) : (
                          <Circle size={16} />
                        )}
                        {index < steps.length - 1 && <span className="hidden sm:inline">•</span>}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep((current) => Math.max(0, current - 1))}
                      disabled={step === 0}
                    >
                      Back
                    </Button>
                    <Button onClick={() => void validateAndAdvance()} disabled={isSubmitting}>
                      {step === steps.length - 1 ? "Submit RFQ" : "Next"}
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>

                {message ? (
                  <div
                    className={`mt-4 rounded-lg border px-3 py-3 text-sm ${
                      status === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {message}
                  </div>
                ) : null}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-green-200 bg-green-50 p-6 text-center"
              >
                <CheckCircle2 size={32} className="mx-auto mb-3 text-green-600" />
                <h3 className="text-xl font-semibold text-foreground">
                  RFQ Submitted Successfully!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for your request. Our team will review your material specifications and
                  send you a detailed quote within 48 hours.
                </p>
                <Button className="mt-6" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, CheckCircle2, Circle, X } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useForm, useWatch } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import { MAX_LENGTHS, quoteFormSchema, type QuoteFormValues } from "@/lib/forms";

// type QuoteModalProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// const steps = [
//   {
//     title: "Material",
//     description: "Provide the material specification",
//   },
//   {
//     title: "Technical Requirements",
//     description: "Share your preferred stack and outcomes.",
//   },
//   {
//     title: "Budget & Timeline",
//     description: "Define your budget and target launch date.",
//   },
//   {
//     title: "Contact Info",
//     description: "We'll follow up with a tailored proposal.",
//   },
// ];

// export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
//   const [step, setStep] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
//   const [message, setMessage] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otpCode, setOtpCode] = useState("");
//   const [verificationToken, setVerificationToken] = useState("");
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [resendCountdown, setResendCountdown] = useState(0);

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     control,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<QuoteFormValues>({
//     resolver: zodResolver(quoteFormSchema),
//     mode: "onBlur",
//   });

//   const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
//   const emailValue = useWatch({ control, name: "email" });
//   const emailReady = Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));

//   const resetFormState = () => {
//     reset({
//       projectName: "",
//       industry: "",
//       features: "",
//       stack: "",
//       budget: "",
//       timeline: "",
//       email: "",
//       phone: "",
//     });
//     setStep(0);
//     setSubmitted(false);
//     setStatus("idle");
//     setMessage("");
//     setOtpSent(false);
//     setOtpVerified(false);
//     setOtpCode("");
//     setVerificationToken("");
//     setOtpError("");
//     setResendCountdown(0);
//   };

//   useEffect(() => {
//     if (!open) {
//       const timeoutId = window.setTimeout(() => {
//         resetFormState();
//       }, 0);

//       return () => window.clearTimeout(timeoutId);
//     }
//   }, [open]);

//   // Handle resend countdown timer
//   useEffect(() => {
//     if (resendCountdown <= 0) return;
//     const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
//     return () => clearTimeout(timer);
//   }, [resendCountdown]);

//   async function sendOtp() {
//     if (!emailReady) {
//       setOtpError("Please enter a valid email address.");
//       return;
//     }

//     setOtpLoading(true);
//     setOtpError("");

//     try {
//       const response = await fetch("/api/otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailValue }),
//       });
//       const data = (await response.json()) as { error?: string; success?: boolean };

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to send code");
//       }

//       setOtpSent(true);
//       setOtpVerified(false);
//       setOtpCode("");
//       setOtpError("");
//       setResendCountdown(60);
//       setMessage("Verification code sent to your email.");
//       setStatus("idle");
//     } catch (error) {
//       setOtpSent(false);
//       const errorMessage = error instanceof Error ? error.message : "Failed to send code";
//       setOtpError(errorMessage);
//       console.error("sendOtp error:", errorMessage);
//     } finally {
//       setOtpLoading(false);
//     }
//   }

//   async function verifyOtp() {
//     if (!emailReady || otpCode.length !== 6) {
//       setOtpError("Please enter the 6-digit code.");
//       return;
//     }

//     setOtpLoading(true);
//     setOtpError("");

//     try {
//       const response = await fetch("/api/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: emailValue, code: otpCode }),
//       });
//       const data = (await response.json()) as {
//         success?: boolean;
//         token?: string;
//         error?: string;
//       };

//       if (!response.ok || !data.success) {
//         throw new Error(
//           data.error || "The verification code is invalid or expired. Please try again.",
//         );
//       }

//       if (!data.token) {
//         throw new Error("No verification token received");
//       }

//       setOtpVerified(true);
//       setVerificationToken(data.token);
//       setOtpError("");
//       setMessage("Email verified successfully!");
//       setStatus("idle");
//     } catch (error) {
//       setOtpVerified(false);
//       const errorMessage = error instanceof Error ? error.message : "Verification failed";
//       setOtpError(errorMessage);
//       console.error("verifyOtp error:", errorMessage);
//     } finally {
//       setOtpLoading(false);
//     }
//   }

//   const validateAndAdvance = async () => {
//     const fieldsByStep: Array<Array<keyof QuoteFormValues>> = [
//       ["projectName", "industry"],
//       ["features", "stack"],
//       ["budget", "timeline"],
//       ["email", "phone"],
//     ];

//     const valid = await trigger(fieldsByStep[step]);
//     if (!valid) return;

//     if (step < steps.length - 1) {
//       setStep((current) => current + 1);
//       return;
//     }

//     await handleSubmit(onSubmit)();
//   };

//   async function onSubmit(values: QuoteFormValues) {
//     if (!otpVerified || !verificationToken) {
//       setStatus("error");
//       setMessage("Please verify your email before submitting.");
//       return;
//     }

//     setStatus("loading");
//     setMessage("");

//     try {
//       const response = await fetch("/api/quote", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...values, verificationToken }),
//       });

//       const data = (await response.json()) as { error?: string; success?: boolean };

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to submit quote");
//       }

//       setStatus("success");
//       setMessage("Thanks! We'll reach out to your inbox shortly.");
//       resetFormState();
//       setSubmitted(true);
//     } catch (error) {
//       setStatus("error");
//       const errorMessage = error instanceof Error ? error.message : "Failed to submit";
//       setMessage(errorMessage);
//       console.error("onSubmit error:", errorMessage);
//     }
//   }

//   return (
//     <AnimatePresence>
//       {open ? (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => {
//             resetFormState();
//             onOpenChange(false);
//           }}
//         >
//           <motion.div
//             initial={{ opacity: 0, y: 24, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 16, scale: 0.98 }}
//             transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
//             onClick={(event) => event.stopPropagation()}
//             className="relative w-full max-w-3xl rounded-3xl border border-border/70 bg-background p-6 shadow-2xl sm:p-8"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 resetFormState();
//                 onOpenChange(false);
//               }}
//               className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground transition hover:text-foreground"
//               aria-label="Close quote form"
//             >
//               <X size={16} />
//             </button>

//             <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
//                   RFQ: Request a Quote
//                 </p>
//                 <h2 className="text-2xl font-semibold text-foreground">48-hour response.</h2>
//               </div>
//               <div className="w-full sm:w-56">
//                 <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
//                   <motion.div
//                     className="h-full rounded-full bg-primary"
//                     animate={{ width: `${progress}%` }}
//                     transition={{ duration: 0.25 }}
//                   />
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Step {step + 1} of {steps.length}
//                 </p>
//               </div>
//             </div>

//             {!submitted ? (
//               <>
//                 <div className="mb-6 rounded-2xl border border-border/80 bg-card/70 p-4">
//                   <div className="mb-2 flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-foreground">{steps[step].title}</h3>
//                     <span className="text-sm text-muted-foreground">{steps[step].description}</span>
//                   </div>
//                   <div className="grid gap-3 md:grid-cols-2">
//                     {step === 0 && (
//                       <>
//                         <label className="text-sm font-medium text-foreground">
//                           Project name
//                           <input
//                             {...register("projectName")}
//                             maxLength={MAX_LENGTHS.projectName}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.projectName ? (
//                             <p className="mt-1 text-sm text-destructive">
//                               {errors.projectName.message}
//                             </p>
//                           ) : null}
//                         </label>
//                         <label className="text-sm font-medium text-foreground">
//                           Industry
//                           <input
//                             {...register("industry")}
//                             maxLength={MAX_LENGTHS.industry}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.industry ? (
//                             <p className="mt-1 text-sm text-destructive">
//                               {errors.industry.message}
//                             </p>
//                           ) : null}
//                         </label>
//                       </>
//                     )}
//                     {step === 1 && (
//                       <>
//                         <label className="text-sm font-medium text-foreground">
//                           Required features
//                           <input
//                             {...register("features")}
//                             maxLength={MAX_LENGTHS.features}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.features ? (
//                             <p className="mt-1 text-sm text-destructive">
//                               {errors.features.message}
//                             </p>
//                           ) : null}
//                         </label>
//                         <label className="text-sm font-medium text-foreground">
//                           Preferred stack
//                           <input
//                             {...register("stack")}
//                             maxLength={MAX_LENGTHS.stack}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.stack ? (
//                             <p className="mt-1 text-sm text-destructive">{errors.stack.message}</p>
//                           ) : null}
//                         </label>
//                       </>
//                     )}
//                     {step === 2 && (
//                       <>
//                         <label className="text-sm font-medium text-foreground">
//                           Budget range
//                           <input
//                             {...register("budget")}
//                             maxLength={MAX_LENGTHS.budget}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.budget ? (
//                             <p className="mt-1 text-sm text-destructive">{errors.budget.message}</p>
//                           ) : null}
//                         </label>
//                         <label className="text-sm font-medium text-foreground">
//                           Timeline
//                           <input
//                             {...register("timeline")}
//                             maxLength={MAX_LENGTHS.timeline}
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.timeline ? (
//                             <p className="mt-1 text-sm text-destructive">
//                               {errors.timeline.message}
//                             </p>
//                           ) : null}
//                         </label>
//                       </>
//                     )}
//                     {step === 3 && (
//                       <>
//                         <label className="text-sm font-medium text-foreground">
//                           Your email
//                           <input
//                             {...register("email")}
//                             maxLength={MAX_LENGTHS.email}
//                             type="email"
//                             inputMode="email"
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.email ? (
//                             <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
//                           ) : null}
//                           <div className="mt-3 rounded-2xl border border-border/70 bg-muted/40 p-3">
//                             <div className="flex flex-wrap items-center gap-2">
//                               <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={() => void sendOtp()}
//                                 disabled={
//                                   otpLoading || !emailReady || otpVerified || resendCountdown > 0
//                                 }
//                               >
//                                 {otpLoading
//                                   ? "Sending..."
//                                   : otpVerified
//                                     ? "✓ Verified"
//                                     : resendCountdown > 0
//                                       ? `Resend in ${resendCountdown}s`
//                                       : otpSent
//                                         ? "Resend code"
//                                         : "Send code"}
//                               </Button>
//                               <p className="text-xs text-muted-foreground">
//                                 Verify your email before sending the quote request.
//                               </p>
//                             </div>
//                             {(otpSent || otpVerified) && (
//                               <div className="mt-3 flex flex-col gap-2 sm:flex-row">
//                                 <input
//                                   value={otpCode}
//                                   onChange={(event) =>
//                                     setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
//                                   }
//                                   maxLength={6}
//                                   inputMode="numeric"
//                                   className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
//                                   placeholder="Enter 6-digit code"
//                                   disabled={otpVerified || otpLoading}
//                                 />
//                                 <Button
//                                   type="button"
//                                   onClick={() => void verifyOtp()}
//                                   disabled={otpLoading || otpVerified || otpCode.length !== 6}
//                                 >
//                                   {otpLoading
//                                     ? "Checking..."
//                                     : otpVerified
//                                       ? "✓ Verified"
//                                       : "Verify"}
//                                 </Button>
//                               </div>
//                             )}
//                             {otpError ? (
//                               <p className="mt-2 text-sm text-destructive">{otpError}</p>
//                             ) : null}
//                             {otpVerified ? (
//                               <p className="mt-2 text-sm text-green-600">
//                                 ✓ Email verified successfully
//                               </p>
//                             ) : null}
//                           </div>
//                         </label>
//                         <label className="text-sm font-medium text-foreground">
//                           Phone / contact
//                           <input
//                             {...register("phone")}
//                             maxLength={MAX_LENGTHS.phone}
//                             inputMode="tel"
//                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                           />
//                           {errors.phone ? (
//                             <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
//                           ) : null}
//                         </label>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     {steps.map((item, index) => (
//                       <span key={item.title} className="flex items-center gap-2">
//                         {index <= step ? (
//                           <CheckCircle2 size={16} className="text-primary" />
//                         ) : (
//                           <Circle size={16} />
//                         )}
//                         {index < steps.length - 1 && <span className="hidden sm:inline">•</span>}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       onClick={() => setStep((current) => Math.max(0, current - 1))}
//                       disabled={step === 0}
//                     >
//                       Back
//                     </Button>
//                     <Button onClick={() => void validateAndAdvance()} disabled={isSubmitting}>
//                       {step === steps.length - 1 ? "Submit" : "Next"}
//                       <ArrowRight size={16} />
//                     </Button>
//                   </div>
//                 </div>

//                 {message ? (
//                   <div
//                     className={`mt-4 rounded-xl border px-3 py-3 text-sm ${
//                       status === "success"
//                         ? "border-green-200 bg-green-50 text-green-700"
//                         : "border-red-200 bg-red-50 text-red-700"
//                     }`}
//                   >
//                     {message}
//                   </div>
//                 ) : null}
//               </>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
//               >
//                 <CheckCircle2 size={28} className="mx-auto mb-3 text-green-600" />
//                 <h3 className="text-xl font-semibold text-foreground">
//                   Thanks! We&apos;ll follow up shortly.
//                 </h3>
//                 <p className="mt-2 text-sm text-muted-foreground">
//                   Your request has been captured and our team will reach out with a tailored plan.
//                 </p>
//                 <Button className="mt-6" onClick={() => onOpenChange(false)}>
//                   Close
//                 </Button>
//               </motion.div>
//             )}
//           </motion.div>
//         </motion.div>
//       ) : null}
//     </AnimatePresence>
//   );
// }

// // "use client";

// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { AnimatePresence, motion } from "framer-motion";
// // import { ArrowRight, CheckCircle2, Circle, X } from "lucide-react";
// // import { useEffect, useMemo, useState } from "react";
// // import { useForm, useWatch } from "react-hook-form";

// // import { Button } from "@/components/ui/button";
// // import { MAX_LENGTHS, quoteFormSchema, type QuoteFormValues } from "@/lib/forms";

// // type QuoteModalProps = {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// // };

// // const steps = [
// //   {
// //     title: "Project Details",
// //     description: "Tell us about the scope and timeline.",
// //   },
// //   {
// //     title: "Technical Requirements",
// //     description: "Share your preferred stack and outcomes.",
// //   },
// //   {
// //     title: "Budget & Timeline",
// //     description: "Define your budget and target launch date.",
// //   },
// //   {
// //     title: "Contact Info",
// //     description: "We’ll follow up with a tailored proposal.",
// //   },
// // ];

// // export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
// //   const [step, setStep] = useState(0);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
// //   const [message, setMessage] = useState("");
// //   const [otpSent, setOtpSent] = useState(false);
// //   const [otpVerified, setOtpVerified] = useState(false);
// //   const [otpCode, setOtpCode] = useState("");
// //   const [verificationToken, setVerificationToken] = useState("");
// //   const [otpLoading, setOtpLoading] = useState(false);
// //   const [otpError, setOtpError] = useState("");

// //   const {
// //     register,
// //     handleSubmit,
// //     trigger,
// //     control,
// //     formState: { errors, isSubmitting },
// //     reset,
// //   } = useForm<QuoteFormValues>({
// //     resolver: zodResolver(quoteFormSchema),
// //     mode: "onBlur",
// //   });

// //   const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
// //   const emailValue = useWatch({ control, name: "email" });
// //   const emailReady = Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));

// //   const resetFormState = () => {
// //     reset({
// //       projectName: "",
// //       industry: "",
// //       features: "",
// //       stack: "",
// //       budget: "",
// //       timeline: "",
// //       email: "",
// //       phone: "",
// //     });
// //     setStep(0);
// //     setSubmitted(false);
// //     setStatus("idle");
// //     setMessage("");
// //     setOtpSent(false);
// //     setOtpVerified(false);
// //     setOtpCode("");
// //     setVerificationToken("");
// //     setOtpError("");
// //   };

// //   useEffect(() => {
// //     if (!open) {
// //       resetFormState();
// //     }
// //   }, [open]);

// //   async function sendOtp() {
// //     if (!emailReady) {
// //       setOtpError("Enter a valid email first.");
// //       return;
// //     }

// //     setOtpLoading(true);
// //     setOtpError("");

// //     try {
// //       const response = await fetch("/api/otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: emailValue }),
// //       });
// //       const data = await response.json();
// //       if (!response.ok) {
// //         throw new Error(data.error || "Unable to send code");
// //       }
// //       setOtpSent(true);
// //       setOtpVerified(false);
// //       setMessage("A verification code has been sent to your inbox.");
// //       setStatus("idle");
// //     } catch (error) {
// //       setOtpSent(false);
// //       setOtpError(error instanceof Error ? error.message : "Unable to send code");
// //     } finally {
// //       setOtpLoading(false);
// //     }
// //   }

// //   async function verifyOtp() {
// //     if (!emailReady || otpCode.length !== 6) {
// //       setOtpError("Enter the 6-digit code we sent.");
// //       return;
// //     }

// //     setOtpLoading(true);
// //     setOtpError("");

// //     try {
// //       const response = await fetch("/api/verify-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: emailValue, code: otpCode }),
// //       });
// //       const data = await response.json();
// //       if (!response.ok || !data.success) {
// //         throw new Error(data.error || "The verification code is invalid or expired.");
// //       }
// //       setOtpVerified(true);
// //       setVerificationToken(data.token || "");
// //       setMessage("Email verified. You can submit your request.");
// //       setStatus("idle");
// //     } catch (error) {
// //       setOtpVerified(false);
// //       setOtpError(error instanceof Error ? error.message : "Verification failed");
// //     } finally {
// //       setOtpLoading(false);
// //     }
// //   }

// //   const validateAndAdvance = async () => {
// //     const fieldsByStep: Array<Array<keyof QuoteFormValues>> = [
// //       ["projectName", "industry"],
// //       ["features", "stack"],
// //       ["budget", "timeline"],
// //       ["email", "phone"],
// //     ];

// //     const valid = await trigger(fieldsByStep[step]);
// //     if (!valid) return;

// //     if (step < steps.length - 1) {
// //       setStep((current) => current + 1);
// //       return;
// //     }

// //     await handleSubmit(onSubmit)();
// //   };

// //   async function onSubmit(values: QuoteFormValues) {
// //     if (!otpVerified || !verificationToken) {
// //       setStatus("error");
// //       setMessage("Please verify your email first.");
// //       return;
// //     }

// //     setStatus("loading");
// //     setMessage("");

// //     try {
// //       const response = await fetch("/api/quote", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ ...values, verificationToken }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.error || "Submission failed");
// //       }

// //       setStatus("success");
// //       setMessage("Thanks! We’ll reach out to your inbox shortly.");
// //       resetFormState();
// //       setSubmitted(true);
// //     } catch {
// //       setStatus("error");
// //       setMessage("We could not submit your quote request. Please try again shortly.");
// //     }
// //   }

// //   return (
// //     <AnimatePresence>
// //       {open ? (
// //         <motion.div
// //           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           onClick={() => {
// //             resetFormState();
// //             onOpenChange(false);
// //           }}
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, y: 24, scale: 0.98 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 16, scale: 0.98 }}
// //             transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
// //             onClick={(event) => event.stopPropagation()}
// //             className="relative w-full max-w-3xl rounded-3xl border border-border/70 bg-background p-6 shadow-2xl sm:p-8"
// //           >
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 resetFormState();
// //                 onOpenChange(false);
// //               }}
// //               className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground transition hover:text-foreground"
// //               aria-label="Close quote form"
// //             >
// //               <X size={16} />
// //             </button>

// //             <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //               <div>
// //                 <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
// //                   Request a Quote
// //                 </p>
// //                 <h2 className="text-2xl font-semibold text-foreground">
// //                   Let’s shape your next build.
// //                 </h2>
// //               </div>
// //               <div className="w-full sm:w-56">
// //                 <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
// //                   <motion.div
// //                     className="h-full rounded-full bg-primary"
// //                     animate={{ width: `${progress}%` }}
// //                     transition={{ duration: 0.25 }}
// //                   />
// //                 </div>
// //                 <p className="text-sm text-muted-foreground">
// //                   Step {step + 1} of {steps.length}
// //                 </p>
// //               </div>
// //             </div>

// //             {!submitted ? (
// //               <>
// //                 <div className="mb-6 rounded-2xl border border-border/80 bg-card/70 p-4">
// //                   <div className="mb-2 flex items-center justify-between">
// //                     <h3 className="text-lg font-semibold text-foreground">{steps[step].title}</h3>
// //                     <span className="text-sm text-muted-foreground">{steps[step].description}</span>
// //                   </div>
// //                   <div className="grid gap-3 md:grid-cols-2">
// //                     {step === 0 && (
// //                       <>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Project name
// //                           <input
// //                             {...register("projectName")}
// //                             maxLength={MAX_LENGTHS.projectName}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.projectName ? (
// //                             <p className="mt-1 text-sm text-destructive">
// //                               {errors.projectName.message}
// //                             </p>
// //                           ) : null}
// //                         </label>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Industry
// //                           <input
// //                             {...register("industry")}
// //                             maxLength={MAX_LENGTHS.industry}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.industry ? (
// //                             <p className="mt-1 text-sm text-destructive">
// //                               {errors.industry.message}
// //                             </p>
// //                           ) : null}
// //                         </label>
// //                       </>
// //                     )}
// //                     {step === 1 && (
// //                       <>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Required features
// //                           <input
// //                             {...register("features")}
// //                             maxLength={MAX_LENGTHS.features}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.features ? (
// //                             <p className="mt-1 text-sm text-destructive">
// //                               {errors.features.message}
// //                             </p>
// //                           ) : null}
// //                         </label>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Preferred stack
// //                           <input
// //                             {...register("stack")}
// //                             maxLength={MAX_LENGTHS.stack}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.stack ? (
// //                             <p className="mt-1 text-sm text-destructive">{errors.stack.message}</p>
// //                           ) : null}
// //                         </label>
// //                       </>
// //                     )}
// //                     {step === 2 && (
// //                       <>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Budget range
// //                           <input
// //                             {...register("budget")}
// //                             maxLength={MAX_LENGTHS.budget}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.budget ? (
// //                             <p className="mt-1 text-sm text-destructive">{errors.budget.message}</p>
// //                           ) : null}
// //                         </label>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Timeline
// //                           <input
// //                             {...register("timeline")}
// //                             maxLength={MAX_LENGTHS.timeline}
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.timeline ? (
// //                             <p className="mt-1 text-sm text-destructive">
// //                               {errors.timeline.message}
// //                             </p>
// //                           ) : null}
// //                         </label>
// //                       </>
// //                     )}
// //                     {step === 3 && (
// //                       <>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Your email
// //                           <input
// //                             {...register("email")}
// //                             maxLength={MAX_LENGTHS.email}
// //                             type="email"
// //                             inputMode="email"
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.email ? (
// //                             <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
// //                           ) : null}
// //                           <div className="mt-3 rounded-2xl border border-border/70 bg-muted/40 p-3">
// //                             <div className="flex flex-wrap items-center gap-2">
// //                               <Button
// //                                 type="button"
// //                                 variant="outline"
// //                                 onClick={() => void sendOtp()}
// //                                 disabled={otpLoading || !emailReady || otpVerified}
// //                               >
// //                                 {otpLoading
// //                                   ? "Sending..."
// //                                   : otpVerified
// //                                     ? "Verified"
// //                                     : otpSent
// //                                       ? "Resend code"
// //                                       : "Send code"}
// //                               </Button>
// //                               <p className="text-xs text-muted-foreground">
// //                                 Verify your email before sending the quote request.
// //                               </p>
// //                             </div>
// //                             {(otpSent || otpVerified) && (
// //                               <div className="mt-3 flex flex-col gap-2 sm:flex-row">
// //                                 <input
// //                                   value={otpCode}
// //                                   onChange={(event) =>
// //                                     setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
// //                                   }
// //                                   maxLength={6}
// //                                   inputMode="numeric"
// //                                   className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
// //                                   placeholder="Enter 6-digit code"
// //                                 />
// //                                 <Button
// //                                   type="button"
// //                                   onClick={() => void verifyOtp()}
// //                                   disabled={otpLoading || otpVerified}
// //                                 >
// //                                   {otpLoading ? "Checking..." : otpVerified ? "Verified" : "Verify"}
// //                                 </Button>
// //                               </div>
// //                             )}
// //                             {otpError ? (
// //                               <p className="mt-2 text-sm text-destructive">{otpError}</p>
// //                             ) : null}
// //                             {otpVerified ? (
// //                               <p className="mt-2 text-sm text-primary">
// //                                 Email verified. You can submit now.
// //                               </p>
// //                             ) : null}
// //                           </div>
// //                         </label>
// //                         <label className="text-sm font-medium text-foreground">
// //                           Phone / contact
// //                           <input
// //                             {...register("phone")}
// //                             maxLength={MAX_LENGTHS.phone}
// //                             inputMode="tel"
// //                             className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
// //                           />
// //                           {errors.phone ? (
// //                             <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
// //                           ) : null}
// //                         </label>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-wrap items-center justify-between gap-3">
// //                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                     {steps.map((item, index) => (
// //                       <span key={item.title} className="flex items-center gap-2">
// //                         {index <= step ? (
// //                           <CheckCircle2 size={16} className="text-primary" />
// //                         ) : (
// //                           <Circle size={16} />
// //                         )}
// //                         {index < steps.length - 1 && <span className="hidden sm:inline">•</span>}
// //                       </span>
// //                     ))}
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <Button
// //                       variant="outline"
// //                       onClick={() => setStep((current) => Math.max(0, current - 1))}
// //                       disabled={step === 0}
// //                     >
// //                       Back
// //                     </Button>
// //                     <Button onClick={() => void validateAndAdvance()} disabled={isSubmitting}>
// //                       {step === steps.length - 1 ? "Submit" : "Next"}
// //                       <ArrowRight size={16} />
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 {message ? (
// //                   <div
// //                     className={`mt-4 rounded-xl border px-3 py-3 text-sm ${status === "success" ? "border-primary/20 bg-primary/10 text-primary" : "border-destructive/20 bg-destructive/10 text-destructive"}`}
// //                   >
// //                     {message}
// //                   </div>
// //                 ) : null}
// //               </>
// //             ) : (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 10 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center"
// //               >
// //                 <CheckCircle2 size={28} className="mx-auto mb-3 text-primary" />
// //                 <h3 className="text-xl font-semibold text-foreground">
// //                   Thanks! We’ll follow up shortly.
// //                 </h3>
// //                 <p className="mt-2 text-sm text-muted-foreground">
// //                   Your request has been captured and our team will reach out with a tailored plan.
// //                 </p>
// //                 <Button className="mt-6" onClick={() => onOpenChange(false)}>
// //                   Close
// //                 </Button>
// //               </motion.div>
// //             )}
// //           </motion.div>
// //         </motion.div>
// //       ) : null}
// //     </AnimatePresence>
// //   );
// // }

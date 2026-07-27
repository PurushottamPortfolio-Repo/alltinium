"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useOtpVerification } from "@/hooks/use-otp-verification";
import {
  defaultValues,
  fieldsByStep,
  rfqFormSchema,
  steps,
  type RFQFormValues,
} from "@/lib/forms/quote-schema";

import { QuoteProgress } from "./quote-progress";
import { QuoteStepCompany } from "./quote-step-company";
import { QuoteStepLogistics } from "./quote-step-logistics";
import { QuoteStepMaterial } from "./quote-step-material";
import { QuoteStepRequirements } from "./quote-step-requirements";

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    defaultValues,
  });

  const emailValue = useWatch({ control, name: "email" });
  const emailReady = Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));

  const otp = useOtpVerification(emailReady, emailValue);

  const resetAll = () => {
    reset(defaultValues);
    setStep(0);
    setSubmitted(false);
    setStatus("idle");
    setMessage("");
    otp.resetOtp();
  };

  const validateAndAdvance = async () => {
    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    await handleSubmit(onSubmit)();
  };

  async function onSubmit(values: RFQFormValues) {
    if (!otp.otpVerified || !otp.verificationToken) {
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
        body: JSON.stringify({ ...values, verificationToken: otp.verificationToken }),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RFQ");
      }

      setStatus("success");
      setMessage("Thanks! We'll reach out to your inbox shortly with a quote.");
      resetAll();
      setSubmitted(true);
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Failed to submit";
      setMessage(errorMessage);
      console.error("onSubmit error:", errorMessage);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center sm:p-10"
      >
        <CheckCircle2 size={32} className="mx-auto mb-3 text-green-600" />
        <h2 className="text-xl font-semibold text-foreground">RFQ Submitted Successfully!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your request. Our team will review your material specifications and send you
          a detailed quote within 48 hours.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <QuoteProgress step={step} />

      <div className="mb-6 rounded-2xl border border-border/80 bg-card/70 p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{steps[step].title}</h2>
          <span className="text-sm text-muted-foreground">{steps[step].description}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && <QuoteStepMaterial register={register} errors={errors} />}
            {step === 1 && <QuoteStepRequirements register={register} errors={errors} />}
            {step === 2 && <QuoteStepLogistics register={register} errors={errors} />}
            {step === 3 && (
              <QuoteStepCompany
                register={register}
                errors={errors}
                emailReady={emailReady}
                otp={otp}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
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
    </div>
  );
}

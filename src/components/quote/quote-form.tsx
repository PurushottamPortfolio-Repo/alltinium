"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { OTPModal } from "@/components/auth";
import { SubmissionDialog } from "@/components/common/submission-dialog";
import { useEmailVerification } from "@/hooks/use-email-verification";
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
  const [resultDialog, setResultDialog] = useState<{
    open: boolean;
    status: "success" | "error";
    message: string;
  }>({ open: false, status: "success", message: "" });

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");

  const {
    verified,
    verifiedEmail,
    setEmail,
    error,
    loading,
    sending,
    verifying,
    retryAfter,
    remainingAttempts,
    sendCode,
    verifyCode,
    reset: resetVerification,
  } = useEmailVerification();

  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    setEmail(emailValue ?? "");
  }, [emailValue, setEmail]);

  const isEmailVerified =
    verified && verifiedEmail.trim().toLowerCase() === (emailValue ?? "").trim().toLowerCase();

  const resetAll = () => {
    reset(defaultValues);
    setStep(0);
    setOtp("");
    setSuccess("");
    setVerifyModalOpen(false);
    resetVerification();
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
    if (!isEmailVerified) {
      setResultDialog({
        open: true,
        status: "error",
        message: "Please verify your email before submitting.",
      });
      return;
    }

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RFQ");
      }

      resetAll();
      setResultDialog({
        open: true,
        status: "success",
        message:
          "Thank you for your request. Our team will review your material specifications and send you a detailed quote within 48 hours.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit";
      setResultDialog({ open: true, status: "error", message: errorMessage });
    }
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
            {step === 0 && (
              <QuoteStepMaterial
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
            )}
            {step === 1 && <QuoteStepRequirements register={register} errors={errors} />}
            {step === 2 && (
              <QuoteStepLogistics register={register} errors={errors} control={control} />
            )}
            {step === 3 && (
              <QuoteStepCompany
                register={register}
                errors={errors}
                emailReady={emailReady}
                isEmailVerified={isEmailVerified}
                onRequestVerify={async () => {
                  setVerifyModalOpen(true);

                  const ok = await sendCode();

                  if (ok) {
                    setSuccess("Verification code sent.");
                  }
                }}
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

      <OTPModal
        open={verifyModalOpen}
        email={emailValue ?? ""}
        otp={otp}
        verified={isEmailVerified}
        loading={loading}
        sending={sending}
        verifying={verifying}
        retryAfter={retryAfter}
        remainingAttempts={remainingAttempts}
        error={error}
        success={success}
        onOTPChange={setOtp}
        onClose={() => {
          setVerifyModalOpen(false);
          setOtp("");
          setSuccess("");
        }}
        onResend={async () => {
          const ok = await sendCode();

          if (ok) {
            setSuccess("Verification code sent.");
          }
        }}
        onVerify={async () => {
          const ok = await verifyCode(otp);

          if (ok) {
            setSuccess("Email verified successfully.");

            setTimeout(() => {
              setVerifyModalOpen(false);
              setOtp("");
              setSuccess("");
            }, 700);
          }
        }}
      />

      <SubmissionDialog
        open={resultDialog.open}
        status={resultDialog.status}
        title={resultDialog.status === "success" ? "RFQ submitted!" : "Something went wrong"}
        message={resultDialog.message}
        onClose={() => setResultDialog((current) => ({ ...current, open: false }))}
      />
    </div>
  );
}

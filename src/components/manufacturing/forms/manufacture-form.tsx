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
  manufacturingFormSchema,
  steps,
  type ManufacturingFormValues,
} from "@/lib/forms/manufacturing-schema";

import { FormProgress } from "./form-progress";
import { FormStepCertification } from "./form-step-certification";
import { FormStepCompany } from "./form-step-company";
import { FormStepMaterial } from "./form-step-material";
import { FormStepProcess } from "./form-step-process";
import { FormStepReview } from "./form-step-review";
import { generateReferenceNumber } from "./summary";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ManufacturingForm() {
  const [step, setStep] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState(() => generateReferenceNumber());
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
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
  } = useForm<ManufacturingFormValues>({
    resolver: zodResolver(manufacturingFormSchema),
    mode: "onBlur",
    defaultValues,
  });

  const values = useWatch({ control });
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
    setFile(null);
    setFileError(null);
    setReferenceNumber(generateReferenceNumber());
    resetVerification();
  };

  const validateAndAdvance = async () => {
    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
    }
  };

  async function onSubmit(formValues: ManufacturingFormValues) {
    if (!isEmailVerified) {
      setResultDialog({
        open: true,
        status: "error",
        message: "Please verify your email before submitting.",
      });
      return;
    }

    try {
      let attachment: { fileName: string; fileType: string; fileBase64: string } | undefined;

      if (file) {
        attachment = {
          fileName: file.name,
          fileType: file.type || "application/octet-stream",
          fileBase64: await fileToBase64(file),
        };
      }

      const response = await fetch("/api/manufacturing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formValues, referenceNumber, attachment }),
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
          "Thank you for your RFQ. Our team will review your requirement and come back to you within 48 business hours.",
      });
    } catch (submitError) {
      const errorMessage = submitError instanceof Error ? submitError.message : "Failed to submit";
      setResultDialog({ open: true, status: "error", message: errorMessage });
    }
  }

  return (
    <div className=" p-14 scroll-mt-16" id="manufacturing-form">
      <FormProgress step={step} />

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
              <FormStepProcess errors={errors} control={control} setValue={setValue} />
            )}
            {step === 1 && (
              <FormStepMaterial
                register={register}
                errors={errors}
                file={file}
                fileError={fileError}
                onFileChange={(nextFile, nextError) => {
                  setFile(nextFile);
                  setFileError(nextError);
                }}
              />
            )}
            {step === 2 && (
              <FormStepCertification
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
              />
            )}
            {step === 3 && (
              <FormStepCompany
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
            {step === 4 && (
              <FormStepReview
                values={values as ManufacturingFormValues}
                referenceNumber={referenceNumber}
                isEmailVerified={isEmailVerified}
                submitting={isSubmitting}
                onSendEmail={() => handleSubmit(onSubmit)()}
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

        {step < steps.length - 1 && (
          <Button onClick={() => void validateAndAdvance()}>
            Continue
            <ArrowRight size={16} />
          </Button>
        )}
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

export default ManufacturingForm;

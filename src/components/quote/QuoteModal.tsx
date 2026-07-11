"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { MAX_LENGTHS, quoteFormSchema, type QuoteFormValues } from "@/lib/forms";

type QuoteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const steps = [
  {
    title: "Project Details",
    description: "Tell us about the scope and timeline.",
  },
  {
    title: "Technical Requirements",
    description: "Share your preferred stack and outcomes.",
  },
  {
    title: "Budget & Timeline",
    description: "Define your budget and target launch date.",
  },
  {
    title: "Contact Info",
    description: "We’ll follow up with a tailored proposal.",
  },
];

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onBlur",
  });

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
  const emailValue = useWatch({ control, name: "email" });
  const emailReady = Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue));

  async function sendOtp() {
    if (!emailReady) {
      setOtpError("Enter a valid email first.");
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send code");
      }
      setOtpSent(true);
      setOtpVerified(false);
      setMessage("A verification code has been sent to your inbox.");
      setStatus("idle");
    } catch (error) {
      setOtpSent(false);
      setOtpError(error instanceof Error ? error.message : "Unable to send code");
    } finally {
      setOtpLoading(false);
    }
  }

  async function verifyOtp() {
    if (!emailReady || otpCode.length !== 6) {
      setOtpError("Enter the 6-digit code we sent.");
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
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error("The verification code is invalid or expired.");
      }
      setOtpVerified(true);
      setMessage("Email verified. You can submit your request.");
      setStatus("idle");
    } catch (error) {
      setOtpVerified(false);
      setOtpError(error instanceof Error ? error.message : "Verification failed");
    } finally {
      setOtpLoading(false);
    }
  }

  const validateAndAdvance = async () => {
    const fieldsByStep: Array<Array<keyof QuoteFormValues>> = [
      ["projectName", "industry"],
      ["features", "stack"],
      ["budget", "timeline"],
      ["email", "phone"],
    ];

    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    await handleSubmit(onSubmit)();
  };

  async function onSubmit(values: QuoteFormValues) {
    if (!otpVerified) {
      setStatus("error");
      setMessage("Please verify your email first.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, otpCode }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setMessage("Thanks! We’ll reach out to your inbox shortly.");
      reset();
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode("");
      setSubmitted(true);
    } catch {
      setStatus("error");
      setMessage("We could not submit your quote request. Please try again shortly.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl border border-border/70 bg-background p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 rounded-full border border-border p-2 text-muted-foreground transition hover:text-foreground"
              aria-label="Close quote form"
            >
              <X size={16} />
            </button>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Request a Quote
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  Let’s shape your next build.
                </h2>
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
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{steps[step].title}</h3>
                    <span className="text-sm text-muted-foreground">{steps[step].description}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {step === 0 && (
                      <>
                        <label className="text-sm font-medium text-foreground">
                          Project name
                          <input
                            {...register("projectName")}
                            maxLength={MAX_LENGTHS.projectName}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.projectName ? (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.projectName.message}
                            </p>
                          ) : null}
                        </label>
                        <label className="text-sm font-medium text-foreground">
                          Industry
                          <input
                            {...register("industry")}
                            maxLength={MAX_LENGTHS.industry}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.industry ? (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.industry.message}
                            </p>
                          ) : null}
                        </label>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <label className="text-sm font-medium text-foreground">
                          Required features
                          <input
                            {...register("features")}
                            maxLength={MAX_LENGTHS.features}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.features ? (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.features.message}
                            </p>
                          ) : null}
                        </label>
                        <label className="text-sm font-medium text-foreground">
                          Preferred stack
                          <input
                            {...register("stack")}
                            maxLength={MAX_LENGTHS.stack}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.stack ? (
                            <p className="mt-1 text-sm text-destructive">{errors.stack.message}</p>
                          ) : null}
                        </label>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <label className="text-sm font-medium text-foreground">
                          Budget range
                          <input
                            {...register("budget")}
                            maxLength={MAX_LENGTHS.budget}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.budget ? (
                            <p className="mt-1 text-sm text-destructive">{errors.budget.message}</p>
                          ) : null}
                        </label>
                        <label className="text-sm font-medium text-foreground">
                          Timeline
                          <input
                            {...register("timeline")}
                            maxLength={MAX_LENGTHS.timeline}
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.timeline ? (
                            <p className="mt-1 text-sm text-destructive">
                              {errors.timeline.message}
                            </p>
                          ) : null}
                        </label>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <label className="text-sm font-medium text-foreground">
                          Your email
                          <input
                            {...register("email")}
                            maxLength={MAX_LENGTHS.email}
                            type="email"
                            inputMode="email"
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.email ? (
                            <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                          ) : null}
                          <div className="mt-3 rounded-2xl border border-border/70 bg-muted/40 p-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => void sendOtp()}
                                disabled={otpLoading || !emailReady || otpVerified}
                              >
                                {otpLoading
                                  ? "Sending..."
                                  : otpVerified
                                    ? "Verified"
                                    : otpSent
                                      ? "Resend code"
                                      : "Send code"}
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                Verify your email before sending the quote request.
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
                                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                                  placeholder="Enter 6-digit code"
                                />
                                <Button
                                  type="button"
                                  onClick={() => void verifyOtp()}
                                  disabled={otpLoading || otpVerified}
                                >
                                  {otpLoading ? "Checking..." : otpVerified ? "Verified" : "Verify"}
                                </Button>
                              </div>
                            )}
                            {otpError ? (
                              <p className="mt-2 text-sm text-destructive">{otpError}</p>
                            ) : null}
                            {otpVerified ? (
                              <p className="mt-2 text-sm text-primary">
                                Email verified. You can submit now.
                              </p>
                            ) : null}
                          </div>
                        </label>
                        <label className="text-sm font-medium text-foreground">
                          Phone / contact
                          <input
                            {...register("phone")}
                            maxLength={MAX_LENGTHS.phone}
                            inputMode="tel"
                            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                          />
                          {errors.phone ? (
                            <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                          ) : null}
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
                      {step === steps.length - 1 ? "Submit" : "Next"}
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>

                {message ? (
                  <div
                    className={`mt-4 rounded-xl border px-3 py-3 text-sm ${status === "success" ? "border-primary/20 bg-primary/10 text-primary" : "border-destructive/20 bg-destructive/10 text-destructive"}`}
                  >
                    {message}
                  </div>
                ) : null}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center"
              >
                <CheckCircle2 size={28} className="mx-auto mb-3 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Thanks! We’ll follow up shortly.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your request has been captured and our team will reach out with a tailored plan.
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

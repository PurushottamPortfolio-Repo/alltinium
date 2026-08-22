"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, Mail, Phone, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactFormSchema, MAX_LENGTHS, type ContactFormValues } from "@/lib/forms";
import { useEmailVerification } from "@/hooks/use-email-verification";
import { OTPModal } from "@/components/auth";
import { SubmissionDialog } from "@/components/common/submission-dialog";

export function ContactForm() {
  const {
    verified,
    verifiedEmail,
    email,
    setEmail,
    error,
    loading,
    sending,
    verifying,
    retryAfter,
    remainingAttempts,
    sendCode,
    verifyCode,
    reset,
  } = useEmailVerification();

  const [resultDialog, setResultDialog] = useState<{
    open: boolean;
    status: "success" | "error";
    message: string;
  }>({ open: false, status: "success", message: "" });
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset: resetForm,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const emailValue = useWatch({ control, name: "email" });
  const emailField = register("email");

  const resetFormState = () => {
    setSuccess("");
    setOtp("");
    reset();
    setVerifyModalOpen(false);
  };

  useEffect(() => {
    return () => {
      resetFormState();
    };
  }, []);

  const emailReady = useMemo(
    () => Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)),
    [emailValue],
  );

  const isEmailVerified =
    verified && verifiedEmail.trim().toLowerCase() === (emailValue ?? "").trim().toLowerCase();

  async function onSubmit(values: ContactFormValues) {
    if (!isEmailVerified) {
      setResultDialog({
        open: true,
        status: "error",
        message: "Please verify your email before submitting.",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT: Include cookies for session verification
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      resetForm();
      resetFormState();
      setResultDialog({
        open: true,
        status: "success",
        message: "Thank you! We'll reply to your inbox shortly.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form";
      setResultDialog({ open: true, status: "error", message: errorMessage });
      console.error("onSubmit error:", errorMessage);
    }
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
            Contact us
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Let&apos;s discuss your next build.
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Share a few details and our team will follow up with a tailored plan.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-foreground">
                Full name
                <input
                  {...register("name")}
                  maxLength={MAX_LENGTHS.name}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Alex Morgan"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                ) : null}
              </label>

              <label className="text-sm font-medium text-foreground">
                Email address
                <input
                  {...emailField}
                  onChange={(event) => {
                    emailField.onChange(event);
                    setEmail(event.target.value);
                  }}
                  maxLength={MAX_LENGTHS.email}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                ) : null}
                {emailReady && !isEmailVerified && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={async () => {
                      setVerifyModalOpen(true);
                      const ok = await sendCode();
                      if (ok) {
                        setSuccess("Verification code sent.");
                      }
                    }}
                    disabled={sending}
                  >
                    {sending ? "Sending code..." : "Verify Email"}
                  </Button>
                )}
                {isEmailVerified && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 size={16} />
                    Email verified
                  </div>
                )}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-foreground">
                Company (optional)
                <input
                  {...register("company")}
                  maxLength={MAX_LENGTHS.company}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Company name"
                />
                {errors.company ? (
                  <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
                ) : null}
              </label>

              <label className="text-sm font-medium text-foreground">
                Phone (optional)
                <input
                  {...register("phone")}
                  maxLength={MAX_LENGTHS.phone}
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+1 555 000 0000"
                />
                {errors.phone ? (
                  <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                ) : null}
              </label>
            </div>

            <label className="block text-sm font-medium text-foreground">
              Project details
              <textarea
                {...register("message")}
                maxLength={MAX_LENGTHS.message}
                rows={6}
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0 focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Describe the scope, timeline, and goals..."
              />
              {errors.message ? (
                <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
              ) : null}
            </label>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                We protect your information and never share it.
              </p>
              <Button type="submit" disabled={isSubmitting || !isEmailVerified} className="gap-2">
                {isSubmitting ? "Sending..." : "Send message"}
                <Send size={16} />
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-5">
            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:info@alltinium.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@alltinium.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Phone</p>
                  <a
                    href="tel:+919289080696"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +91 9289080696
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-x-2">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mt-2">Office</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    ALLTINIUM AEROMETRIX PRIVATE LIMITED No. 2504/1, E Block, Kodigehalli Main Road,
                    Sahakaranagar P.O, Bangalore North, Bangalore- 560092, Karnataka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

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
          title={resultDialog.status === "success" ? "Message sent!" : "Something went wrong"}
          message={resultDialog.message}
          onClose={() => setResultDialog((current) => ({ ...current, open: false }))}
        />
      </div>
    </>
  );
}

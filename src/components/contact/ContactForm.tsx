"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2, Mail, Phone, Send, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { contactFormSchema, MAX_LENGTHS, type ContactFormValues } from "@/lib/forms";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const emailValue = useWatch({ control, name: "email" });
  const emailField = register("email");

  const resetOtpState = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode("");
    setVerificationToken("");
    setOtpError("");
    setResendCountdown(0);
  };

  const resetFormState = () => {
    reset({ name: "", email: "", company: "", phone: "", message: "" });
    setStatus("idle");
    setMessage("");
    resetOtpState();
    setVerifyModalOpen(false);
  };

  useEffect(() => {
    return () => {
      resetFormState();
    };
  }, []);

  // Handle resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const emailReady = useMemo(
    () => Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)),
    [emailValue],
  );

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
        throw new Error(data.error || "Failed to send verification code");
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtpCode("");
      setOtpError("");
      setResendCountdown(60);
      setMessage("Check your inbox for the verification code.");
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

      setTimeout(() => {
        setVerifyModalOpen(false);
      }, 800);

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

  async function onSubmit(values: ContactFormValues) {
    if (!otpVerified || !verificationToken) {
      setStatus("error");
      setMessage("Please verify your email before submitting.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, verificationToken }),
      });

      const data = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      setStatus("success");
      setMessage("Thank you! We'll reply to your inbox shortly.");
      resetFormState();
    } catch (error) {
      setStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Failed to submit form";
      setMessage(errorMessage);
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
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
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
                    resetOtpState();
                  }}
                  maxLength={MAX_LENGTHS.email}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                ) : null}
                {emailReady && !otpVerified && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3"
                    onClick={() => setVerifyModalOpen(true)}
                  >
                    Verify Email
                  </Button>
                )}
                {otpVerified && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 size={16} />
                    Email verified
                  </div>
                )}
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-foreground">
                Company
                <input
                  {...register("company")}
                  maxLength={MAX_LENGTHS.company}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
                  placeholder="Company name"
                />
                {errors.company ? (
                  <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
                ) : null}
              </label>

              <label className="text-sm font-medium text-foreground">
                Phone
                <input
                  {...register("phone")}
                  maxLength={MAX_LENGTHS.phone}
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
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
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
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
              <Button type="submit" disabled={isSubmitting || !otpVerified} className="gap-2">
                {isSubmitting ? "Sending..." : "Send message"}
                <Send size={16} />
              </Button>
            </div>

            {message ? (
              <div
                className={`rounded-xl border px-3 py-3 text-sm ${
                  status === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            ) : null}
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
                    href="mailto:purushottam.portfolio@gmail.com"
                    className="text-sm text-muted-foreground"
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
                  <a href="tel:+919999999999" className="text-sm text-muted-foreground">
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
                    Sahakaranagar P.O, Bangalore North, Bangalore- 560092, Karnataka{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Security</p>
                  <p className="text-sm text-muted-foreground">
                    Rate limits, input sanitization, and server-side validation are enabled.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </motion.aside>

        {/* Email verification modal */}
        <AnimatePresence>
          {verifyModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setVerifyModalOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full max-w-md rounded-3xl border border-white/20 bg-background/70 p-6 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setVerifyModalOpen(false);
                    setOtpCode("");
                    setOtpError("");
                  }}
                  disabled={otpLoading}
                  className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted disabled:opacity-50"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                <h2 className="text-xl font-semibold text-foreground">Verify your email</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll send a secure 6-digit code to
                </p>

                <p className="mt-1 font-medium text-foreground">{emailValue}</p>

                <Button
                  type="button"
                  className="mt-6 w-full"
                  onClick={() => void sendOtp()}
                  disabled={otpLoading || otpVerified || resendCountdown > 0}
                >
                  {otpLoading
                    ? "Sending..."
                    : otpVerified
                      ? "✓ Verified"
                      : resendCountdown > 0
                        ? `Resend in ${resendCountdown}s`
                        : otpSent
                          ? "Resend Code"
                          : "Send Code"}
                </Button>

                {(otpSent || otpVerified) && (
                  <>
                    <input
                      value={otpCode}
                      onChange={(event) =>
                        setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter 6-digit code"
                      className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
                      disabled={otpVerified || otpLoading}
                    />

                    <Button
                      type="button"
                      className="mt-4 w-full"
                      onClick={() => void verifyOtp()}
                      disabled={otpLoading || otpVerified || otpCode.length !== 6}
                    >
                      {otpLoading ? "Verifying..." : otpVerified ? "✓ Verified" : "Verify"}
                    </Button>
                  </>
                )}

                {otpError && <p className="mt-3 text-sm text-red-600">{otpError}</p>}

                {otpVerified && (
                  <p className="mt-3 text-sm text-green-600">✓ Email verified successfully</p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { motion, AnimatePresence } from "framer-motion";
// import { Building2, CheckCircle2, Mail, Phone, Send, X } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { contactFormSchema, MAX_LENGTHS, type ContactFormValues } from "@/lib/forms";

// export function ContactForm() {
//   const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
//   const [message, setMessage] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otpCode, setOtpCode] = useState("");
//   const [verificationToken, setVerificationToken] = useState("");
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [verifyModalOpen, setVerifyModalOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<ContactFormValues>({
//     resolver: zodResolver(contactFormSchema),
//     mode: "onBlur",
//   });

//   const emailValue = useWatch({ control, name: "email" });
//   const emailField = register("email");

//   const resetOtpState = () => {
//     setOtpSent(false);
//     setOtpVerified(false);
//     setOtpCode("");
//     setVerificationToken("");
//     setOtpError("");
//   };

//   const resetFormState = () => {
//     reset({ name: "", email: "", company: "", phone: "", message: "" });
//     setStatus("idle");
//     setMessage("");
//     resetOtpState();
//     setVerifyModalOpen(false);
//   };

//   useEffect(() => {
//     return () => {
//       resetFormState();
//     };
//   }, []);

//   const emailReady = useMemo(
//     () => Boolean(emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)),
//     [emailValue],
//   );

//   async function sendOtp() {
//     if (!emailReady) {
//       setOtpError("Enter a valid email first.");
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

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || "Unable to send code");
//       }

//       setOtpSent(true);
//       setOtpVerified(false);
//       setMessage("A one-time verification code has been sent to your inbox.");
//       setStatus("idle");
//     } catch (error) {
//       setOtpSent(false);
//       setOtpError(error instanceof Error ? error.message : "Unable to send code");
//     } finally {
//       setOtpLoading(false);
//     }
//   }

//   async function verifyOtp() {
//     if (!emailReady || otpCode.length !== 6) {
//       setOtpError("Enter the 6-digit code we sent.");
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

//       const data = await response.json();
//       if (!response.ok || !data.success) {
//         throw new Error(data.error || "The verification code is invalid or expired.");
//       }

//       setOtpVerified(true);
//       setVerificationToken(data.token || "");
//       setTimeout(() => {
//         setVerifyModalOpen(false);
//       }, 1000);
//       setMessage("Email verified. You can now send your message.");
//       setStatus("idle");
//     } catch (error) {
//       setOtpVerified(false);
//       setOtpError(error instanceof Error ? error.message : "Verification failed");
//     } finally {
//       setOtpLoading(false);
//     }
//   }

//   async function onSubmit(values: ContactFormValues) {
//     if (!otpVerified || !verificationToken) {
//       setStatus("error");
//       setMessage("Please verify your email first.");
//       return;
//     }

//     setStatus("loading");
//     setMessage("");

//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...values, verificationToken }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Submission failed");
//       }

//       setStatus("success");
//       setMessage("Thanks for reaching out. We will reply to your inbox shortly.");
//       resetFormState();
//     } catch (error) {
//       setStatus("error");
//       setMessage(error instanceof Error ? error.message : "We could not send your message.");
//     }
//   }

//   return (
//     <>
//       <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.35 }}
//           className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
//         >
//           <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
//             Contact us
//           </p>
//           <h1 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
//             Let’s discuss your next build.
//           </h1>
//           <p className="mt-4 text-base text-muted-foreground">
//             Share a few details and our team will follow up with a tailored plan.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
//             <div className="grid gap-4 md:grid-cols-2">
//               <label className="text-sm font-medium text-foreground">
//                 Full name
//                 <input
//                   {...register("name")}
//                   maxLength={MAX_LENGTHS.name}
//                   className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                   placeholder="Alex Morgan"
//                 />
//                 {errors.name ? (
//                   <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
//                 ) : null}
//               </label>

//               <label className="text-sm font-medium text-foreground">
//                 Email address
//                 <input
//                   {...emailField}
//                   onChange={(event) => {
//                     emailField.onChange(event);
//                     resetOtpState();
//                   }}
//                   maxLength={MAX_LENGTHS.email}
//                   type="email"
//                   inputMode="email"
//                   autoComplete="email"
//                   className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                   placeholder="you@example.com"
//                 />
//                 {errors.email ? (
//                   <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
//                 ) : null}
//                 {/* <div className="mt-3 rounded-2xl border border-border/70 bg-muted/40 p-3">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => void sendOtp()}
//                     disabled={otpLoading || !emailReady || otpVerified}
//                   >
//                     {otpLoading
//                       ? "Sending..."
//                       : otpVerified
//                         ? "Verified"
//                         : otpSent
//                           ? "Resend code"
//                           : "Send code"}
//                   </Button>
//                   <p className="text-xs text-muted-foreground">
//                     We’ll send a 6-digit code to verify the sender email.
//                   </p>
//                 </div>
//                 {(otpSent || otpVerified) && (
//                   <div className="mt-3 flex flex-col gap-2 sm:flex-row">
//                     <input
//                       value={otpCode}
//                       onChange={(event) =>
//                         setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       maxLength={6}
//                       inputMode="numeric"
//                       className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-0"
//                       placeholder="Enter 6-digit code"
//                     />
//                     <Button
//                       type="button"
//                       onClick={() => void verifyOtp()}
//                       disabled={otpLoading || otpVerified}
//                     >
//                       {otpLoading ? "Checking..." : otpVerified ? "Verified" : "Verify"}
//                     </Button>
//                   </div>
//                 )}
//                 {otpError ? <p className="mt-2 text-sm text-destructive">{otpError}</p> : null}
//                 {otpVerified ? (
//                   <p className="mt-2 text-sm text-primary">Email verified. You can submit now.</p>
//                 ) : null}
//               </div> */}
//                 {emailReady && !otpVerified && (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="mt-3"
//                     onClick={() => setVerifyModalOpen(true)}
//                   >
//                     Verify Email
//                   </Button>
//                 )}
//                 {otpVerified && (
//                   <div className="mt-3 flex items-center gap-2 text-sm text-green-500">
//                     <CheckCircle2 size={16} />
//                     Email verified
//                   </div>
//                 )}
//               </label>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">
//               <label className="text-sm font-medium text-foreground">
//                 Company
//                 <input
//                   {...register("company")}
//                   maxLength={MAX_LENGTHS.company}
//                   className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                   placeholder="Company name"
//                 />
//                 {errors.company ? (
//                   <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
//                 ) : null}
//               </label>

//               <label className="text-sm font-medium text-foreground">
//                 Phone
//                 <input
//                   {...register("phone")}
//                   maxLength={MAX_LENGTHS.phone}
//                   inputMode="tel"
//                   autoComplete="tel"
//                   className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                   placeholder="+1 555 000 0000"
//                 />
//                 {errors.phone ? (
//                   <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
//                 ) : null}
//               </label>
//             </div>

//             <label className="block text-sm font-medium text-foreground">
//               Project details
//               <textarea
//                 {...register("message")}
//                 maxLength={MAX_LENGTHS.message}
//                 rows={6}
//                 className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none ring-0"
//                 placeholder="Describe the scope, timeline, and goals..."
//               />
//               {errors.message ? (
//                 <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
//               ) : null}
//             </label>

//             <div className="flex items-center justify-between gap-3">
//               <p className="text-sm text-muted-foreground">
//                 We protect your information and never share it.
//               </p>
//               <Button type="submit" disabled={isSubmitting || !otpVerified} className="gap-2">
//                 {isSubmitting ? "Sending..." : "Send message"}
//                 <Send size={16} />
//               </Button>
//             </div>

//             {message ? (
//               <div
//                 className={`rounded-xl border px-3 py-3 text-sm ${status === "success" ? "border-primary/20 bg-primary/10 text-primary" : "border-destructive/20 bg-destructive/10 text-destructive"}`}
//               >
//                 {message}
//               </div>
//             ) : null}
//           </form>
//         </motion.div>

//         <motion.aside
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.35, delay: 0.05 }}
//           className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 shadow-sm sm:p-8"
//         >
//           <div className="space-y-5">
//             <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-2 text-primary">
//                   <Mail size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-foreground">Email</p>
//                   <a
//                     href="mailto:purushottam.portfolio@gmail.com"
//                     className="text-sm text-muted-foreground"
//                   >
//                     purushottam.portfolio@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-2 text-primary">
//                   <Phone size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-foreground">Phone</p>
//                   <a href="tel:+919999999999" className="text-sm text-muted-foreground">
//                     +91 99999 99999
//                   </a>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-2 text-primary">
//                   <Building2 size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-foreground">Office</p>
//                   <p className="text-sm text-muted-foreground">Remote-first • Worldwide delivery</p>
//                 </div>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-2 text-primary">
//                   <CheckCircle2 size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-foreground">Security</p>
//                   <p className="text-sm text-muted-foreground">
//                     Rate limits, input sanitization, and server-side validation are enabled.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.aside>

//         {/* Email verification */}
//         <AnimatePresence>
//           {verifyModalOpen && (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <motion.div
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.95 }}
//                 className="relative w-full max-w-md rounded-3xl border border-white/20 bg-background/70 p-6 shadow-2xl backdrop-blur-xl"
//               >
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setVerifyModalOpen(false);
//                     setOtpCode("");
//                     setOtpError("");
//                   }}
//                   disabled={otpLoading}
//                   className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted"
//                 >
//                   <X size={18} />
//                 </button>

//                 <h2 className="text-xl font-semibold">Verify your email</h2>

//                 <p className="mt-2 text-sm text-muted-foreground">
//                   We will send a secure 6-digit code to
//                 </p>

//                 <p className="mt-1 font-medium">{emailValue}</p>

//                 <Button
//                   type="button"
//                   className="mt-6 w-full"
//                   onClick={() => void sendOtp()}
//                   disabled={otpLoading || otpVerified}
//                 >
//                   {otpLoading ? "Sending..." : otpSent ? "Resend Code" : "Send Code"}
//                 </Button>

//                 {(otpSent || otpVerified) && (
//                   <>
//                     <input
//                       value={otpCode}
//                       onChange={(event) =>
//                         setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       maxLength={6}
//                       inputMode="numeric"
//                       placeholder="Enter 6-digit code"
//                       className="mt-4 w-full rounded-xl border border-border bg-background px-3 py-2"
//                     />

//                     <Button
//                       type="button"
//                       className="mt-4 w-full"
//                       onClick={() => void verifyOtp()}
//                       disabled={otpLoading || otpVerified}
//                     >
//                       {otpLoading ? "Checking..." : otpVerified ? "Verified" : "Verify"}
//                     </Button>
//                   </>
//                 )}

//                 {otpError && <p className="mt-3 text-sm text-destructive">{otpError}</p>}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";

type OtpResponse = { error?: string; success?: boolean };
type VerifyResponse = { success?: boolean; token?: string; error?: string };

/**
 * Encapsulates the "verify your email before submitting" flow used on the
 * Company step: send a 6-digit code, let the user enter it, and hold onto
 * the verification token once confirmed.
 */
export function useOtpVerification(emailReady: boolean, email?: string) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  function resetOtp() {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode("");
    setVerificationToken("");
    setOtpError("");
    setResendCountdown(0);
  }

  async function sendOtp() {
    if (!emailReady || !email) {
      setOtpError("Please enter a valid email address.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as OtpResponse;

      if (!response.ok) {
        throw new Error(data.error || "Failed to send code");
      }

      setOtpSent(true);
      setOtpVerified(false);
      setOtpCode("");
      setOtpError("");
      setResendCountdown(60);
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
    if (!emailReady || !email || otpCode.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const data = (await response.json()) as VerifyResponse;

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
    } catch (error) {
      setOtpVerified(false);
      const errorMessage = error instanceof Error ? error.message : "Verification failed";
      setOtpError(errorMessage);
      console.error("verifyOtp error:", errorMessage);
    } finally {
      setOtpLoading(false);
    }
  }

  return {
    otpSent,
    otpVerified,
    otpCode,
    setOtpCode,
    verificationToken,
    otpLoading,
    otpError,
    resendCountdown,
    sendOtp,
    verifyOtp,
    resetOtp,
  };
}

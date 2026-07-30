"use client";

import { useCallback, useEffect, useState } from "react";
import { checkSession, sendOTP, verifyOTP } from "@/lib/api/auth";

interface UseEmailVerificationReturn {
  loading: boolean;
  sending: boolean;
  verifying: boolean;
  verifiedEmail: string;
  verified: boolean;
  retryAfter: number;
  email: string;
  remainingAttempts: number;
  error: string | null;
  setEmail: (email: string) => void;
  checkVerification: () => Promise<void>;
  sendCode: () => Promise<boolean>;
  verifyCode: (otp: string) => Promise<boolean>;
  reset: () => void;
}

export function useEmailVerification(): UseEmailVerificationReturn {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [retryAfter, setRetryAfter] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(0);

  const checkVerification = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const session = await checkSession();

      if (session.verified && session.email) {
        setVerified(true);
        setVerifiedEmail(session.email);
        console.log("Email verification session found:", session.email);
      } else {
        setVerified(false);
        setVerifiedEmail("");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      setVerified(false);
      setVerifiedEmail("");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check verification on mount
  useEffect(() => {
    const checkAsync = async () => {
      await checkVerification();
    };
    checkAsync();
  }, [checkVerification]);

  // Countdown timer for retry
  useEffect(() => {
    if (retryAfter <= 0) return;

    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter]);

  const isVerified = verified && verifiedEmail.trim().toLowerCase() === email.trim().toLowerCase();

  async function sendCode(): Promise<boolean> {
    if (!email) {
      setError("Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setSending(true);
    setError(null);

    try {
      console.log("Sending OTP to:", email);
      const result = await sendOTP(email);

      if (result.retryAfter) {
        setRetryAfter(result.retryAfter);
      }
      if (result.remainingAttempts !== undefined) {
        setRemainingAttempts(result.remainingAttempts);
      }

      if (!result.success) {
        const errorMsg = result.message || "Failed to send verification code.";
        setError(errorMsg);
        console.error("OTP send failed:", errorMsg);
        return false;
      }

      console.log("OTP sent successfully");
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send verification code.";
      setError(errorMsg);
      console.error("OTP send error:", err);
      return false;
    } finally {
      setSending(false);
    }
  }

  async function verifyCode(otp: string): Promise<boolean> {
    if (!otp) {
      setError("Please enter the verification code.");
      return false;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Verification code must be 6 digits.");
      return false;
    }

    setVerifying(true);
    setError(null);

    try {
      console.log("Verifying OTP for:", email);
      const result = await verifyOTP(email, otp);

      if (!result.success) {
        const errorMsg = result.message || "Verification failed.";
        setError(errorMsg);
        console.error("OTP verification failed:", errorMsg);
        return false;
      }

      // Verification successful
      setVerified(true);
      setVerifiedEmail(email);
      console.log("Email verified successfully:", email);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Verification failed.";
      setError(errorMsg);
      console.error("OTP verification error:", err);
      return false;
    } finally {
      setVerifying(false);
    }
  }

  function reset(): void {
    setVerified(false);
    setVerifiedEmail("");
    setError(null);
    setEmail("");
    setRetryAfter(0);
    setRemainingAttempts(0);
  }

  return {
    loading,
    sending,
    verifying,
    verified: isVerified,
    verifiedEmail,
    email,
    error,
    retryAfter,
    remainingAttempts,
    setEmail,
    checkVerification,
    sendCode,
    verifyCode,
    reset,
  };
}

import type { ApiResponse, CheckSessionResponse, VerifyOTPResponse } from "@/types/auth";

export async function checkSession(): Promise<CheckSessionResponse> {
  const response = await fetch("/api/auth/check-session", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      authenticated: false,
      verified: false,
    };
  }

  return response.json();
}

export async function sendOTP(email: string): Promise<ApiResponse> {
  const response = await fetch("/api/auth/send-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return response.json();
}

export async function verifyOTP(email: string, otp: string): Promise<VerifyOTPResponse> {
  const response = await fetch("/api/auth/verify-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  return response.json();
}

export interface CheckSessionResponse {
  authenticated: boolean;
  verified: boolean;
  email?: string;
  expiresAt?: number;
}

export interface ApiResponse {
  success: boolean;

  message: string;

  retryAfter?: number;

  resendAvailableAt?: string;

  remainingAttempts?: number;

  expiresAt?: string;
}

export interface VerifyOTPResponse extends ApiResponse {
  verified?: boolean;
}

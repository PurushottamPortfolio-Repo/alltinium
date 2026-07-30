export interface OTPModalProps {
  open: boolean;

  email: string;

  verified: boolean;

  loading: boolean;

  sending: boolean;

  verifying: boolean;

  otp: string;

  retryAfter: number;

  remainingAttempts: number;

  error: string | null;

  success: string | null;

  onOTPChange: (value: string) => void;

  onVerify: () => void;

  onResend: () => void;

  onClose: () => void;
}

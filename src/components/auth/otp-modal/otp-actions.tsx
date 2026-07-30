interface Props {
  retryAfter: number;

  sending: boolean;

  verifying: boolean;

  verified: boolean;

  onVerify(): void;

  onResend(): void;
}

export function OTPActions({
  retryAfter,
  sending,
  verifying,
  verified,
  onVerify,
  onResend,
}: Props) {
  return (
    <div className="flex gap-3">
      <button disabled={verifying || verified} onClick={onVerify}>
        Verify
      </button>

      <button disabled={retryAfter > 0 || sending} onClick={onResend}>
        {retryAfter > 0 ? `Resend (${retryAfter})` : "Resend OTP"}
      </button>
    </div>
  );
}

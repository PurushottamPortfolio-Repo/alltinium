"use client";

import { OTPHeader } from "./otp-header";
import { OTPEmail } from "./otp-email";
import { OTPInput } from "./otp-input";
import { OTPActions } from "./otp-actions";
import { OTPStatus } from "./otp-status";
import { OTPLoader } from "./otp-loader";

import { OTPModalProps } from "./types";

// Temporarily hidden: showed "Remaining attempts: 0" in a way that alarmed
// users testing resends. To re-enable, flip this to true — no other changes
// needed, `remainingAttempts` is still tracked and passed in as before.
const SHOW_REMAINING_ATTEMPTS = false;

export function OTPModal({
  open,
  email,
  otp,
  loading,
  sending,
  verifying,
  verified,
  retryAfter,
  remainingAttempts,
  error,
  success,
  onOTPChange,
  onVerify,
  onResend,
  onClose,
}: OTPModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-xl bg-background p-6 shadow-xl">
        <OTPLoader loading={loading} />

        <OTPHeader onClose={onClose} />

        <div className="mt-6 space-y-5">
          <OTPEmail email={email} />

          <OTPInput value={otp} disabled={verifying} onChange={onOTPChange} />

          <OTPStatus error={error} success={success} />

          <OTPActions
            retryAfter={retryAfter}
            sending={sending}
            verifying={verifying}
            verified={verified}
            onVerify={onVerify}
            onResend={onResend}
          />

          {SHOW_REMAINING_ATTEMPTS && (
            <p className="text-xs text-muted-foreground">Remaining attempts: {remainingAttempts}</p>
          )}
        </div>
      </div>
    </div>
  );
}

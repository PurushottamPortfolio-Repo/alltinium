import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import type { useOtpVerification } from "@/hooks/use-otp-verification";
import { MAX_LENGTHS, type RFQFormValues } from "@/lib/forms/quote-schema";

type QuoteStepCompanyProps = {
  register: UseFormRegister<RFQFormValues>;
  errors: FieldErrors<RFQFormValues>;
  emailReady: boolean;
  otp: ReturnType<typeof useOtpVerification>;
};

export function QuoteStepCompany({ register, errors, emailReady, otp }: QuoteStepCompanyProps) {
  const {
    otpSent,
    otpVerified,
    otpCode,
    setOtpCode,
    otpLoading,
    otpError,
    resendCountdown,
    sendOtp,
    verifyOtp,
  } = otp;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-foreground">Company Name *</span>
        <input
          {...register("companyName")}
          maxLength={MAX_LENGTHS.companyName}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
        )}
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Contact Name *</span>
        <input
          {...register("contactName")}
          maxLength={MAX_LENGTHS.contactName}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.contactName && (
          <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
        )}
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-foreground">Email *</span>
        <input
          {...register("email")}
          maxLength={MAX_LENGTHS.email}
          type="email"
          inputMode="email"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

        <div className="mt-3 rounded-lg border border-border/70 bg-muted/40 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void sendOtp()}
              disabled={otpLoading || !emailReady || otpVerified || resendCountdown > 0}
            >
              {otpLoading
                ? "Sending..."
                : otpVerified
                  ? "✓ Verified"
                  : resendCountdown > 0
                    ? `Resend in ${resendCountdown}s`
                    : otpSent
                      ? "Resend code"
                      : "Send code"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Verify your email before sending the RFQ.
            </p>
          </div>

          {(otpSent || otpVerified) && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={otpCode}
                onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                inputMode="numeric"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Enter 6-digit code"
                disabled={otpVerified || otpLoading}
              />
              <Button
                type="button"
                onClick={() => void verifyOtp()}
                disabled={otpLoading || otpVerified || otpCode.length !== 6}
              >
                {otpLoading ? "Checking..." : otpVerified ? "✓ Verified" : "Verify"}
              </Button>
            </div>
          )}

          {otpError && <p className="mt-2 text-sm text-red-600">{otpError}</p>}
          {otpVerified && (
            <p className="mt-2 text-sm text-green-600">✓ Email verified successfully</p>
          )}
        </div>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Phone / Contact *</span>
        <input
          {...register("phone")}
          maxLength={MAX_LENGTHS.phone}
          inputMode="tel"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </label>
    </div>
  );
}

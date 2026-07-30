interface Props {
  email: string;
}

export function OTPEmail({ email }: Props) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-sm text-muted-foreground">Verification email</p>

      <p className="font-medium">{email}</p>
    </div>
  );
}

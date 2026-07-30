interface Props {
  value: string;

  onChange(value: string): void;

  disabled: boolean;
}

export function OTPInput({ value, onChange, disabled }: Props) {
  return (
    <input
      value={value}
      maxLength={6}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      className="w-full rounded-lg border p-3 text-center text-2xl tracking-[8px]"
      placeholder="000000"
    />
  );
}

interface Props {
  error: string | null;

  success: string | null;
}

export function OTPStatus({ error, success }: Props) {
  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (success) {
    return <p className="text-sm text-green-600">{success}</p>;
  }

  return null;
}

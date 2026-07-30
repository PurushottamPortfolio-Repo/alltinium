interface Props {
  loading: boolean;
}

export function OTPLoader({ loading }: Props) {
  if (!loading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      Loading...
    </div>
  );
}

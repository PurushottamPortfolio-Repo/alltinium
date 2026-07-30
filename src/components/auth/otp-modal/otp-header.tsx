import { X } from "lucide-react";

interface Props {
  onClose(): void;
}

export function OTPHeader({ onClose }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Verify Email</h2>

      <button onClick={onClose}>
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

import Image from "next/image";
import { assets } from "@/assets";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/15 border-t-primary" />
        <Image
          src={assets.logo}
          alt="Alltinium"
          width={36}
          height={36}
          priority
          className="h-9 w-9 object-contain"
        />
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Alltinium</p>
        <p className="text-sm text-muted-foreground">Loading your experience…</p>
      </div>
    </div>
  );
}

"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SubmissionDialogProps {
  open: boolean;
  status: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

export function SubmissionDialog({ open, status, title, message, onClose }: SubmissionDialogProps) {
  if (!open) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-xl bg-background p-6 text-center shadow-xl">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {isSuccess ? <CheckCircle2 size={28} /> : <XCircle size={28} />}
        </div>

        <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        <Button className="mt-6 w-full" onClick={onClose}>
          {isSuccess ? "Done" : "Close"}
        </Button>
      </div>
    </div>
  );
}

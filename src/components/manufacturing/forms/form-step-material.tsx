import type { ChangeEvent } from "react";
import { useRef } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { UploadCloud, X } from "lucide-react";

import { MAX_LENGTHS, type ManufacturingFormValues } from "@/lib/forms/manufacturing-schema";

import {
  ACCEPTED_FILE_EXTENSIONS,
  MATERIAL_FAMILIES,
  MAX_ATTACHMENT_BYTES,
  QUANTITY_TYPES,
  TOLERANCE_CLASSES,
} from "./form-data";

type FormStepMaterialProps = {
  register: UseFormRegister<ManufacturingFormValues>;
  errors: FieldErrors<ManufacturingFormValues>;
  file: File | null;
  fileError: string | null;
  onFileChange: (file: File | null, error: string | null) => void;
};

export function FormStepMaterial({
  register,
  errors,
  file,
  fileError,
  onFileChange,
}: FormStepMaterialProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFilePick(event: ChangeEvent<HTMLInputElement>) {
    const picked = event.target.files?.[0] ?? null;

    if (!picked) {
      onFileChange(null, null);
      return;
    }

    if (picked.size > MAX_ATTACHMENT_BYTES) {
      onFileChange(null, "File is too large. Please attach a file under 4 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    onFileChange(picked, null);
  }

  function clearFile() {
    onFileChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <h4 className="text-base font-semibold text-foreground">Part &amp; material details</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us what the part is made of and how many you need. Attach a drawing if you have one —
        many processes are quoted from the print.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Material family *</span>
          <select
            {...register("materialFamily")}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {MATERIAL_FAMILIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.materialFamily && (
            <p className="mt-1 text-sm text-red-600">{errors.materialFamily.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Grade / specification</span>
          <input
            {...register("materialGrade")}
            maxLength={MAX_LENGTHS.materialGrade}
            placeholder="e.g. Al 7075-T651, Ti-6Al-4V, Inconel 718, 15-5PH"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Quantity type *</span>
          <select
            {...register("quantityType")}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {QUANTITY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.quantityType && (
            <p className="mt-1 text-sm text-red-600">{errors.quantityType.message}</p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Quantity (pcs / kg)</span>
          <input
            {...register("quantity")}
            maxLength={MAX_LENGTHS.quantity}
            placeholder="e.g. 25 pcs"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Max part envelope</span>
          <input
            {...register("envelope")}
            maxLength={MAX_LENGTHS.envelope}
            placeholder="e.g. 300 × 200 × 80 mm"
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Tolerance class</span>
          <select
            {...register("tolerance")}
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {TOLERANCE_CLASSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-foreground">Requirement description *</span>
          <textarea
            {...register("description")}
            maxLength={MAX_LENGTHS.description}
            rows={4}
            placeholder="Describe the part / job: function, secondary processes needed (e.g. machining + hard anodising), assembly level, testing or NDT, packaging, anything else we should know."
            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </label>

        <div className="block md:col-span-2">
          <span className="text-sm font-medium text-foreground">
            Drawing / schematic (PDF, STEP, DXF, image)
          </span>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={ACCEPTED_FILE_EXTENSIONS}
            onChange={handleFilePick}
          />

          {!file ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-8 text-center text-sm text-muted-foreground transition-colors hover:border-primary/50"
            >
              <UploadCloud className="h-5 w-5" />
              Click to select a file — or describe the geometry above if you can&apos;t share yet
            </button>
          ) : (
            <div className="mt-2 flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5">
              <span className="truncate text-sm text-foreground">{file.name}</span>
              <button
                type="button"
                onClick={clearFile}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {fileError && <p className="mt-1 text-sm text-red-600">{fileError}</p>}

          <span className="mt-2 block text-xs text-muted-foreground">
            Files up to 4 MB are attached to the email that&apos;s sent on submit. NDA available
            before you share controlled drawings.
          </span>
        </div>
      </div>
    </div>
  );
}

export default FormStepMaterial;

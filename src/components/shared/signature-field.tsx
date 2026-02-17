"use client";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";

type SignatureFieldProps = {
  onSave?: (value: string) => void;
};

export function SignatureField({ onSave }: SignatureFieldProps) {
  const ref = useRef<SignatureCanvas>(null);

  return (
    <div className="space-y-3 rounded-2xl border border-primary/20 bg-card p-4">
      <SignatureCanvas
        ref={ref}
        penColor="#30504b"
        canvasProps={{
          className: "h-44 w-full rounded-xl border border-primary/15 bg-background",
        }}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            ref.current?.clear();
            onSave?.("");
          }}
        >
          Limpar
        </Button>
        <Button
          type="button"
          onClick={() => onSave?.(ref.current?.toDataURL("image/png") ?? "")}
        >
          Salvar assinatura
        </Button>
      </div>
    </div>
  );
}

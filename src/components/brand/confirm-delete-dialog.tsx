"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  clientName?: string;
};

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  clientName,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[28rem] rounded-3xl border-primary/15 bg-card p-6 shadow-[0_14px_36px_rgba(59,86,77,0.18)]">
        <DialogHeader className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-secondary text-primary">
            <AlertCircle className="h-5 w-5" />
          </div>
          <DialogTitle className="font-serif-display text-3xl leading-[1.05] text-primary">
            Excluir cliente?
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-primary/80">
            {clientName
              ? `Tem certeza de que deseja excluir ${clientName}? Essa acao nao pode ser desfeita.`
              : "Tem certeza de que deseja excluir este registro? Essa acao nao pode ser desfeita."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl border-primary/20"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-2xl shadow-[0_8px_20px_rgba(211,93,93,0.28)]"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Sim, excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

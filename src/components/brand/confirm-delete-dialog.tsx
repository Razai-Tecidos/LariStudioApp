"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <DialogContent className="rounded-3xl border-primary/15 bg-card p-6 shadow-[0_12px_34px_rgba(59,86,77,0.18)]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl text-primary">Excluir cliente?</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-primary/75">
            {clientName
              ? `Tem certeza de que deseja excluir ${clientName}? Essa acao nao pode ser desfeita.`
              : "Tem certeza de que deseja excluir este registro? Essa acao nao pode ser desfeita."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
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
            className="rounded-2xl border border-red-300/80 bg-red-50/55 text-red-700 hover:bg-red-100/70"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

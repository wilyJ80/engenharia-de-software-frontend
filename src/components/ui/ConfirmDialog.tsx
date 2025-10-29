"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "Confirmar",
  description = "Tem certeza?",
  confirmLabel = "Sim",
  cancelLabel = "Cancelar",
  onConfirm,
  children,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  children: ReactNode; // trigger element
}) {
  const controlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);

  const effectiveOpen = controlled ? open! : internalOpen;

  const handleOpenChange = (v: boolean) => {
    if (controlled) {
      onOpenChange?.(v);
    } else {
      setInternalOpen(v);
    }
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleOpenChange(false);
  };

  return (
    <Dialog open={effectiveOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
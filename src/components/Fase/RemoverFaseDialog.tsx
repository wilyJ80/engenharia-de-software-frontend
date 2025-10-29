'use client';
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Fase } from "@/core/interface/Fase";

interface RemoverFaseProps {
  onRemove: (id: string) => void;
  fase: Fase;
}

export const RemoverFase = ({ onRemove, fase }: RemoverFaseProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        title="Remover"
        className="bg-azul-claro hover:bg-red-500 hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Trash2 />
      </Button>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
            <DialogTitle>Remover Fase</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover a fase <b>{fase.nome}</b>?
            </DialogDescription>

            <DialogFooter>
              <Button
                onClick={() => {
                  onRemove(fase.id);
                  setOpen(false);
                }}
                className="bg-azul-escuro hover:bg-azul-claro/50 cursor-pointer rounded-md border-2 px-10 border-black"
              >
                Remover
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

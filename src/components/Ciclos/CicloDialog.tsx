"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

type CicloItem = {
  id?: number;
  name: string;
  versao: string;
};

export default function CicloDialog({
  onAdd,
  onSave,
  initialItem,
  open: openProp,
  onOpenChange,
}: {
  onAdd?: (item: CicloItem) => void;
  onSave?: (item: CicloItem) => void; // called for edits
  initialItem?: CicloItem | null;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const [ciclo, setCiclo] = useState("");
  const [versao, setVersao] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  const controlled = openProp !== undefined;
  const open = controlled ? openProp! : internalOpen;

  const handleOpenChange = (v: boolean) => {
    if (controlled) onOpenChange?.(v);
    else setInternalOpen(v);
  };

  useEffect(() => {
    if (initialItem) {
      setCiclo(initialItem.name ?? "");
      setVersao(initialItem.versao ?? "");
    } else {
      setCiclo("");
      setVersao("");
    }
  }, [initialItem]);

  const handleSave = () => {
    if (!ciclo || !versao) return alert("Preencha todos os campos!");

    const item: CicloItem = {
      id: initialItem?.id ?? Date.now(),
      name: ciclo,
      versao,
    };

    if (initialItem) {
      // edição
      onSave?.(item);
    } else {
      onAdd?.(item);
    }

    // reset
    setCiclo("");
    setVersao("");
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Botão que abre o diálogo (apenas para modo adicionar, quando não controlado) */}
      {!controlled && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-azul-escuro text-white hover:bg-azul-claro transition">
            <Plus size={18} />
            <span>Ciclo</span>
          </Button>
        </DialogTrigger>
      )}

      {/* Conteúdo do diálogo */}
      <DialogContent className="sm:max-w-md bg-azul-escuro text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-white">
            {initialItem ? "Editar ciclo" : "Adicionar novo ciclo"}
          </DialogTitle>
          <DialogDescription className="text-gray-200">
            {initialItem
              ? "Ajuste as informações do ciclo e clique em salvar."
              : "Preencha as informações do novo ciclo abaixo."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="ciclo" className="text-sm font-medium text-white">
              Ciclo
            </label>
            <Input
              id="ciclo"
              placeholder="Ex: Ciclo VI - Revisão"
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="versao" className="text-sm font-medium text-white">
              Versão
            </label>
            <Input
              id="versao"
              placeholder="Ex: v1.0"
              value={versao}
              onChange={(e) => setVersao(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="bg-azul-claro hover:bg-blue-400 text-white">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

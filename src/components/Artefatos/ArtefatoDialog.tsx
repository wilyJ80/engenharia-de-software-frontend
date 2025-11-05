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

type ArtefatoItem = {
  id?: string | number;
  nome: string;
};

export default function ArtefatoDialog({
  onAdd,
  onSave,
  initialItem,
  open: openProp,
  onOpenChange,
}: {
  onAdd?: (item: ArtefatoItem) => void;
  onSave?: (item: ArtefatoItem) => void; // called for edits
  initialItem?: ArtefatoItem | null;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}) {
  const [nome, setNome] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  const controlled = openProp !== undefined;
  const open = controlled ? openProp! : internalOpen;

  const handleOpenChange = (v: boolean) => {
    if (controlled) onOpenChange?.(v);
    else setInternalOpen(v);
  };

  useEffect(() => {
    if (initialItem) {
      setNome(initialItem.nome ?? "");
    } else {
      setNome("");
    }
  }, [initialItem]);

  const handleSave = () => {
    if (!nome) return alert("Preencha o nome do artefato!");

    const item: ArtefatoItem = {
      id: initialItem?.id ?? Date.now(),
      nome: nome,
    };

    if (initialItem) {
      // edição
      onSave?.(item);
    } else {
      onAdd?.(item);
    }

    // reset
    setNome("");
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Botão que abre o diálogo (apenas para modo adicionar, quando não controlado) */}
      {!controlled && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 transition">
            <Plus size={18} />
            <span>Artefato</span>
          </Button>
        </DialogTrigger>
      )}

      {/* Conteúdo do diálogo */}
      <DialogContent className="sm:max-w-md bg-azul-escuro text-white border-none">
        <DialogHeader>
          <DialogTitle className="text-white">
            {initialItem ? "Editar artefato" : "Adicionar novo artefato"}
          </DialogTitle>
          <DialogDescription className="text-gray-200">
            {initialItem
              ? "Ajuste as informações do artefato e clique em salvar."
              : "Preencha as informações do novo artefato abaixo."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm font-medium text-white">
              Nome
            </label>
            <Input
              id="nome"
              placeholder="Digite o nome do artefato"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

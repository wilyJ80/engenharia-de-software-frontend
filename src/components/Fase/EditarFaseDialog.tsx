'use client';
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Fase } from "@/core/interface/Fase";

interface EditarFaseProps {
  fase: Fase;
  onEdit: (id: string, faseEditada: Partial<Fase>) => void;
}

export const EditarFase = ({ fase, onEdit }: EditarFaseProps) => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(fase.nome);
  const [descritivo, setDescritivo] = useState(fase.descritivo);

 const handleSalvar = () => {
  onEdit(fase.id, { nome, descritivo });
  setOpen(false);
};

  return (
    <>
      <Button
        title="Editar"
        onClick={() => setOpen(true)}
        className="bg-azul-claro hover:bg-transparent hover:cursor-pointer"
      >
        <Pencil />
      </Button>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
            <DialogTitle>Editar Fase</DialogTitle>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <Label>Nome:</Label>
                <Input
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  placeholder="Nome da fase"
                  className="bg-azul-escuro placeholder-gray-400 text-white"
                  value={nome}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label>Descritivo:</Label>
                <Textarea
                  onChange={(e) => setDescritivo(e.target.value)}
                  placeholder="Descrição da fase"
                  className="bg-azul-escuro placeholder-gray-400 text-white"
                  value={descritivo}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handleSalvar}
                className="bg-azul-escuro hover:bg-azul-claro/50 cursor-pointer rounded-md border-2 px-10 border-black"
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

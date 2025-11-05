'use client';
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
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
import { visualizarArtefato } from "@/core/service/artefatoService";

interface EditarFaseProps {
  fase: Fase;
  onEdit: (id: string, faseEditada: Partial<Fase>) => void;
}

export const EditarFase = ({ fase, onEdit }: EditarFaseProps) => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(fase.nome);
  const [ordem, setOrdem] = useState(fase.ordem);
  const [descritivo, setDescritivo] = useState(fase.descritivo);
  const [artefatoParaAdicionar, setArtefatoParaAdicionar] = useState<Artefato | null>(null);
  const [artefatosSelecionados, setArtefatosSelecionados] = useState<Artefato[]>(fase.artefatos);
  const [artefatos, setArtefatos] = useState<Artefato[]>([]);

  useEffect(() => {
    const fetchArtefatos = async () => {
      try{
        const res = await visualizarArtefato()
        setArtefatos(res)
      }catch (error) {
        console.error('Erro ao buscar artefatos:', error)
      }
    }
    fetchArtefatos()
  }, [])
  
  const handleSalvar = () => {
    onEdit(fase.id, { nome:nome, descritivo: descritivo, artefatos: artefatosSelecionados, ordem: ordem });
    setOpen(false);
  };

  const handleAddArtefato = () => {
    if (!artefatoParaAdicionar || artefatosSelecionados.includes(artefatoParaAdicionar)) return
    setArtefatosSelecionados((prev) => [...prev, artefatoParaAdicionar])
    setArtefatoParaAdicionar(null)
  }

  const handleRemoveArtefato = (artefato: Artefato) => {
    setArtefatos((prev) => prev.filter((a) => a.id !== artefato.id))
  }

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
               <div>
              <Label>Ordem:</Label>
              <Input
                type="number"
                value={ordem}
                onChange={(e) => setOrdem(Number(e.target.value))}
                placeholder="Ordem da fase"
                className="bg-azul-escuro border text-white placeholder-gray-300"
              />
            </div>
               <div>
              <Label>Artefatos:</Label>
              <div className="flex gap-2 mt-1">
                <select
                  className="border rounded-md py-1 px-2 w-full text-black"
                  value={artefatoParaAdicionar?.nome}
                  onChange={(e) => setArtefatoParaAdicionar(artefatos.find(a => a.nome === e.target.value) || null)}
                >
                  <option value="">Selecione um artefato</option>
                  {artefatos.map((artefato) => (
                    <option key={artefato.id} value={artefato.nome}>
                      {artefato.nome}
                    </option>
                  ))}
                </select>
                <Button
                  className="bg-azul-claro hover:bg-azul-claro/70"
                  onClick={handleAddArtefato}
                >
                  Adicionar
                </Button>
              </div>

              {artefatosSelecionados.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {artefatosSelecionados.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-1 bg-azul-claro text-white rounded-full px-3 py-1"
                    >
                      <span>{a.nome}</span>
                      <button
                        onClick={() => handleRemoveArtefato(a)}
                        className="hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

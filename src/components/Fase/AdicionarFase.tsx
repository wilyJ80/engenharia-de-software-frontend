"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { X } from "lucide-react"
import { Fase } from "@/core/interface/Fase"
import { visualizarArtefato } from "@/core/service/artefatoService"

const artefatosMock = [
  "Casos de Uso",
  "Projeto Arquitetural",
  "Requisitos Funcionais",
  "Requisitos Não Funcionais",
  "Testes Unitários",
]

interface AdicionarFaseProps {
  onAdd: (fase: Omit<Fase, "id">) => void
}

export const AdicionarFase = ({ onAdd }: AdicionarFaseProps) => {
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState("")
  const [ordem, setOrdem] = useState(1)
  const [descritivo, setDescritivo] = useState("")
  const [artefatoParaAdicionar, setArtefatoParaAdicionar] = useState<Artefato | null>(null)
  const [artefatosSelecionados, setArtefatosSelecionados] = useState<Artefato[]>([])
  const [artefatos, setArtefatos] = useState<Artefato[]>([])

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
  const handleAddArtefato = () => {
    if (!artefatoParaAdicionar || artefatosSelecionados.includes(artefatoParaAdicionar)) return
    setArtefatosSelecionados((prev) => [...prev, artefatoParaAdicionar])
    setArtefatoParaAdicionar(null)
  }

  const handleRemoveArtefato = (artefato: Artefato) => {
    setArtefatosSelecionados((prev) => prev.filter((a) => a.id !== artefato.id))
  }

  const handleSalvar = () => {
    if (!nome.trim() || !descritivo.trim()) return
    onAdd({ nome, descritivo, artefatos: artefatosSelecionados, ordem })
    setOpen(false)
    setNome("")
    setDescritivo("")
    setArtefatosSelecionados([])
    setOrdem(1)
  }

  return (
    <>
      <Button
        className="bg-azul-escuro hover:bg-azul-claro text-white rounded-md"
        onClick={() => setOpen(true)}
      >
        + Fase
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
          <DialogTitle>Adicionar Fase</DialogTitle>

          <div className="flex flex-col gap-4 mt-4">
            <div>
              <Label>Nome:</Label>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome da fase"
                className="bg-azul-escuro border text-white placeholder-gray-300"
              />
            </div>

            <div>
              <Label>Descritivo:</Label>
              <Textarea
                value={descritivo}
                onChange={(e) => setDescritivo(e.target.value)}
                placeholder="Descrição da fase"
                className="bg-azul-escuro border text-white placeholder-gray-300"
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

              {artefatos.length > 0 && (
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
              className="bg-azul-claro hover:bg-azul-claro/60 mt-2 px-8"
              onClick={handleSalvar}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

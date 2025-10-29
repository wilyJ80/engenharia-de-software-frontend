"use client"

import { useState } from "react"
import { AdicionarFase } from "../../components/Fase/AdicionarFase"
import FasesTable from "../../components/Fase/FaseTable"
import { Fase } from "@/core/interface/Fase"

const fasesIniciais: Fase[] = [
  {
    id: "1",
    nome: "Planejamento de Projeto",
    descritivo: "Define os objetivos, escopo e cronograma do projeto.",
    artefatos: ["Plano de Projeto", "Termo de Abertura", "Cronograma"],
    ordem: 1,
  },
  {
    id: "2",
    nome: "Análise de Requisitos",
    descritivo: "Coleta e documentação das necessidades do cliente.",
    artefatos: ["Documento de Requisitos", "Casos de Uso", "Entrevistas"],
    ordem: 2,
  },
]

export const FaseConteudo = () => {
  const [fases, setFases] = useState<Fase[]>(fasesIniciais)

  const handleAddFase = (fase: Omit<Fase, "id" | "ordem">) => {
    const nova = {
      ...fase,
      id: String(Date.now()),
      ordem: fases.length + 1,
    }
    setFases((prev) => [...prev, nova])
  }

  const handleDeleteFase = (id: string) => {
    setFases((prev) => prev.filter((fase) => fase.id !== id))
  }

  const handleEditFase = (id: string, faseEditada: Partial<Fase>) => {
    setFases((prev) =>
      prev.map((fase) =>
        fase.id === id ? { ...fase, ...faseEditada } : fase
      )
    )
  }

  return (
    <>
      <div className="flex items-center px-8 gap-12 w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
          Cadastro de Fase de Projeto
        </h1>
        <AdicionarFase onAdd={handleAddFase} />
      </div>

      <div className="w-full flex justify-center">
        <FasesTable 
          fase={fases} 
          onDeleteFase={handleDeleteFase} 
          onEditFase={handleEditFase}
        />
      </div>
    </>
  )
}

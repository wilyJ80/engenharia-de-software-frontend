"use client"

import ArtefatoDialog from "@/components/Artefatos/ArtefatoDialog"
import ArtefatosTable from "../../components/Artefatos/ArtefatosTable"
import { useState } from "react"

type Artefato = {
  id?: number
  name: string
}

export default function artefato() {
  const [artefatos, setArtefatos] = useState<Artefato[]>([
    { id: 1, name: 'Especificação de Requisitos' },
    { id: 2, name: 'Diagrama de Caso de Uso' },
    { id: 3, name: 'Plano de Testes' },
  ])

  const handleAddArtefato = (novoArtefato: Artefato) => {
    setArtefatos([...artefatos, novoArtefato])
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho  */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
          Cadastro de Artefatos de projeto
        </h1>
        <ArtefatoDialog onAdd={handleAddArtefato} />
      </div>

      <div className="flex mx-48">
        <ArtefatosTable items={artefatos} />
      </div>
    </div>
  )
}
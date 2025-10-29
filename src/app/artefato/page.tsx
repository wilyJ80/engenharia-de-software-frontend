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

  // estado para edição (diálogo controlado)
  const [selected, setSelected] = useState<Artefato | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddArtefato = (novoArtefato: Artefato) => {
    setArtefatos(prev => [...prev, novoArtefato])
  }

  const handleEditClick = (item: Artefato) => {
    setSelected(item)
    setDialogOpen(true)
  }

  const handleSave = (item: Artefato) => {
    // se existir id atualiza, senão adiciona
    if (item.id != null) {
      setArtefatos(prev => prev.map(a => (a.id === item.id ? item : a)))
    } else {
      setArtefatos(prev => [...prev, item])
    }
    setSelected(null)
    setDialogOpen(false)
  }

  const handleRemove = (id?: number) => {
    if (id == null) return
    setArtefatos(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho  */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
          Cadastro de Artefatos de projeto
        </h1>
        {/* instância não-controlada para adicionar (possui botão interno) */}
        <ArtefatoDialog onAdd={handleAddArtefato} />
      </div>

      <div className="flex mx-48">
        <ArtefatosTable items={artefatos} onEdit={handleEditClick} onRemove={handleRemove} />
      </div>

      {/* instância controlada para edição (sem trigger) */}
      <ArtefatoDialog
        initialItem={selected ?? null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </div>
  )
}
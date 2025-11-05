"use client"

import { useEffect, useState } from "react"
import { AdicionarFase } from "./AdicionarFase"
import FasesTable from "./FaseTable"
import { Fase } from "@/core/interface/Fase"
import { createFase, deleteFase, getFases, updateFase } from "@/core/service/faseService"
import { toast } from "sonner"



export const FaseConteudo = () => {
  const [fases, setFases] = useState<Fase[] | []>([])

  useEffect(() => {
    const fetchFases = async () => {
      const data  = await getFases()
      setFases(data)
    }
    fetchFases()
  }, [])

  const handleAddFase = async (fase: Omit<Fase, "id">) => {
    const artefatosId = fase.artefatos.map((artefato) => artefato.id)
     try{
      const res = await createFase({ ...fase, artefato_ids: artefatosId })

      setFases((prev) => [...(prev || []), res])
      toast.success('Fase criada com sucesso')
     } catch (error) {
       toast.error('Erro ao criar fase')
     }
  }

  const handleDeleteFase = async (id: string) => {
    try{
      const res = await deleteFase(id)
      setFases((prev) => prev.filter((fase) => fase.id !== id))
    } catch (error) {
      console.error('Erro ao deletar fase:', error)
    }
  }

  const handleEditFase = async (id: string, faseEditada: Partial<Fase>) => {
    try{
      const res = await updateFase(id, { ...faseEditada, artefato_ids: faseEditada.artefatos?.map((artefato) => artefato.id) }) 

      setFases((prev) =>
      prev.map((fase) =>
        fase.id === id ? { ...fase, ...faseEditada } : fase
      )
    )
    } catch (error) {
      console.error('Erro ao editar fase:', error)
    }
   
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center px-8 gap-12 w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
          Cadastro de Fase de Projeto
        </h1>
        <AdicionarFase onAdd={handleAddFase} />
      </div>

      <div className="w-full flex justify-center max-h-full overflow-y-scroll">
        <FasesTable 
          fase={fases} 
          onDeleteFase={handleDeleteFase} 
          onEditFase={handleEditFase}
        />
      </div>
      </div>
  )
}

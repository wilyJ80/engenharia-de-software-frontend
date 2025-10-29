"use client"

import ArtefatoDialog from "@/components/Artefatos/ArtefatoDialog"
import ArtefatosTable from "../../../components/Artefatos/ArtefatosTable"
import { useEffect, useState } from "react"

import { toast } from 'sonner'
import { atualizarArtefato, criarArtefato, deletarArtefato, visualizarArtefato } from "@/core/service/artefatoService"

type Artefato = {
  id?: string | number
  name: string
}

export default function artefato() {

  const [artefatos, setArtefatos] = useState<Artefato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarArtefatos() {
      try {
        setLoading(true);
        const data = await visualizarArtefato();
        setArtefatos(data);
      } catch (err: any) {
        setError(err.message ?? "Erro ao carregar artefatos");
      } finally {
        setLoading(false);
      }
    }

    carregarArtefatos();
  }, []);


  // estado para edição (diálogo controlado)
  const [selected, setSelected] = useState<Artefato | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddArtefato = (novoArtefato: Artefato) => {
    // Quando o diálogo cria um novo artefato, persistir no backend
    (async () => {
      try {
        setLoading(true)
        setError(null)
        const created = await criarArtefato(novoArtefato.name)
        setArtefatos(prev => [...prev, created])
        toast.success('Artefato criado com sucesso')
      } catch (err: any) {
        setError(err.message ?? 'Erro ao criar artefato')
        toast.error(err.message ?? 'Erro ao criar artefato')
      } finally {
        setLoading(false)
      }
    })()
  }

  const handleEditClick = (item: Artefato) => {
    setSelected(item)
    setDialogOpen(true)
  }

  const handleSave = async (item: Artefato) => {
    // se existir id atualiza, senão adiciona localmente
    if (item.id != null) {
      try {
        setLoading(true)
        setError(null)
        const updated = await atualizarArtefato(item.id, item.name)
        setArtefatos(prev => prev.map(a => (a.id === updated.id ? updated : a)))
          toast.success('Artefato atualizado com sucesso')
      } catch (err: any) {
        setError(err.message ?? 'Erro ao atualizar artefato')
          toast.error(err.message ?? 'Erro ao atualizar artefato')
      } finally {
        setLoading(false)
      }
    } else {
      setArtefatos(prev => [...prev, item])
    }

    setSelected(null)
    setDialogOpen(false)
  }

  const handleRemove = (id?: string | number) => {
    if (id == null) return

    // Deletar do backend e remover localmente
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        await deletarArtefato(id)
        setArtefatos(prev => prev.filter(a => a.id !== id))
        toast.success('Artefato removido com sucesso')
      } catch (err: any) {
        setError(err.message ?? 'Erro ao deletar artefato')
        toast.error(err.message ?? 'Erro ao deletar artefato')
      } finally {
        setLoading(false)
      }
    })()
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

      {loading && (
        <div className="mx-48 text-gray-600">Carregando artefatos...</div>
      )}
      {error && <div className="mx-48 text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="flex mx-48">
          <ArtefatosTable
            items={artefatos}
            onEdit={handleEditClick}
            onRemove={handleRemove}
          />
        </div>
      )}

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
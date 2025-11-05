import { url } from "inspector"
import { Fase } from "../interface/Fase"
const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API
export const getFases = async (): Promise<Fase[]> => {
    const response = await fetch(`${urlBase}/fases/`)
    if (!response.ok) {
        throw new Error('Falha ao buscar fases')
    }
    const data = await response.json()
    return data || []
}

export const createFase = async (fase: { nome: string; descritivo: string; artefato_ids: string[] }) => {
    console.log('Criando fase com dados:', fase)
    console.log("Artefatos IDs:", fase.artefato_ids)
    const response = await fetch(`${urlBase}/fases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fase),
    })
    if (!response.ok) {
        throw new Error('Falha ao criar fase')
    }
    return response.json()
}

export const updateFase = async (id: string, fase: Partial<{ nome: string; descritivo: string; artefato_ids: string[] }>) => {
    const response = await fetch(`${urlBase}/fases/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fase),
    })
    if (!response.ok) {
        throw new Error('Falha ao atualizar fase')
    }
    return response.json()
}

export const deleteFase = async (id: string) => {
    const response = await fetch(`${urlBase}/fases/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Falha ao deletar fase')
    }
    if(response.status === 204) {
        return;
    }
    return response.json()
}
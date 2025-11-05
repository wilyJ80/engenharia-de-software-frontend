import { toast } from "sonner";
import { Fase } from "../interface/Fase";

const ulrBase = process.env.NEXT_PUBLIC_ENDERECO_API

async function getFasesService(): Promise<Fase[] | undefined> {
    try {
        const resposta = await fetch(`${ulrBase}/fases/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!resposta.ok) {
            toast.error("Erro ao carregar fases")
            return
        }

        const dados = await resposta.json();
        return dados;
    } catch(e) {
        return
    }
}

async function atualizarFaseService(id: string): Promise<Fase[] | undefined> {
    try {
        const resposta = await fetch(`${ulrBase}/fases/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!resposta.ok) {
            toast.error("Erro ao carregar fases")
            return
        }

        const dados = await resposta.json();
        return dados;
    } catch(e) {
        return
    }
}

export {
    getFasesService
}
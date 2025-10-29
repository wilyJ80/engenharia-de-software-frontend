import { Projeto } from "../interface/Projeto";

const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API


export const getProjetos = async (): Promise<Projeto[]> => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Falha ao buscar projetos');
    }
    const data = await response.json();
    return data;
};


export const createProjecto = async (data: { nome: string; descritivo: string }) => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Falha ao criar projeto');
    }
    return response.json();
}

export const updateProjeto = async (id: string, data: { nome: string; descritivo: string}) => {
    const response = await fetch(`${urlBase}/projetos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Falha ao atualizar projeto');
    }
    return response.json();
}
export const deleteProjeto = async (id: string) => {
    const response = await fetch(`${urlBase}/projetos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Falha ao deletar projeto');
    }
    if(response.status === 204) {
        return;
    }
    return response.json();
}
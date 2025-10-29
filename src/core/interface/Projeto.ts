import { StatusProjeto } from "../constants/StatusProjeto";

interface Projeto {
    id: string
    nome: string;
    descritivo: string;
    status?: StatusProjeto;
    created_at?: string;
    updated_at?: string;
}

export type { Projeto };
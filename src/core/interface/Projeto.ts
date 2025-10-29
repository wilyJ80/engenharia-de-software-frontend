import { StatusProjeto } from "../constants/StatusProjeto";

interface Projeto {
    id: string
    nome: string;
    status: StatusProjeto;
    descritivo: string;
    created_at?: string;
    updated_at?: string;
}

export type { Projeto };
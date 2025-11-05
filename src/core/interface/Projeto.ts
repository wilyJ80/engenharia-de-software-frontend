import { StatusProjeto } from "../constants/StatusProjeto";
import { Usuario } from "./Usuario";

interface Projeto {
    id: string
    nome: string;
    descritivo: string;
    status?: StatusProjeto;
    created_at?: string;
    updated_at?: string;
}

interface ProjetoComParticipantes extends Projeto {
    responsaveis_dto: Usuario[];
}
export type { Projeto, ProjetoComParticipantes };
interface Projeto {
    status: string;
    id:string
    nome: string;
    descricao: string;
    responsavel?: string;
    tempo_execucao?: string;
}

export type { Projeto };
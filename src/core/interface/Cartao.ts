export interface Cartao {
    id: string;
    status: string;
    tempo_planejado_horas: number,
    link:string,
    ciclo_id: string,
    fase_id: string,
    artefato_id: string,
    responsavel_id: string,
    created_at: string,
    updated_at: string;
}
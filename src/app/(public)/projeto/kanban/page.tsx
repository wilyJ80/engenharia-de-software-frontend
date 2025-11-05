"use client"

import { StatusProjeto } from "@/core/constants/StatusProjeto";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import ColunaStatus from "./ColunaStatus";
import { Cartao } from "@/core/interface/Cartao";
import { deleteCard, listCards, updateCard } from "@/core/service/cartao";
// NOVOS IMPORTS

export default function Kanban() {

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Estado de loading

    const statuses: StatusProjeto[] = ["a_fazer", "em_andamento", "testes_validacao", "concluido"];

    // Inicializa as colunas vazias
    const [columns, setColumns] = useState<Record<StatusProjeto, Cartao[]>>({
        a_fazer: [],
        em_andamento: [],
        testes_validacao: [],
        concluido: [],
    });

    // BUSCA OS DADOS DA API QUANDO O COMPONENTE MONTA
    useEffect(() => {
        async function fetchCards() {
            setIsLoading(true);
            const allCards = await listCards(); // Chama a API

            if (allCards) {
                // Processa a lista única de cartões e distribui nas colunas
                const newColumns: Record<StatusProjeto, Cartao[]> = {
                    a_fazer: [],
                    em_andamento: [],
                    testes_validacao: [],
                    concluido: [],
                };

                for (const card of allCards) {
                    // Garante que o status do cartão existe nas colunas
                    if (newColumns[card.status as StatusProjeto]) {
                        newColumns[card.status as StatusProjeto].push(card);
                    }
                }
                setColumns(newColumns);
            }
            setIsLoading(false);
        }

        fetchCards();
    }, []); // Array vazio garante que rode apenas uma vez

    
    // FUNÇÃO DE EDITAR ATUALIZADA (AGORA CHAMA A API)
    const handleEditCard = async (updated: Cartao) => {
        // 1. Atualização Otimista (UI atualiza antes da API)
        setColumns((prev) => {
            const newCols = { ...prev };
            const col = newCols[updated.status as StatusProjeto];
            if (!col) return prev; // Coluna não existe
            const idx = col.findIndex((c) => c.id === updated.id);
            if (idx !== -1) {
                col[idx] = updated;
            }
            return newCols;
        });
        
        // 2. Chama a API para persistir
        try {
            // Assumindo que CardUpdateDTO aceita os campos do formulário
            const updateData = {
                tempo_planejado_horas: updated.tempo_planejado_horas,
                responsavel_id: updated.responsavel_id,
                link: updated.link,
            };
            await updateCard(updated.id, updateData);
        } catch (error) {
            console.error("Falha ao atualizar o cartão:", error);
            // TODO: Reverter a atualização otimista em caso de erro
        }
    };
    
    // FUNÇÃO DE DELETAR ATUALIZADA (AGORA CHAMA A API)
    const handleDeleteCard = async (id: string) => {
        // 1. Atualização Otimista
        setColumns((prev) => {
            const newCols = {} as typeof prev;
            for (const [key, cards] of Object.entries(prev)) {
                newCols[key as StatusProjeto] = cards.filter((c) => c.id !== id);
            }
            return newCols;
        });

        // 2. Chama a API para persistir
        try {
            await deleteCard(id);
        } catch (error) {
            console.error("Falha ao deletar o cartão:", error);
            // TODO: Reverter a atualização otimista em caso de erro
        }
    };
    

    // DRAG-AND-DROP ATUALIZADO (AGORA CHAMA A API AO MOVER COLUNA)
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;
        
        const activeId = String(active.id);
        const overId = String(over.id);
        
        const activeContainer = active.data.current?.containerId as StatusProjeto | undefined;
        // O container de destino pode ser o próprio cartão (reordenar) ou a coluna
        const overContainer = over.data.current?.containerId as StatusProjeto | over.id as StatusProjeto;
        
        if (!activeContainer || !overContainer) return;
        
        // 1. Mesma coluna: reordenar (apenas local)
        if (activeContainer === overContainer) {
            setColumns((prev) => {
                const col = [...prev[activeContainer]];
                const oldIndex = col.findIndex((i) => i.id === activeId);
                const overIndex = col.findIndex((i) => i.id === overId);
                if (oldIndex === -1 || overIndex === -1) return prev;
                return {
                    ...prev,
                    [activeContainer]: arrayMove(col, oldIndex, overIndex),
                };
            });
            return;
        }
        
        // 2. Colunas diferentes: mover e persistir
        
        // Encontra o item que foi movido
        const sourceCol = columns[activeContainer];
        const activeIndex = sourceCol.findIndex((i) => i.id === activeId);
        if (activeIndex === -1) return;
        const [movedItem] = sourceCol.slice(activeIndex, activeIndex + 1);

        // Atualização otimista do estado
        setColumns((prev) => {
            const source = [...prev[activeContainer]];
            const dest = [...prev[overContainer]];
    
            const oldIndex = source.findIndex((i) => i.id === activeId);
            if (oldIndex === -1) return prev;
    
            const [moved] = source.splice(oldIndex, 1);
            moved.status = overContainer; // Atualiza o status localmente
            dest.unshift(moved); // Adiciona no topo da nova coluna
    
            return {
                ...prev,
                [activeContainer]: source,
                [overContainer]: dest,
            };
        });

        // Chama a API para persistir a mudança de status
        (async () => {
            try {
                // Envia apenas a mudança de status para a API
                await updateCard(movedItem.id, { status: overContainer });
            } catch (error) {
                console.error("Falha ao mover o cartão:", error);
                // TODO: Reverter a atualização otimista em caso de erro
            }
        })();
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    // Funções utilitárias (sem alteração)
    const formatStatus = (status: StatusProjeto | undefined): string => {
        switch (status) {
            case "a_fazer": return "A fazer";
            case "em_andamento": return "Em andamento";
            case "testes_validacao": return "Testes / validação";
            case "concluido": return "Concluído";
            default: return "";
        }
    };

    const getStatusColor = (status: StatusProjeto): string => {
        switch (status) {
            case "a_fazer": return "gray";
            case "em_andamento": return "blue";
            case "testes_validacao": return "yellow";
            case "concluido": return "darkgreen";
        }
    };

    // Renderiza um skeleton (ou msg) enquanto carrega
    if (isLoading) {
        return (
            <div className="flex justify-between h-[85%] relative gap-3 w-full p-4">
                Carregando...
            </div>
        )
    }

    return (
        <div>
            {/* ... (Restante do seu JSX do header, sem alterações) ... */}
            <div className="flex flex-col justify-between items-center gap-10">
                <div className="flex items-center justify-between w-full">
                    {/* ... (seu header) ... */}
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex justify-between h-[85%] relative gap-3 w-full">
                        {statuses.map((status) => (
                            <div className="w-full flex flex-1" key={status}>
                                <ColunaStatus
                                    categoria={[{ nome: formatStatus(status), color: getStatusColor(status) }]}
                                    status={status}
                                    cartoes={columns[status]} // Passa os cartões do estado
                                    onEdit={handleEditCard}
                                    onDelete={handleDeleteCard}
                                />
                            </div>
                        ))}
                    </div>
                </DndContext>
            </div>
        </div>
    )
}
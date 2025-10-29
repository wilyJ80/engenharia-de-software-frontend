"use client"

import { StatusProjeto } from "@/core/constants/StatusProjeto";
import { Projeto } from "@/core/interface/Projeto";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";

import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { useState } from "react";
import ColunaStatus from "./ColunaStatus";
import CartaoProjeto from "./CartaoProjeto";

export default function Kanban() {

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const [activeId, setActiveId] = useState<string | null>(null);

    const statuses: StatusProjeto[] = ["A_FAZER", "EM_ANDAMENTO", "TESTES_VALIDACAO", "CONCLUIDO"];

    const [columns, setColumns] = useState<Record<StatusProjeto, Projeto[]>>({
        A_FAZER: [],
        EM_ANDAMENTO: [],
        TESTES_VALIDACAO: [],
        CONCLUIDO: [],
    });

    const [pendingMove, setPendingMove] = useState<{
    item: Projeto
        from: StatusProjeto
        to: StatusProjeto
        overId: string | null
    } | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        const activeContainer = active.data.current?.containerId as StatusProjeto | undefined;
        const overContainer = over.data.current?.containerId as StatusProjeto | undefined;


        // if ( // Somente ADM e ANALIST podem mover de RASCUNHO -> EM CONSTRUÇÃO -> EM ANALISE
        //     (
        //         activeContainer === "PENDING" && (overContainer === "UNDER_CONSTRUCTION" || overContainer === "WAITING_FOR_REVIEW" || overContainer === "COMPLETED") ||
        //         activeContainer === "UNDER_CONSTRUCTION" && (overContainer === "PENDING" || overContainer === "WAITING_FOR_REVIEW" || overContainer === "COMPLETED") ||
        //         activeContainer === "WAITING_FOR_REVIEW" && overContainer === "PENDING"
        //     ) &&
        //     !(usuario?.access_level === "ANALYST" || usuario?.access_level === "ADMIN")
        // ) {
        //     toast.info("Você não tem permissão para mover este edital para esta coluna.");
        //     return;
        // }
// 
        // if (activeContainer === "WAITING_FOR_REVIEW" && (overContainer === "UNDER_CONSTRUCTION" || overContainer === "PENDING" || overContainer === "COMPLETED") && usuario?.access_level === "ANALYST") {
        //     toast.info("Você não tem permissão para mover este edital para esta coluna.");
        //     return;
        // }

        if (!activeContainer || !overContainer) return;

        // mesma coluna: reordenar
        if (activeContainer === overContainer) {
            setColumns((prev) => {
                const col = [...prev[activeContainer]];
                const oldIndex = col.findIndex((i) => i.id === activeId);
                const overIndex = col.findIndex((i) => i.id === overId);

                if (overIndex === -1) {
                    if (oldIndex === -1) return prev;
                    const [moved] = col.splice(oldIndex, 1);
                    col.push(moved);

                    return { ...prev, [activeContainer]: col };
                }

                if (oldIndex === -1) return prev;
                const reordered = arrayMove(col, oldIndex, overIndex);
                return { ...prev, [activeContainer]: reordered };
            });
            return;
        }

        // colunas diferentes: mover
        if (activeContainer !== overContainer) {
            const source = columns[activeContainer];
            const oldIndex = source.findIndex(i => i.id === activeId);
            if (oldIndex === -1) return;
            
            const movedItem = source[oldIndex];

            // guarda a movimentação pendente e abre o diálogo
            setPendingMove({
                item: movedItem,
                from: activeContainer,
                to: overContainer,
                overId: overId,
            });

            return; // <-- não chama setColumns aqui!
        }

    };

    // confirma a movimentação
    const confirmMove = () => {
        if (!pendingMove) return;

        setColumns(prev => {
            const source = structuredClone(prev[pendingMove.from]);
            const dest = structuredClone(prev[pendingMove.to]);

            // Sempre insere no início da lista
            const movedItem = structuredClone(pendingMove.item);
            movedItem.status = pendingMove.to;

            dest.unshift(movedItem); // <--- A diferença: sempre no topo

            return {
                ...prev,
                [pendingMove.from]: source.filter(i => i.id !== movedItem.id),
                [pendingMove.to]: dest,
            };
        });

        const move = pendingMove;
        setPendingMove(null);

        // switch (move.to) {
        //     case "PENDING":
        //         moverParaRascunho(move.item.id);
        //         break;
        //     case "UNDER_CONSTRUCTION":
        //         moverParaEmConstrucao(move.item.id);
        //         break;
        //     case "WAITING_FOR_REVIEW":
        //         moverParaEmAnalise(move.item.id);
        //         break;
        //     case "COMPLETED":
        //         moverParaConcluido(move.item.id);
        //         break;
        // }

    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    };

    const formatStatus = (status: StatusProjeto | undefined): string => {
        switch (status) {
            case "A_FAZER": return "A fazer";
            case "EM_ANDAMENTO": return "Em andamento";
            case "TESTES_VALIDACAO": return "Testes / validação";
            case "CONCLUIDO": return "Concluído";
            default: return "";
        }
    };

    const getStatusColor = (status: StatusProjeto): string => {
        switch (status) {
            case "A_FAZER": return "gray";
            case "EM_ANDAMENTO": return "blue";
            case "TESTES_VALIDACAO": return "yellow";
            case "CONCLUIDO": return "darkgreen";
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-between items-center gap-10">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <p className="text-2xl">[Kanban] Gestão de Projeto de Software - Agenda</p>
                        <p className="text-xl">Tempo planejando: 5h</p>
                        <p className="text-xl">Tempo em execução: 1h 30min</p>
                    </div>

                    <div
                        className="
                            bg-azul-escuro px-10 py-5 rounded-xl
                        "
                        style={{
                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 05)"
                        }}
                    >
                        <p className="text-white text-3xl"><strong>Ciclo</strong>: Ciclo | Propspecção versão: 1.0.0</p>
                    </div>
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
                            <SortableContext items={columns[status].map((c) => c.id)} strategy={verticalListSortingStrategy}>
                                {
                                    
                                    status !== "A_FAZER" && !status[status.length] && (
                                        <div className="h-5 w-1 bg-black"/>
                                    )
                                }
                                <ColunaStatus
                                    categoria={[{ nome: formatStatus(status), color: getStatusColor(status) }]}
                                    status={status}
                                    editais={columns[status]}
                                />

                            </SortableContext>
                        </div>
                    ))}
                </div>
                </DndContext>
            </div>
        </div>
    )
}
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
import { Ciclo } from "@/core/interface/Ciclo";
import { Cartao } from "@/core/interface/Cartao";

export default function Kanban() {

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const [activeId, setActiveId] = useState<string | null>(null);

    const [card, setCard] = useState<Cartao[] | undefined>([])

    const statuses: StatusProjeto[] = ["a_fazer", "em_andamento", "testes_validacao", "concluido"];

    const [columns, setColumns] = useState<Record<StatusProjeto, Cartao[]>>({
        a_fazer: [
            {
                id: "1",
                projeto_id: "proj-001",
                status: "a_fazer",
                tempo_planejado_horas: 2,
                link: "#",
                ciclo_id: "ciclo-001",
                fase_id: "fase-001",
                artefato_id: "artefato-001",
                responsavel_id: "user-001",
                created_at: "2025-11-01T10:00:00Z",
                updated_at: "2025-11-01T10:00:00Z",
            },
            {
                id: "2",
                projeto_id: "proj-002",
                status: "a_fazer",
                tempo_planejado_horas: 4,
                link: "#",
                ciclo_id: "ciclo-001",
                fase_id: "fase-002",
                artefato_id: "artefato-002",
                responsavel_id: "user-002",
                created_at: "2025-11-02T08:00:00Z",
                updated_at: "2025-11-02T08:00:00Z",
            },
        ],
        em_andamento: [
            {
                id: "3",
                projeto_id: "proj-003",
                status: "em_andamento",
                tempo_planejado_horas: 3,
                link: "#",
                ciclo_id: "ciclo-001",
                fase_id: "fase-003",
                artefato_id: "artefato-003",
                responsavel_id: "user-003",
                created_at: "2025-11-03T09:00:00Z",
                updated_at: "2025-11-04T12:00:00Z",
            },
        ],
        testes_validacao: [],
        concluido: [
            {
                id: "4",
                projeto_id: "proj-004",
                status: "concluido",
                tempo_planejado_horas: 1,
                link: "#",
                ciclo_id: "ciclo-001",
                fase_id: "fase-004",
                artefato_id: "artefato-004",
                responsavel_id: "user-004",
                created_at: "2025-11-01T07:00:00Z",
                updated_at: "2025-11-01T09:00:00Z",
            },
        ],
    });
    
    const handleEditCard = (updated: Cartao) => {
        setColumns((prev) => {
          const newCols = { ...prev };
          const col = newCols[updated.status as StatusProjeto];
          const idx = col.findIndex((c) => c.id === updated.id);
          if (idx !== -1) {
            col[idx] = updated;
          }
          return newCols;
        });
      };
      
      const handleDeleteCard = (id: string) => {
        setColumns((prev) => {
          const newCols = {} as typeof prev;
          for (const [key, cards] of Object.entries(prev)) {
            newCols[key as StatusProjeto] = cards.filter((c) => c.id !== id);
          }
          return newCols;
        });
      };
      

    
    const [pendingMove, setPendingMove] = useState<{
    item: Cartao
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
      
        console.log("ativou o container:", activeContainer, "over Container:", overContainer);
      
        if (!activeContainer || !overContainer) return;
      
        // Mesma coluna: reorder
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
      
        // Colunas diferentes: mover
        setColumns((prev) => {
          const source = [...prev[activeContainer]];
          const dest = [...prev[overContainer]];
      
          const oldIndex = source.findIndex((i) => i.id === activeId);
          if (oldIndex === -1) return prev;
      
          const [moved] = source.splice(oldIndex, 1);
          moved.status = overContainer;
          dest.unshift(moved);
      
          return {
            ...prev,
            [activeContainer]: source,
            [overContainer]: dest,
          };
        });
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
                            {/* Cada coluna é droppable */}
                            <ColunaStatus
                            categoria={[{ nome: formatStatus(status), color: getStatusColor(status) }]}
                            status={status}
                            cartoes={columns[status]}
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
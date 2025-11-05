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

import { useEffect, useState } from "react";
import ColunaStatus from "./ColunaStatus";
import { Ciclo } from "@/core/interface/Ciclo";
import { Cartao } from "@/core/interface/Cartao";
import { getCartoesPorIdCiclo, mudarStatusCard } from "@/core/service/cartao";
import { visualizarCiclo } from "@/core/service/cicloService";
import { useParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectItemText } from "@radix-ui/react-select";
import { toast } from "sonner";

export default function Kanban({ projetoId }: { projetoId: string }) {

    const idProjeto = projetoId;

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
    const [activeId, setActiveId] = useState<string | null>(null);

    const statuses: StatusProjeto[] = ["a_fazer", "em_andamento", "testes_validacao", "concluido"];

    const [columns, setColumns] = useState<Record<StatusProjeto, Cartao[]>>({
        a_fazer: [],
        em_andamento: [],
        testes_validacao: [],
        concluido: [],
    });

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


        if (!activeContainer || !overContainer) return;

        // mesma coluna: reordenar
        if (activeContainer === overContainer) {
            setColumns((prev) => {
                const col = [...prev[activeContainer]];
                const oldIndex = col.findIndex((i) => String(i.id) === activeId);
                const overIndex = col.findIndex((i) => String(i.id) === overId);

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

        // colunas diferentes: mover (mover imediatamente)
        if (activeContainer !== overContainer) {
        setColumns(prev => {
            const source = [...prev[activeContainer]];
            const dest = [...prev[overContainer]];

            const oldIndex = source.findIndex(i => String(i.id) === activeId);
            if (oldIndex === -1) return prev;

            // remover do source
            const [movedItem] = source.splice(oldIndex, 1);

            // ajustar status do item movido
            const moved = { ...movedItem, status: overContainer };

            // opcional: inserir no começo
            dest.unshift(moved);

            const resposta = mudarStatus(movedItem.id, overContainer.toString());

            if (!resposta) {
                toast.error('Erro ao mudar status');
                return prev;
            }

            toast.success('Status alterado com sucesso');

            // se quiser inserir na posição do overId em vez do começo:
            // const overIndexInDest = dest.findIndex(i => String(i.id) === overId);
            // if (overIndexInDest === -1) dest.unshift(moved); else dest.splice(overIndexInDest, 0, moved);

            return {
            ...prev,
            [activeContainer]: source,
            [overContainer]: dest,
            };
        });

        // limpa state relacionado ao drag
        setPendingMove(null);
        return;
        }

    };

    async function mudarStatus(idCartao: string, status: string) {
        const respostaStatus = await mudarStatusCard(idCartao, status);
        const resposta = respostaStatus
        return resposta
    }

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

    const findItem = (id: string) => {
        for (const s of statuses) {
            const found = columns[s].find((c) => String(c.id) === id);
            if (found) return found;
        }
        return undefined;
    };

    const getStatusColor = (status: StatusProjeto): string => {
        switch (status) {
            case "a_fazer": return "gray";
            case "em_andamento": return "blue";
            case "testes_validacao": return "yellow";
            case "concluido": return "darkgreen";
        }
    };

    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [cartoes, setCartoes] = useState<Cartao[]>([]);
    
    async function buscarCiclos() {
        const resposta = await visualizarCiclo(idProjeto);
        setCiclos(resposta);
        await getCartoes(resposta[0].id);
    }

    async function getCartoes(idCiclo: string) {
        const resposta = await getCartoesPorIdCiclo(idCiclo);
        setCartoes(resposta);

        const novasColunas: Record<StatusProjeto, Cartao[]> = {
            "a_fazer": [],
            "em_andamento": [],
            "testes_validacao": [],
            "concluido": [],
        };

        resposta.forEach((cartao: Cartao) => {
            if (cartao.status === "a_fazer") {
                novasColunas["a_fazer"].push(cartao);
            } else if (cartao.status === "em_andamento") {
                novasColunas["em_andamento"].push(cartao);
            } else if (cartao.status === "testes_validacao") {
                novasColunas["testes_validacao"].push(cartao);
            } else if (cartao.status === "concluido") {
                novasColunas["concluido"].push(cartao);
            }
        });

        setColumns(novasColunas);
    }

    useEffect(() => {
        buscarCiclos();
    }, [])

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
                        <div className="text-white text-3xl flex items-center gap-2">
                            <strong>Ciclo</strong>: 
                            <Select
                                onValueChange={
                                    (value) => {
                                        getCartoes(value);
                                    }
                                }
                            >
                                <SelectTrigger className="bg-white text-black">
                                    <SelectValue placeholder="Selecione um ciclo" />
                                </SelectTrigger>

                                <SelectContent className="">
                                    {
                                        ciclos.map((ciclo) => (
                                            <SelectItem className="" key={ciclo.id} value={ciclo.id}>
                                                {ciclo.nome}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
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
                                <SortableContext items={columns[status].map((c) => String(c.id))} strategy={verticalListSortingStrategy}>
                                    <ColunaStatus
                                        categoria={[{ nome: formatStatus(status), color: getStatusColor(status) }]}
                                        status={status}
                                        cartoes={columns[status]}
                                    />

                                </SortableContext>
                            </div>
                        ))}
                    </div>

                    <DragOverlay>
                    {activeId ? (
                        <div className="bg-white p-3 rounded shadow-l teste2">
                            {(() => {
                                const item = findItem(activeId);
                                if (!item) return null;
                                return (
                                    <>
                                        <div className="h-16 bg-gray-200 rounded-sm mb-2" />

                                        <div>
                                            <h3 className="font-semibold">{item.descricao}</h3>
                                            <p className="text-sm text-gray-600">Data: {item.created_at}</p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    ) : null}
                </DragOverlay>
                </DndContext>
            </div>
        </div>
    )
}
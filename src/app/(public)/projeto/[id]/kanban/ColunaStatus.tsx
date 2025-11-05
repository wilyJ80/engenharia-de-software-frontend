"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { StatusProjeto } from "@/core/constants/StatusProjeto";
import CartaoProjeto from "./CartaoProjeto";
import { Cartao } from "@/core/interface/Cartao";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


export interface Categoria {
    nome: string;
    color: string;
}

interface Props {
    status: StatusProjeto;
    categoria: Categoria[];
    cartoes: Cartao[];
}

export default function ColunaStatus({ status, categoria, cartoes }: Props) {
    const { setNodeRef } = useDroppable({
        id: status,
        data: { containerId: status },
    });

    return (
        <div ref={setNodeRef} className="w-full flex flex-col max-h-full gap-2 pt-2 px-1 bg-zinc-300 p-2 rounded-xl">
            {/* Cabeçalho */}
            <div className="flex justify-between mx-2 mt-2 items-center mb-2">
                <div className="flex items-center gap-2">
                    {categoria.map((c) => (
                        <div key={c.nome} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: c.color }} />
                            <span className="text-xl">{c.nome}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center w-6 h-6 bg-black rounded-full">
                    <span className="font-semibold text-white text-md">{cartoes.length}</span>
                </div>
            </div>

            {/* Lista de Cartões */}
            <SortableContext items={cartoes.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 overflow-y-auto px-1 scrollbar-style pb-1">
                    {cartoes.map((c) => (
                        <CartaoProjeto
                            key={String(c.id)}
                            cartao={c}
                            containerId={status}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
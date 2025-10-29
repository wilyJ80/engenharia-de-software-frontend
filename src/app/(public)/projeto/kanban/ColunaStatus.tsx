"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";
// import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { StatusProjeto } from "@/core/constants/StatusProjeto";
import { Projeto } from "@/core/interface/Projeto";
import CartaoProjeto from "./CartaoProjeto";

export interface Categoria {
  nome: string;
  color: string;
}

interface Props {
  status: StatusProjeto;
  categoria: Categoria[];
  editais: Projeto[];
}

// const getStatusColor = (status: StatusProjeto): string => {
//   switch (status) {
//       case "PENDING": return "#99A1AF";
//       case "UNDER_CONSTRUCTION": return "red";
//       case "WAITING_FOR_REVIEW": return "#656149";
//       case "COMPLETED": return "darkgreen";
//   }
// };


export default function ColunaStatus({ status, categoria, editais }: Props) {
  // Droppable container com data.containerId = status
  const { setNodeRef } = useDroppable({
    id: status,
    data: { containerId: status },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full flex flex-col max-h-full gap-2 pt-2 px-1 rounded-2xl"
    >
      <div
        className="flex justify-between mx-2 mt-2 items-center mb-2"
      >
        <div className="flex items-center gap-2">
          {categoria.map((c) => (
            <div key={c.nome} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: c.color }} />
              <span className="text-xl">{c.nome}</span>
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-center w-6 h-6 bg-black rounded-full`}>
          <span className="font-semibold text-white text-md">{editais.length}</span>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto px-[4px] scrollbar-style pb-1">
          {editais.map((edital) => (
            // PASSA containerId para o cartão (necessário para usar data.containerId no useSortable)
            <CartaoProjeto projeto={edital} containerId={status} />
          ))}
      </div>
    </div>
  );
}
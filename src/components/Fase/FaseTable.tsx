"use client";

import React from "react";
import { Fase } from "@/core/interface/Fase";
import { EditarFase } from "./EditarFaseDialog";
import { RemoverFase } from "./RemoverFaseDialog";

interface FaseProps {
  fase: Fase[];
  onDeleteFase: (id: string) => void;
  onEditFase: (id: string, faseEditada: Partial<Fase>) => void

}

export default function FasesTable({ fase, onDeleteFase, onEditFase }: FaseProps) {
  return (
    <div className="w-4/5 overflow-x-auto mt-6">
      <table className="min-w-full border-separate border-spacing-1">
        <thead className="bg-azul-escuro text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Descritivo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Artefatos
            </th>
            <th className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Ordem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {fase.map((item, idx) => {
            const rowBg =
              idx % 2 === 0
                ? "bg-cinza-escuro text-gray-800"
                : "bg-cinza-claro text-gray-800";

            return (
              <tr key={item.id} className={rowBg}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nome}</td>
                <td className="px-6 py-4 text-sm">{item.descritivo}</td>
                <td className="px-6 text-sm">{item.artefatos.join(", ")}</td>
                <td className="px-2 py-4 text-center text-sm">{item.ordem}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <EditarFase fase={item} onEdit={onEditFase} />
                    <RemoverFase fase={item} onRemove={onDeleteFase} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

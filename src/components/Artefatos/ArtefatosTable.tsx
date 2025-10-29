"use client"

import React from 'react'

type Artefato = {
  id?: string | number
  name: string
}

export default function ArtefatosTable({ items, onEdit, onRemove }: { items: Artefato[]; onEdit?: (item: Artefato) => void; onRemove?: (id?: string | number) => void; }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-1">
        <thead className="bg-azul-escuro text-white">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0
            const rowBg = isEven ? 'bg-cinza-escuro text-gray-800' : 'bg-cinza-claro text-gray-800'
            return (
              <tr key={item.id} className={`${rowBg}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm bg-azul-escuro text-white rounded"
                      onClick={() => onEdit?.(item)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                      onClick={() => onRemove?.(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

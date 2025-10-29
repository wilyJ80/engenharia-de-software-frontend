"use client"

import React from 'react'

type Artefato = {
  id: string
  nome: string
}

export default function ArtefatosTable({ items }: { items: Artefato[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full">
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
            const rowBg = isEven ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-800'
            return (
              <tr key={item.id} className={`${rowBg}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm bg-azul-escuro text-white rounded"
                      onClick={() => {
                        // mock action
                        alert(`Editar: ${item.nome}`)
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                      onClick={() => {
                        // mock action
                        alert(`Remover: ${item.nome}`)
                      }}
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

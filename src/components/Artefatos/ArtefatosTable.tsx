"use client"

import React from 'react'

type Artefato = {
  id: string
  nome: string
}

export default function ArtefatosTable({ items }: { items: Artefato[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ação
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
          ))}
        </tbody>
      </table>
    </div>
  )
}

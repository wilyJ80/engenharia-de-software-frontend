"use client";

import { useState } from "react";
import CicloDialog from "@/components/Ciclos/CicloDialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Edit, Settings, Trash } from "lucide-react";

const initialCiclos = [
  { id: 1, name: "Ciclo I - Prospecção", versao: "v1.0" },
  { id: 2, name: "Ciclo II - Elaboração", versao: "v1.1" },
  { id: 3, name: "Ciclo III - Sprint III", versao: "v1.0" },
  { id: 4, name: "Ciclo IV - Sprint II", versao: "v2.0" },
  { id: 5, name: "Ciclo V - Sprint IV", versao: "v1.2" },
];

export default function Ciclos() {
  const [ciclos, setCiclos] = useState(initialCiclos);
  const [editOpen, setEditOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<null | { id: number; name: string; versao: string }>(null);

  const handleAdd = (item: { name: string; versao: string }) => {
    const withId = { ...(item as any), id: Date.now() };
    setCiclos((prev) => [...prev, withId]);
  };

  const handleEditClick = (item: { id?: number; name: string; versao: string }) => {
    if (!item.id) return;
    setItemToEdit({ id: item.id, name: item.name, versao: item.versao });
    setEditOpen(true);
  };

  const handleSaveEdit = (item: { id?: number; name: string; versao: string }) => {
    if (!item.id) return;
    setCiclos((prev) => prev.map((c) => (c.id === item.id ? { ...c, name: item.name, versao: item.versao } : c)));
    setItemToEdit(null);
    setEditOpen(false);
  };

  const handleConfirmDelete = (id: number) => {
    setCiclos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho  */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
            Gestão Projeto de Software - Agenda
        </h1>
        <CicloDialog />
      </div>

      {/* Cards dos ciclos */}
      <div className="flex flex-wrap gap-6">
        {ciclos.map((ciclo) => (
          <Card key={ciclo.id} className="w-64 bg-azul-escuro text-white">
            <CardHeader>
              <CardTitle>{ciclo.name}</CardTitle>
              <CardDescription>{ciclo.versao}</CardDescription>
            </CardHeader>

            <CardFooter>
              <div className="flex gap-2 justify-end w-full">
                <button className="p-1 cursor-pointer">
                  <Settings size={18} />
                </button>
                <button className="p-1 cursor-pointer" onClick={() => handleEditClick(ciclo as any)}>
                  <Edit size={18} />
                </button>

                <ConfirmDialog
                  title="Excluir ciclo"
                  description={`Tem certeza que deseja excluir '${ciclo.name}'?`}
                  onConfirm={() => handleConfirmDelete(ciclo.id as number)}
                >
                  <button className="p-1 cursor-pointer">
                    <Trash size={18} />
                  </button>
                </ConfirmDialog>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Dialog de edição controlado pelo pai */}
      <CicloDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialItem={itemToEdit ?? undefined}
        onSave={handleSaveEdit}
      />

      
    </div>
  );
}

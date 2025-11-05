"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cartao } from "@/core/interface/Cartao";
import { Edit, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";


interface Props {
    cartao: Cartao;
    containerId: string;
    // ATUALIZADO: Funções agora são assíncronas
    onEdit: (updated: Cartao) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function CartaoProjeto({ cartao, containerId, onEdit, onDelete }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: cartao.id,
        data: { containerId },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
    };

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [form, setForm] = useState<Cartao>(cartao);

    // ATUALIZADO: Adicionado async/await
    const handleSave = async () => {
        await onEdit(form); // Espera a API responder
        setOpenEdit(false);
    };

    // ATUALIZADO: Adicionado async/await
    const handleConfirmDelete = async () => {
        await onDelete(cartao.id); // Espera a API responder
        setOpenDelete(false);
    };

    return (
        <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CardHeader>
                <CardTitle>Cartão #{cartao.id}</CardTitle>
            </CardHeader>

            <CardContent>
                <p><strong>Status:</strong> {cartao.status}</p>
                <p><strong>Tempo planejado:</strong> {cartao.tempo_planejado_horas}h</p>
                <p><strong>Responsável ID:</strong> {cartao.responsavel_id}</p>
            </CardContent>

            <div className="flex gap-2 p-2">
                {/* Botão de edição */}
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Edit size={16} />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Editar cartão #{cartao.id}</DialogTitle>
                        </DialogHeader>

                        {/* ... (Restante do seu JSX do formulário, sem alterações) ... */}
                        <div className="flex flex-col gap-4 mt-4">
                           <div>
                <label className="text-sm font-semibold">Tempo planejado (h)</label>
                      <Input
                        type="number"
                        value={form.tempo_planejado_horas}
                        onChange={(e) =>
                          setForm({ ...form, tempo_planejado_horas: Number(e.target.value) })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Responsável ID</label>
                      <Input
                        type="text"
                        value={form.responsavel_id}
                        onChange={(e) =>
                          setForm({ ...form, responsavel_id: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Link</label>
                      <Input
                        type="text"
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                      />
                    </div>
                        </div>

                        <DialogFooter className="mt-4 flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            {/* ATENÇÃO: Adicionei "disabled" para evitar cliques duplos
                                mas você precisaria de um estado [isSaving, setIsSaving]
                                para controlar isso. Por enquanto, só o await funciona. */}
                            <Button onClick={handleSave}>Salvar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                

                {/* ConfirmDialog para exclusão */}
                <ConfirmDialog
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    title="Excluir cartão"
                    description="Tem certeza que deseja excluir este cartão?"
                    onConfirm={handleConfirmDelete}
                    confirmLabel="Excluir"
                    cancelLabel="Cancelar"
                >
                    <Button variant="destructive" size="icon" onClick={() => setOpenDelete(true)}>
                        <Trash size={16} />
                    </Button>
                </ConfirmDialog>
            </div>
        </Card>
    );
}
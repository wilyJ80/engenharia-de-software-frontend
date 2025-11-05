"use client";

export const runtime = 'edge'

import { useState, useEffect } from "react";
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
import { toast } from 'sonner'
import { atualizarCiclo, criarCiclo, deletarCiclo, visualizarCiclo } from "@/core/service/cicloService";
import { useParams } from "next/navigation";

type Ciclo = {
	id?: string;
	name: string;
	versao: string;
	projeto_id?: string;
};

export default function ciclo() {
	const [ciclos, setCiclos] = useState<Ciclo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editOpen, setEditOpen] = useState(false);
	const [itemToEdit, setItemToEdit] = useState<Ciclo | null>(null);
	const id = useParams().id;
	// Carregar ciclos ao montar
	useEffect(() => {
		async function carregarCiclos() {
			try {
				setLoading(true);
				const data = await visualizarCiclo(String(id));
				setCiclos(data);
			} catch (err: any) {
				setError(err.message ?? "Erro ao carregar ciclos");
			} finally {
				setLoading(false);
			}
		}

		carregarCiclos();
	}, []);

	const handleAdd = async (item: Ciclo) => {
		try {
			setLoading(true);
			setError(null);
			const created = await criarCiclo({
				nome: item.name,
				versao: item.versao,
				projeto_id: String(id),
			});
			setCiclos((prev) => [...prev, created]);
			toast.success('Ciclo criado com sucesso')
		} catch (err: any) {
			setError(err.message ?? "Erro ao criar ciclo");
			toast.error(err.message ?? 'Erro ao criar ciclo')
		} finally {
			setLoading(false);
		}
	};

	const handleEditClick = (item: Ciclo) => {
		if (!item.id) return;
		setItemToEdit(item);
		setEditOpen(true);
	};

	const handleSaveEdit = async (item: Ciclo) => {
		if (!item.id) return;

		try {
			setLoading(true);
			setError(null);
			const updated = await atualizarCiclo(item.id, {
				nome: item.name,
				versao: item.versao,
				projeto_id: String(id),
			});
			setCiclos((prev) =>
				prev.map((c) => (c.id === updated.id ? updated : c))
			);
			setItemToEdit(null);
			setEditOpen(false);
			toast.success('Ciclo atualizado com sucesso')
		} catch (err: any) {
			setError(err.message ?? "Erro ao atualizar ciclo");
			toast.error(err.message ?? 'Erro ao atualizar ciclo')
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmDelete = async (id?: string) => {
		if (!id) return;

		try {
			setLoading(true);
			setError(null);
			await deletarCiclo(id);
			setCiclos((prev) => prev.filter((c) => c.id !== id));
			toast.success('Ciclo removido com sucesso')
		} catch (err: any) {
			setError(err.message ?? "Erro ao deletar ciclo");
			toast.error(err.message ?? 'Erro ao deletar ciclo')
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Cabeçalho  */}
			<div className="flex justify-between items-center w-full">
				<h1 className="text-lg font-semibold text-azul-escuro">
					Gestão Projeto de Software - Agenda
				</h1>
				<CicloDialog onAdd={handleAdd} />
			</div>

			{loading && (
				<div className="text-gray-600">Carregando ciclos...</div>
			)}
			{error && <div className="text-red-600">{error}</div>}

			{/* Cards dos ciclos */}
			{!loading && !error && (
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
									<button className="p-1 cursor-pointer" onClick={() => handleEditClick(ciclo)}>
										<Edit size={18} />
									</button>

									<ConfirmDialog
										title="Excluir ciclo"
										description={`Tem certeza que deseja excluir '${ciclo.name}'?`}
										onConfirm={() => handleConfirmDelete(ciclo.id)}
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
			)}

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

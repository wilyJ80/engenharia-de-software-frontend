'use client'

import { useEffect, useState } from "react"
import { AdicionarProjeto } from "./adicionarProjeto"
import { CardProjeto } from "./cardProjeto"
import { Projeto } from "@/core/interface/Projeto"
import { StatusProjeto } from "@/core/constants/StatusProjeto"
import { createProjecto, deleteProjeto, getProjetos, updateProjeto } from "@/core/service/ProjetoService"
import { toast } from "sonner"

export const ConteudoProjeto = () => {
    const [projetos, setProjetos] = useState<Projeto[] | []>([]);
       useEffect(() => {
           const fetchProjetos = async () => {
               try {
                   const response = await getProjetos(); 
                   setProjetos(response);
               } catch (error) {
                   console.error("Erro ao buscar projetos:", error);
               }
           };
           fetchProjetos();
       }, []);

    const handleAddProjeto = async (novoProjeto: Omit<Projeto, "status">) => {
        try {
            const res = await createProjecto(novoProjeto);
            setProjetos([...projetos, { ...res, status: "em_andamento" }]);
            toast.success("Projeto adicionado com sucesso");
        } catch (error) {
            toast.error("Erro ao adicionar projeto");
        }
    }

    const handleRemoveProjeto = async (idProjeto: string) => {
        try{
            await deleteProjeto(idProjeto);
            setProjetos(projetos.filter(projeto => projeto.id !== idProjeto));
            toast.success("Projeto removido com sucesso");
        } catch (error) {
            toast.error("Erro ao remover projeto");
        }
    }

    const handleEditProjeto = async (projetoEditado: Projeto) => {
        try {
            const res = await updateProjeto(projetoEditado.id, projetoEditado);
            setProjetos(projetos.map(projeto => 
                projeto.id === projetoEditado.id ? res : projeto
            ));
        } catch (error) {
            console.error("Erro ao editar projeto:", error);
        }
    }
    return (
        <div>
        <div className="flex flex-col gap-8 w-full p-2 ">
                    <h2 className="text-xl underline underline-offset-6 decoration-azul-escuro">Gestão Projeto de Software Super Ágil</h2>
                    <AdicionarProjeto onAddProjeto={handleAddProjeto} />
                    </div>
                    <div>
                        <div className="flex w-full flex-wrap gap-4">
                        {projetos.map((projeto, index) => (
                            <CardProjeto
                                        key={index}
                                        projeto={projeto}
                                        onRemove={handleRemoveProjeto}
                                        onEdit={handleEditProjeto}
                                        />
                        ))}
        </div>
                    </div>
        </div> 
    )
}           
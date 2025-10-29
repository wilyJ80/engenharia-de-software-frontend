'use client'

import { useState } from "react"
import { AdicionarProjeto } from "./adicionarProjeto"
import { CardProjeto } from "./cardProjeto"
import { Projeto } from "@/core/interface/Projeto"


export const ConteudoProjeto = () => {
    const [projetos, setProjetos] = useState([
    {
        id: "1",
        nome: "Projeto A",
        descritivo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    },
    {
        id: "2",
        nome: "Projeto B",
        descritivo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    },
    {
        id: "3",
        nome: "Projeto C",
        descritivo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        id: "4",
        nome: "Projeto D",
        descritivo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        id: "5",
        nome: "Projeto E",
        descritivo: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    }  
])

    const handleAddProjeto = (novoProjeto: Projeto) => {
        console.log("Adicionando novo projeto:", novoProjeto);
        setProjetos([...projetos, novoProjeto]);
    }

    const handleRemoveProjeto = (idProjeto: string) => {
        console.log("Removendo projeto:", idProjeto);
        setProjetos(projetos.filter(projeto => projeto.id !== idProjeto));
    }

    const handleEditProjeto = (projetoEditado: Projeto) => {
        console.log("Editando projeto:", projetoEditado.nome);
        setProjetos(projetos.map(projeto => 
            projeto.id === projetoEditado.id ? projetoEditado : projeto
        ));
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
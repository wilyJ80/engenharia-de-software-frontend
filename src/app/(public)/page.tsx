
"use client"; 
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Projeto } from '@/core/interface/Projeto';
import { getProjetos } from '@/core/service/ProjetoService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; 

export default function Inicio() {
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
        
    

    return (
        <div className="min-h-screen bg-white">
            
            
            <div className="flex justify-end p-4 mx-auto max-w-4xl pt-8">
                <Link
                    href={"/login"}
                    className="px-4 py-2 bg-azul-escuro text-white rounded-md hover:bg-azul-claro transition duration-150"
                    onClick={() => console.log("Fazer Login")}
                >
                    + Fazer Login
                </Link>
            </div>

        
            <h1 className="text-2xl font-bold text-center mt-8 mb-12">
                Gestão Projeto de Software Super Ágil
            </h1>

            
            <div className="bg-azul-escuro p-8 mx-auto max-w-4xl rounded-lg shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                  
                    {projetos.map((project) => (
                        <Card 
                            key={project.id} 
                            
                            className="bg-white text-black shadow-xl rounded-lg p-6 flex flex-col justify-between h-full"
                        >
                           
                            <div> 
                                <CardTitle className="text-xl font-semibold mb-2 text-black">
                                    {project.nome}
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-700 min-h-10 leading-snug">
                                    {project.descritivo}
                                </CardDescription>
                            </div>
                            
                        
                            <div className="mt-4 pt-2">
                                <Button asChild
                                    onClick={() => console.log(`Entrar no projeto: ${project.nome}`)}
                                >
                                    <Link href={`/projeto/${project.id}/ciclo`}>
                                    Entrar
                                    </Link>
                                </Button>
                            </div>
                        </Card> 
                    ))}
                </div>
            </div>
            
        </div>
    );
}
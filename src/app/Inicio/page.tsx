
"use client"; 
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import React from 'react'; 

export default function Inicio() {
    
    // --- 1. DEFINIÇÃO DA ESTRUTURA DE DADOS ---
    const projects = [
      {
        id: 1,
        title: "Projeto Agenda",
        description: "teste 1",
      },
      {
        id: 2,
        title: "Projeto Xpto",
        description: "2",
      },
      {
        id: 3,
        title: "Novo Projeto Teste",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 4,
        title: "quarto card",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e dolore magna aliqua.",
      },
    ];


    return (
        <div className="min-h-screen bg-white">
            
            
            <div className="flex justify-end p-4 mx-auto max-w-4xl pt-8">
                <button 
                    className="px-4 py-2 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition duration-150"
                    onClick={() => console.log("Fazer Login")}
                >
                    + Fazer Login
                </button>
            </div>

        
            <h1 className="text-2xl font-bold text-center mt-8 mb-12">
                Gestão Projeto de Software Super Ágil
            </h1>

            
            <div className="bg-blue-900 p-8 mx-auto max-w-4xl rounded-lg shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                  
                    {projects.map((project) => (
                        <Card 
                            key={project.id} 
                            
                            className="bg-white text-black shadow-xl rounded-lg p-6 flex flex-col justify-between h-full"
                        >
                           
                            <div> 
                                <CardTitle className="text-xl font-semibold mb-2 text-black">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-700 min-h-10 leading-snug">
                                    {project.description}
                                </CardDescription>
                            </div>
                            
                        
                            <div className="mt-4 pt-2">
                                <button
                                    className="bg-sky-500 hover:bg-sky-700 text-white px-3 py-1 rounded-md text-sm font-semibold transition duration-150"
                                    onClick={() => console.log(`Entrar no projeto: ${project.title}`)}
                                >
                                    Entrar
                                </button>
                            </div>
                        </Card> 
                    ))}
                </div>
            </div>
            
        </div>
    );
}
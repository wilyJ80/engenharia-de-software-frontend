import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function GestaoDeProjetos() {
    const etapas = ["Prospecção", "Análise", "Projeto", "Implementação", "Testes", "Implantação"];

    const tarefas: Record<string, { titulo: string; responsavel: string }[]> = {
        "Prospecção": [
            { titulo: "Proposta Executiva [1h]", responsavel: "Pedro Silva" }
        ],
        "Análise": [
            { titulo: "Requisitos [2h]", responsavel: "João Silva" }
        ],
        "Projeto": [
            { titulo: "Projeto Arquitetural [2h]", responsavel: "João Silva" }
        ],
        "Implementação": [],
        "Testes": [],
        "Implantação": []
    };

    const usuarios = [
        { id: 1, name: "Pedro Silva" },
        { id: 2, name: "João Silva" },
        { id: 3, name: "Maria Silva" },
    ];

    const artefatos = [
        { id: 1, nome: "Artefato 1" },
        { id: 2, nome: "Artefato 2"}
    ]

    return (
        <div className="w-full flex flex-col gap-10">
            <div className="flex justify-between items-center">
                <p className="text-3xl font-semibold">[Gerir] Gestão Projeto de Software - Agenda</p>
                <div className="flex items-center gap-3">
                    <p className="text-white text-xl bg-blue-900 rounded-xl px-8 py-4 shadow">
                        <strong>Ciclo</strong>: Prospecção | Versão: 1.0.0
                    </p>
                    <Button className="text-xl px-8 py-4 rounded-xl">
                        Sair
                    </Button>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button title="Novo artefato" className="flex items-center gap-2 rounded-lg w-fit self-end  px-5 py-2 ">
                        <Plus size={19} />
                        <span className="text-lg">Artefato</span>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <form className="flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            <Label>Fase:</Label>
                            <Input />
                        </div>

                        <div className="flex items-center gap-2 w-full">
                            <div className="flex flex-col gap-2 w-1/2">
                                <Label>Artefato:</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Artefato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {artefatos.map((art) => (
                                            <SelectItem key={art.id} value={art.nome}>
                                                {art.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-1/2">
                                <Label>Responsável:</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {usuarios.map((user) => (
                                            <SelectItem key={user.id} value={user.name}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Tempo de execução:</Label>
                            <Input />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Link:</Label>
                            <Input />
                        </div>

                        <Button className=" w-full rounded-md py-3 hover:cursor-pointer">Salvar</Button>

                    </form>
                </DialogContent>
            </Dialog>


            <div className="grid grid-cols-6 border-gray-700">
                {etapas.map((etapa, idx) => (
                    <div
                        key={idx}
                        className={`flex flex-col items-center gap-3 border-r ${idx === etapas.length - 1 && "border-r-0"} border-gray-700 min-h-[400px]`}
                    >
                        <div className={`w-full text-center text-3xl border-b border-gray-700 py-3 font-semibold`}>
                            {etapa}
                        </div>

                        <div className="flex flex-col items-center gap-3 py-4 w-[90%]">
                            {tarefas[etapa].map((tarefa: any, i: any) => (
                                <Card style={{ boxShadow: "2px 2px 3px rgba(0, 0, 0, .5)" }} className="w-full border-0 bg-azul-escuro text-white">
                                    <CardHeader>
                                        <CardTitle>{tarefa.titulo}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <strong>Responsavel</strong>: {tarefa.responsavel}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

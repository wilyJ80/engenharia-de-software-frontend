'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Kanban, Pencil, RefreshCcw, X, Trash2 } from "lucide-react";
import { RemoverProjeto } from "./removerProjeto";
import { EditarProjeto } from "./editarProjeto";
import { Projeto } from "@/core/interface/Projeto";
import Link from "next/link";


interface CardProjetoProps {
    projeto: Projeto;
    onRemove: (id: string) => void;
    onEdit: (projeto: Projeto) => void;
}

export const CardProjeto = ({ projeto, onRemove, onEdit }: CardProjetoProps) => {

    return (
        <Card className="w-72 bg-azul-escuro text-white rounded-md gap-2 pb-2">
            <CardHeader>
                <CardTitle>{projeto.nome}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-white h-16 ">
                    <p className="line-clamp-3"> {projeto.descritivo}</p>
                </CardDescription>
            </CardContent>
            <CardFooter className="p-0 w-full flex items-end">
                <CardAction className="flex w-full p-0 gap-2 justify-end px-2">
                    <Button title="Kanban" asChild className="bg-azul-claro hover:bg-transparent hover:cursor-pointer">
                        <Link  href={"/projeto/kanban"} className="">
                         <Kanban />
                        </Link>
                    </Button>
                    <Button title="Ciclos" asChild className="bg-azul-claro hover:bg-transparent hover:cursor-pointer">
                        <Link href={`/projeto/${projeto.id}/ciclo`} className="">
                            <RefreshCcw />
                        </Link>
                    </Button>
                        <EditarProjeto projeto={projeto} onEdit={onEdit} />
                        <RemoverProjeto  projeto={projeto} onRemove={onRemove} />
                </CardAction>
            </CardFooter>
        </Card>
    )
}
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
import { Kanban, Pencil, RefreshCcw, X } from "lucide-react";

interface CardProjetoProps {
    nome: string;
    descricao: string;
}

export const CardProjeto = ({ nome, descricao }: CardProjetoProps) => {
    return (
        <Card className="w-72 bg-azul-escuro text-white rounded-md gap-2 pb-2">
            <CardHeader>
                <CardTitle>{nome}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-white h-16 ">
                    <p className="line-clamp-3"> {descricao}</p>
                </CardDescription>
            </CardContent>
            <CardFooter className="p-0 w-full flex items-end">
                <CardAction className="flex w-full p-0 gap-2 justify-end px-2">
                        <Button className="bg-azul-claro hover:bg-transparent hover:cursor-pointer"> <Kanban /> </Button>
                        <Button className="bg-azul-claro hover:bg-transparent hover:cursor-pointer"> <RefreshCcw /> </Button>
                        <Button className="bg-azul-claro hover:bg-transparent hover:cursor-pointer"> <Pencil /> </Button>
                        <Button className="bg-azul-claro hover:bg-red-500 hover:cursor-pointer"> <X /> </Button>
                </CardAction>
            </CardFooter>
        </Card>
    )
}
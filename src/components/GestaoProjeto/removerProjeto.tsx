'use client';
import { useState } from "react"
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Projeto } from "@/core/interface/Projeto";
interface RemoverProjetoProps {
    onRemove: (nome: string) => void;
    projeto: Projeto;
}

export const RemoverProjeto = ({ onRemove, projeto }: RemoverProjetoProps) => {
    const [open, setOpen] = useState(false);
    console.log(projeto);
    return (<>
            <Button 
                title="Remover"
                className="bg-azul-claro hover:bg-red-500 hover:cursor-pointer"
                onClick={() => setOpen(true)}> <Trash2 />
            </Button>

            { open && (
            <Dialog  open={open} onOpenChange={setOpen}>
               <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
                   <DialogTitle>Remover Projeto</DialogTitle>
                   <DialogDescription>Tem certeza que deseja remover o projeto {projeto.nome}?</DialogDescription>
                   <DialogFooter>
                       <Button 
                            onClick={() => {
                                onRemove(projeto.id);
                                setOpen(false);
                            }}
                            className="bg-azul-escuro hover:bg-azul-claro/50 cursor-pointer rounded-md border-2 px-10 border-black">
                           Remover
                       </Button>
                   </DialogFooter>
               </DialogContent>
            </Dialog>)
        }
        </>
    )
}
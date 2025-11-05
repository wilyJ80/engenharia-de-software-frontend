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
                variant={"secondary"}
                className="hover:bg-red-500 hover:cursor-pointer"
                onClick={() => setOpen(true)}> <Trash2 />
            </Button>

            { open && (
            <Dialog  open={open} onOpenChange={setOpen}>
               <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
                   <DialogTitle>Remover Projeto</DialogTitle>
                   <DialogDescription className="text-gray-300">Tem certeza que deseja remover o projeto {projeto.nome}?</DialogDescription>
                   <DialogFooter>
                       <Button 
                            variant={"destructive"}
                            onClick={() => {
                                onRemove(projeto.id);
                                setOpen(false);
                            }}
                            >
                           Remover
                       </Button>
                   </DialogFooter>
               </DialogContent>
            </Dialog>)
        }
        </>
    )
}
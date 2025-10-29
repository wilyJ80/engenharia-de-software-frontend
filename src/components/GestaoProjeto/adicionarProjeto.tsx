'use client'
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
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

const participantesMock = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve"
];  

export const AdicionarProjeto = () => {
    const [open, setOpen] = useState(false);
    const [ participantes, setParticipantes ] = useState<string[]>([]);

    return (
        <>
            <Button
                  className="bg-azul-escuro rounded-md self-end"
                  onClick={() => setOpen(true)}>
                + Projeto
            </Button>
            <Dialog  open={open} onOpenChange={setOpen}>
               <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-4">

                    <div className="flex gap-1 items-center">
                        <Label className="mb-2">Nome:</Label>
                        <Input type="text" placeholder="Nome do Projeto" className="bg-azul-escuro placeholder-red text-white"/>
                    </div>

                    <div className="flex gap-1 items-center">
                        <Label className="w-20">Descritivo:</Label>
                        <Textarea placeholder="Descrição do Projeto"  className="bg-azul-escuro placeholder-white text-white mt-2"/>
                    </div>
                <div>

                </div>
                </div>
                <DialogFooter>
                    <Button className="bg-azul-escuro rounded-md border-2 px-10 border-black">
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </>
    )

}
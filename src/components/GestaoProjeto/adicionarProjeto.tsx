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
import { Projeto } from "@/core/interface/Projeto";
import { on } from "events";

const participantesMock = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve"
];

interface AdicionarProjetoProps {
    onAddProjeto: (novoProjeto: Omit<Projeto, "status">) => void;
}

export const AdicionarProjeto = ({ onAddProjeto }: AdicionarProjetoProps) => {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [descritivo, setDescritivo] = useState("");
    const [ participantes, setParticipantes ] = useState<string[]>([]);

    const onNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value);
    }
    const onDescritivoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescritivo(e.target.value);
    }

    return (
        <>
            <Button
                  className="bg-azul-escuro hover:bg-azul-claro rounded-md place-self-end text-white cursor-pointer"
                  onClick={() => setOpen(true)}>
                + Projeto
            </Button>
            { open && (
            <Dialog  open={open} onOpenChange={setOpen}>
               <DialogContent className="bg-azul-escuro text-white border-none rounded-md">
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-4">

                    <div className="flex gap-1 items-center">
                        <Label className="">Nome:</Label>
                        <Input 
                             onChange={onNomeChange}
                             type="text"
                             placeholder="Nome do Projeto"
                             className="bg-azul-escuro placeholder-red text-white"
                             value={nome}/>
                    </div>

                    <div className="flex gap-1 items-center">
                        <Label className="">Descritivo:</Label>
                        <Textarea 
                                onChange={onDescritivoChange}
                                placeholder="Descrição do Projeto"
                                className="bg-azul-escuro placeholder-white text-white mt-2"
                                value={descritivo}/>
                    </div>
                <div>
                <div className="flex gap-2 items-center">
                    <Label className="">Participantes:</Label>
                     <select className="border-2 rounded-md py-1 w-full"> 
                        {participantesMock.map((participante) => (
                            <option className="text-black" key={participante} value={participante}>
                                {participante}
                            </option>
                        ))}
                    </select>
                    <Button className="bg-azul-claro px-2  cursor-pointer hover:bg-azul-claro/50">Adicionar</Button>
                    </div>
                </div>
                </div>
                <DialogFooter>
                    <Button 
                            onClick={() => {
                                onAddProjeto({ id: Math.random().toString(36).substr(2, 9), nome, descritivo });
                                setOpen(false);
                            }}
                            className="bg-azul-escuro hover:bg-azul-claro/50 cursor pointer rounded-md border-2 px-10 border-black">
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>)
}
        </>
    )

}
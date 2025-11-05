import { Pencil } from "lucide-react"
import { Button } from "../ui/button"
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
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Projeto } from "@/core/interface/Projeto";
interface EditarProjetoProps {
    projeto: Projeto,
    onEdit: (projeto: Projeto) => void
}

export const EditarProjeto = ({projeto, onEdit }: EditarProjetoProps) => {
     const [open, setOpen] = useState(false);
     const [nome, setNome] = useState(projeto.nome);
     const [descritivo, setDescritivo] = useState(projeto.descritivo);
     console.log(projeto);
     //const [ participantes, setParticipantes ] = useState<string[]>(projeto.participantes);

        const onNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNome(e.target.value);
        }
        const onDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescritivo(e.target.value);
        }
        
    return (
        <>
            <Button variant={"secondary"} title="Editar" onClick={() => setOpen(true)}> <Pencil /> </Button>
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
                            
                             value={nome}/>
                    </div>

                    <div className="flex gap-1 items-center">
                        <Label className="">Descritivo:</Label>
                        <Textarea 
                                onChange={onDescricaoChange}
                                placeholder="Descrição do Projeto"
                                value={descritivo}/>
                    </div>
                <div>
               
                </div>
                </div>
                <DialogFooter>
                    <Button 
                            onClick={() => {
                                onEdit({ ...projeto, nome, descritivo });
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
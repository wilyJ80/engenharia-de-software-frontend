import { Pencil, X } from "lucide-react"
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
import { useEffect, useState } from "react";
import { Projeto, ProjetoComParticipantes } from "@/core/interface/Projeto";
import { getUsuarios } from "@/core/service/UsuarioService";
interface EditarProjetoProps {
    projeto: ProjetoComParticipantes,
    onEdit: (projeto: ProjetoComParticipantes) => void
}

export const EditarProjeto = ({projeto, onEdit }: EditarProjetoProps) => {
     const [open, setOpen] = useState(false);
     const [nome, setNome] = useState(projeto.nome);
     const [descritivo, setDescritivo] = useState(projeto.descritivo);
     const [ participantes, setParticipantes ] = useState<{ id: string; nome: string }[]>([]);
     const [ participanteParaAdicionar, setParticipanteParaAdicionar ] = useState<{id: string; nome: string} | null>(null);
     const [ participantesSelecionados, setParticipantesSelecionados ] = useState<{ id: string; nome: string }[]>(projeto.responsaveis_dto || []);
    
    useEffect(() => {
            const fetchParticipantes = async () => {
                try {
                    const res = await getUsuarios();
                    setParticipantes(res);
                } catch (error) {
                    console.error("Erro ao buscar participantes:", error);
                }
            };
            fetchParticipantes();
        },[]);
     

        const onNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNome(e.target.value);
        }
        const onDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescritivo(e.target.value);
        }
        
        const handleRemoveParticipante = (id: string) => {
            setParticipantesSelecionados(prev => prev.filter(participante => participante.id !== id));
        }

        const handleAddParticipante = () => {
            console.log(participanteParaAdicionar);
            if (!participanteParaAdicionar || participantesSelecionados.includes(participanteParaAdicionar)) return null;
            
            setParticipantesSelecionados(prev => [...prev, participanteParaAdicionar]);
            setParticipanteParaAdicionar(null);
        }

        const handleEditar = () => {
            if (!nome.trim() || !descritivo.trim()) return;
            onEdit({id: projeto.id, nome, descritivo, responsaveis_dto: participantesSelecionados });
            setOpen(false);
            setNome("");
            setDescritivo("");
            setParticipantesSelecionados([]);
        }
    return (
        <>
            <Button variant={"secondary"} title="Editar" onClick={() => setOpen(true)}> <Pencil /> </Button>
          
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
                <div className="flex gap-2 items-center">
                    <Label className="">Participantes:</Label>
                     <select 
                            className="border bg-white rounded-md py-1 px-2 w-full text-black"
                            value={participanteParaAdicionar?.nome}
                            onChange={(e) => setParticipanteParaAdicionar(participantes.find(participante => participante.nome === e.target.value) || null)}>
                        {participantes.map((participante) => (
                            <option 
                                    className="text-black" key={participante.id} value={participante.nome}
                                    >
                                {participante.nome}
                            </option>
                        ))}
                    </select>
                    <Button variant={"secondary"} onClick={handleAddParticipante}>Adicionar</Button>
                    </div>
                     {participantesSelecionados.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {participantesSelecionados.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-1 bg-azul-claro text-white rounded-full px-3 py-1"
                    >
                      <span>{a.nome}</span>
                      <Button className="p-0 w-4 hover:bg-red-500 h-4 bg-transparent"
                        onClick={() => handleRemoveParticipante(a.id)}
                      >
                        <X size={4} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
                </div>
                </div>
                <DialogFooter>
                    <Button 
                            variant={"secondary"}
                            onClick={handleEditar}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>

        </>
            
        
    )
}
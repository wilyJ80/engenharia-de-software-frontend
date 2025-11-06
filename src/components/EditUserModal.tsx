import { LuAtSign, LuUserRound } from "react-icons/lu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Usuario } from "@/core/interface/Usuario";

export interface UserType {
    nome: string;
    email: string;
}

export interface EditUserModalProps {
    cancelEdit: () => void;
    confirmEdit: (data: Usuario) => void;
    data: Usuario;
}

export default function EditUserModal({ cancelEdit, confirmEdit, data }: EditUserModalProps) {
    const [usuario, setUsuario] = useState<Usuario>({
        id: data.id,
        nome: data.nome,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
    });

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="flex flex-col bg-[#186B8C] p-4 w-[500px] h-[250px] justify-between rounded-md">
                <span className="text-white text-lg font-semibold">Editar Dados</span>

                <div className="flex flex-col text-white gap-3">
                    <div className="flex items-center gap-2">
                        <LuUserRound size={20} />
                        <Input value={usuario.nome} onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                        <LuAtSign size={20} />
                        <Input value={usuario.email} onChange={(e) => setUsuario({...usuario, email: e.target.value})} />
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <Button
                        onClick={cancelEdit}
                        className="bg-gray-300 hover:bg-gray-400"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => confirmEdit(usuario)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    );
}

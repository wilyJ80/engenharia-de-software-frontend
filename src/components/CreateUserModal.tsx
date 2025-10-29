import { LuAtSign, LuUserRound } from "react-icons/lu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export interface UserType {
    name: string;
    email: string;
}

export interface EditUserModalProps {
    cancelCreate: () => void;
    confirmCreate: (data: UserType) => void;
}

export default function CreateUserModal({ cancelCreate, confirmCreate }: EditUserModalProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSave = () => {
        if (name.trim() && email.trim()) {
            confirmCreate({ name, email });
            setName('');
            setEmail('');
        } else {
            alert("Preencha todos os campos!");
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <div className="flex flex-col bg-[#186B8C] p-4 w-[500px] h-[250px] justify-between rounded-md">
                <span className="text-white text-lg font-semibold">Criar Dados</span>

                <div className="flex flex-col text-white gap-3">
                    <div className="flex items-center gap-2">
                        <LuUserRound size={20} />
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2">
                        <LuAtSign size={20} />
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <Button
                        onClick={cancelCreate}
                        className="bg-gray-300 hover:bg-gray-400"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    );
}

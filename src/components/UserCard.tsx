import { Button } from "./ui/button";
import { LuUserRound } from "react-icons/lu";
import { LuAtSign } from "react-icons/lu";

export interface UserCardProps {
    name: string;
    email: string;
    onDelete: () => void;
    onEdit: () => void;
}

export function UserCard({ name, email, onDelete, onEdit } : UserCardProps) {
    return (
        <div className="flex flex-col bg-[#186B8C] p-4 w-full h-[150px] justify-between rounded-md">
            <div className="flex flex-col text-white">
                <div className="flex items-center gap-1">
                    <LuUserRound />
                    <span>{name}</span>
                </div>
                <div className="flex items-center gap-1">
                    <LuAtSign />
                    <span>{email}</span>
                </div>
            </div>
            <div className="flex gap-1 justify-end">
                <Button onClick={onDelete} className="bg-transparent border hover:bg-red-500">
                    Excluir
                </Button>
                <Button onClick={onEdit} className="bg-transparent border hover:bg-blue-500">
                    Editar
                </Button>
            </div>
        </div>
    )
}
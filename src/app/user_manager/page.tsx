'use client'
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import ShowConfirm from "@/components/ShowConfirm";
import EditUserModal from "@/components/EditUserModal";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserManager() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "Carlos Silva", email: "carlos.silva@example.com" },
        { id: 2, name: "Mariana Costa", email: "mariana.costa@example.com" },
        { id: 3, name: "João Pereira", email: "joao.pereira@example.com" },
        { id: 4, name: "Ana Souza", email: "ana.souza@example.com" },
    ]);

    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [showEditCard, setShowEditCard] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (userToDelete !== null) {
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
        }
        setShowConfirm(false);
        setUserToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setUserToDelete(null);
    };

    const handleEditClick = (id: number) => {
        const user = users.find((u) => u.id === id);
        if (user) setUserToEdit(user);
        setShowEditCard(true);
    };

    const confirmEdit = (data: { name: string; email: string }) => {
        if (userToEdit) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userToEdit.id ? { ...u, name: data.name, email: data.email } : u
                )
            );
        }
        setShowEditCard(false);
        setUserToEdit(null);
    };

    const cancelEdit = () => {
        setShowEditCard(false);
        setUserToEdit(null);
    };

    return (
        <div className="p-4">
            <div className="py-4">
                <h1 className="text-2xl font-semibold">Gestão de usuário</h1>
            </div>

            <div className="flex justify-end mb-4">
                <Button className="flex items-center bg-[#186B8C] w-40 border hover:bg-blue-500">
                    <MdAdd />
                    Adicionar
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center bg-amber-100 p-6 rounded-lg">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        onDelete={() => handleDeleteClick(user.id)}
                        onEdit={() => handleEditClick(user.id)}
                    />
                ))}
            </div>

            {showConfirm && (
                <ShowConfirm
                    cancelDelete={cancelDelete}
                    confirmDelete={confirmDelete}
                />
            )}

            {showEditCard && userToEdit && (
                <EditUserModal
                    cancelEdit={cancelEdit}
                    confirmEdit={confirmEdit}
                    data={userToEdit}
                />
            )}
        </div>
    );
}

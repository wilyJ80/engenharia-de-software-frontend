'use client'
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import ShowConfirm from "@/components/ShowConfirm";
import EditUserModal from "@/components/EditUserModal";
import CreateUserModal from "@/components/CreateUserModal";
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from "@/core/service/UsuarioService";
import { Usuario } from "@/core/interface/Usuario";


export default function UserManager() {
   
    const [users, setUsers] = useState<Usuario[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsuarios();
                setUsers(data);
            } catch (error) {
                console.log("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);


    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [showEditCard, setShowEditCard] = useState(false);
    const [userToEdit, setUserToEdit] = useState<Usuario | null>(null);

    const [showCreateCard, setShowCreateCard] = useState(false);

    const handleDeleteClick = (id: string) => {
        setUserToDelete(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {

        try{
            if (userToDelete !== null) {
                console.log("Deletando usuário com ID:", userToDelete);
                await deleteUsuario(userToDelete);
                console.log("Usuário deletado com sucesso");
                setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
        }
    }catch (error) {
        console.error("Erro ao deletar usuário:", error);
    }

    setShowConfirm(false);
    setUserToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setUserToDelete(null);
    };

    const handleEditClick =  (id: string) => {
        const user = users.find((u) => u.id === id);
        if (user) setUserToEdit(user);
        setShowEditCard(true);
    };

    const confirmEdit = async (data: { nome: string; email: string }) => {
        console.log("Confirmando edição......", userToEdit?.id);
        try {
            if (userToEdit) {
                console.log("Editando usuário com ID:", userToEdit.id);
                const res = await updateUsuario(userToEdit.id, { nome: data.nome, email: data.email, senha: "123"});
                console.log("Usuário atualizado:", res);
            }
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }

        if (userToEdit) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userToEdit.id ? { ...u, nome: data.nome, email: data.email } : u
                )
            );
        }
        setShowEditCard(false);
        setUserToEdit(null);
    };

    const saveUser = async (usuario: { nome: string; email: string }) => {
        console.log("Criando......")
        try{
            console.log("Criando Usuario usuário ");
            const data = await createUsuario({ nome: usuario.nome, email: usuario.email, senha: "123456" });
          
            console.log("Usuário criado com sucesso");
            setUsers((prev) => [...prev, data]);

        }
        catch (error) {
            console.error("Erro ao salvar usuário:", error);
        }
        setShowEditCard(false);
        setUserToEdit(null);
        setShowCreateCard(false);
    };

    const editUser = async (usuario: {nome: string; email: string }) => {
        console.log("Editando......", userToEdit)
        if (userToEdit) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userToEdit.id ? { ...u, nome: usuario.nome, email: usuario.email } : u
                )
            );
        }
    };

    const cancelEdit = () => {
        setShowEditCard(false);
        setUserToEdit(null);
    };

    const handleCreateClick = () => {
        setShowCreateCard(true);
    }

    const cancelCreate = () => {
        setShowCreateCard(false);
    }

    return (
        <div className="p-4">
            <div className="py-4">
                <h1 className="text-2xl font-semibold">Gestão de usuário</h1>
            </div>

            <div className="flex justify-end mb-4">
                <Button onClick={handleCreateClick} className="flex items-center bg-[#186B8C] w-40 border hover:bg-blue-500">
                    <MdAdd />
                    Adicionar
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center bg-amber-100 p-6 rounded-lg">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        name={user.nome}
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
                    confirmEdit={(data) => confirmEdit(data)}
                    data={userToEdit}
                />

            )}

            {showCreateCard && (
                <CreateUserModal
                    cancelCreate={cancelCreate}
                    confirmCreate={(data) => saveUser(data)}
                />
            )}
        </div>
    );
}

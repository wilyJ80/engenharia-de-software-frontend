import { Button } from "./ui/button";

export interface ShowConfirmProps {
    cancelDelete: () => void;
    confirmDelete: () => void;
}


export default function ShowConfirm({ cancelDelete, confirmDelete }: ShowConfirmProps) {

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-md shadow-md text-center">
                <p className="text-lg font-semibold mb-4">Deseja realmente excluir esta vaga?</p>
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={cancelDelete}
                        variant={"secondary"}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        variant={"destructive"}
                    >
                        excluir
                    </Button>
                </div>
            </div>
        </div>
    )
}
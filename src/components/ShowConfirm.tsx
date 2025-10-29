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
                    <button
                        onClick={cancelDelete}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                    >
                        excluir
                    </button>
                </div>
            </div>
        </div>
    )
}
import ArtefatosTable from "../../components/Artefatos/ArtefatosTable"

export default function artefato() {
  const mockItems = [
    { id: '1', nome: 'Especificação de Requisitos' },
    { id: '2', nome: 'Diagrama de Caso de Uso' },
    { id: '3', nome: 'Plano de Testes' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho  */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold text-azul-escuro">
          Cadastro de Artefatos de projeto
        </h1>
      </div>

      <div>
        <ArtefatosTable items={mockItems} />
      </div>
    </div>
  )
}
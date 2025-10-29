import { CardProjeto } from "./cardProjeto";

const projetos = [
    {
        nome: "Projeto A",
        descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    },
    {
        nome: "Projeto B",
        descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    },
    {
        nome: "Projeto C",
        descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
]

export const ListaProjeto = () => {
    return (
        <div className="flex gap-4">
            {projetos.map((projeto, index) => (
                <CardProjeto key={index} nome={projeto.nome} descricao={projeto.descricao} />
            ))}
        </div>
    );
}
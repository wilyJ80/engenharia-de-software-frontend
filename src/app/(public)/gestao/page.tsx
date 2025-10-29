import { AdicionarProjeto } from "@/components/GestaoProjeto/adicionarProjeto";
import { ListaProjeto } from "@/components/GestaoProjeto/listaProjeto";

export default function Page(){
    return <div className="p-2 ">
        <div>
            <h2>Gestão Projeto de Software Super Ágil</h2>
            <AdicionarProjeto  />
                </div>
            <div>
                <ListaProjeto />
            </div>
        </div>              
            
}
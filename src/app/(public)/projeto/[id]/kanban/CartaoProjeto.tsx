import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cartao } from "@/core/interface/Cartao";
import { Projeto } from "@/core/interface/Projeto";
import { Edit, Trash } from "lucide-react";

interface Props {
    cartao: Cartao
    containerId: string
}
export default function CartaoProjeto({ cartao }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Título do projeto</CardTitle>
            </CardHeader>

            <CardContent>
                <p><strong>Tempo de execução</strong>: 1h 30min</p>
                <p><strong>Responsável</strong>: João Silva</p>
            </CardContent>

            <div>
                <Button>
                    <Edit />
                </Button>

                <Button>
                    <Trash />
                </Button>
            </div>
        </Card>
    )
}
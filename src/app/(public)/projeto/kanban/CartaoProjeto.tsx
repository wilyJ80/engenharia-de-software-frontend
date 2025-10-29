import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Projeto } from "@/core/interface/Projeto";
import { Edit, Trash } from "lucide-react";

interface Props {
    projeto: Projeto
    containerId: string
}
export default function CartaoProjeto({ projeto }: Props) {
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
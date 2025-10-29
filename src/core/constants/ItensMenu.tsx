import { Amphora, Newspaper , Option, User} from "lucide-react";
import { ReactNode } from "react";

interface ItemMenu {
    icons?: ReactNode
    nome_item: string
    link: string
}

export const ItensMenu: ItemMenu[] = [{
        icons: <Newspaper />,
        nome_item: "Projeto",
        link: "/projeto",
    },{
        icons: <Option />,
        nome_item: "Fase",
        link: "/fase",
    },{
        icons: <Amphora />,
        nome_item: "Artefato",
        link: "/artefato",
    },{
        icons: <User />,
        nome_item: "Usuário",
        link:"/user_manager",
    }];


'use client'
import { usePathname } from "next/navigation";
import MenuItem from "../MenuItem/MenuItem";
import Link from "next/link";
import { ItensMenu } from "@/core/constants/ItensMenu";
import { useUserContext } from "@/core/providers/UserProvider";
import { Loader, Mails } from "lucide-react";
import { randomColor } from "@/lib/utils";
export default function Menu() {
    const url = usePathname();
    const { user, isLoading } = useUserContext();
    return (
        <div className="w-full h-full p-4 flex flex-col items-center bg-azul-escuro">
            <div
                className="
                    flex flex-col items-center
                    text-black
                    bg-azul-escuro w-full h-full
                    rounded-xl px-3  gap-3 
                "
            >
                {
                    ItensMenu.map((item, index) => (
                        <MenuItem className={`${url === item.link ? "bg-azul-claro" : "bg-white"}`} key={index}>
                            <Link  href={item.link} className="flex gap-4">{item.icons}{item.nome_item}</Link>
                        </MenuItem>
                    ))
                }

            </div>

            <div className="bg-white rounded-lg px-4 py-2 w-full" style={{ boxShadow: "2px 2px 4px rgba(0, 0, 0, .5)"}}>

                {
                    isLoading ? (
                        <p className="flex flex-col-reverse items-center"><Loader className="animate-spin" /> Carregando usuário...</p>
                    ) : (
                        user ? (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xl font-bold">Dados do usuário</p>

                                <div className="flex items-center gap-2 self-start">
                                    <div className={`w-6 h-6 p-4 flex justify-center items-center rounded-full ${randomColor(user?.id)}`}  style={{ boxShadow: "2px 2px 2px rgba(0, 0, 0, .5)"}}>
                                        <span className="text-2xl">{user.nome && user?.nome[0].toUpperCase()}</span>
                                    </div>
                                    <p>{user.nome && user?.nome[0].toUpperCase()}{user.nome && user?.nome.slice(1)}</p>
                                </div>

                                <p className="flex items-center gap-2 self-start">
                                    <Mails />
                                    <span>{user?.email}</span>
                                </p>
                            </div>

                        ) : (
                            <p className="italic animate-pulse text-md font-semibold">Nenhum usuário logado!</p>
                        )
                    )
                }
            </div>
        </div>
    )
}
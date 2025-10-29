'use client'
import { usePathname } from "next/navigation";
import MenuItem from "../MenuItem/MenuItem";
import Link from "next/link";

const menuItems = [
    "Projeto",
    "Fase",
    "Artefato",
    "Usuário"
];

export default function Menu() {
    const url = usePathname();
    return (
        <div className="w-full h-full p-4 flex flex-col items-center bg-azul-escuro">
            <div
                className="
                    flex flex-col items-center
                    text-black
                    bg-azul-escuro w-full h-[500px]
                    rounded-xl px-3  gap-3
                "
            >
                {
                    menuItems.map((item, index) => (
                        <MenuItem className={`${url === `/${item.toLocaleLowerCase()}` ? "bg-azul-claro" : "bg-white"}`} key={index}>
                            <Link href={`/${item.toLocaleLowerCase()}`} className="">{item}</Link>
                        </MenuItem>
                    ))
                }

            </div>
        </div>
    )
}
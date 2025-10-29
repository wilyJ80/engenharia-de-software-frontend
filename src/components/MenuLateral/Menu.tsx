import MenuItem from "../MenuItem/MenuItem";
import Link from "next/link";

const menuItems = [
    "Projeto",
    "Fase",
    "Artefato",
    "Usuário"
];

export default function Menu() {
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
                        <MenuItem key={index}>
                            <Link href={`/${item}`} className="">{item}</Link>
                        </MenuItem>
                    ))
                }

            </div>
        </div>
    )
}
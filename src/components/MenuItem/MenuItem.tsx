'use client'
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

interface Props {
    children: ReactNode
    className?: string
}
export default function MenuItem({ children, className }: Props) {
    const url = usePathname();
    console.log(url, children?.toString());
    return (
        <div
            className={`
                justify-center items-center
                flex p-2 w-full
                rounded-md list-none
                hover:bg-azul-claro hover:cursor-pointer
                
                ${className}
            `}
        >
            {children}
        </div>
    )
}
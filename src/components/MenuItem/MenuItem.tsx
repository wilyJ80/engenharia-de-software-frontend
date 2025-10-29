import { ReactNode } from "react"

interface Props {
    children: ReactNode
}
export default function MenuItem({ children }: Props) {
    return (
        <div
            className="
                
                justify-center items-center
                flex p-2 bg-white w-full
                rounded-md list-none
                hover:bg-azul-claro hover:cursor-pointer
            "
        >
            {children}
        </div>
    )
}
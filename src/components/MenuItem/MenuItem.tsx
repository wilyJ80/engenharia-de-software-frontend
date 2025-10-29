import { ReactNode } from "react"

interface Props {
    children: ReactNode
}
export default function MenuItem({ children }: Props) {
    return (
        <li
            className="
                flex p-2 bg-white w-full
                rounded-md list-none
            "
        >
            {children}
        </li>
    )
}
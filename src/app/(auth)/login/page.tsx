'use client'

import Image from "next/image"
import { FormLogin } from "@/components/Login/formLogin"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
      
      {/* Lado esquerdo - Logo */}
      <div className="w-1/2 flex flex-col items-center justify-center border-r-2 border-azul-escuro">
        <Image
          src="/logo.png"
          alt="Logo GPS SuperA"
          width={350}
          height={350}
          className="object-contain"
        />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-6 text-black">Fazer Login</h1>

        <div className="bg-azul-escuro p-8 rounded-md shadow-md w-80">
          <FormLogin />
        </div>
      </div>
    </div>
  )
}

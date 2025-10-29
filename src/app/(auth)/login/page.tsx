'use client'

import Image from "next/image"
import { FormLogin } from "@/components/Login/formLogin"

export default function Page() {
  return (
    <div className="flex w-full justify-center  bg-white">
      <div className="w-full flex flex-col items-center my-24">
        <h1 className="text-2xl font-semibold mb-6 text-black">Fazer Login</h1>

        <div className="bg-azul-escuro p-8 rounded-md shadow-md justify-center">
          <FormLogin />
        </div>
      </div>
    </div>
  )
}

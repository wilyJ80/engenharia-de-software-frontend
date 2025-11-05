'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/core/service/AuthService";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/core/providers/UserProvider";
export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useUserContext();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
    }

    try {
        await loginUser(email, password)
    } catch(error) {
        console.error(error);
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-sm text-white bg-azul-escuro p-6 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium text-white">
          Email:
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="border border-gray-300 bg-white rounded-md p-2 text-black placeholder"
        />
      </div>

      {/* Campo de Senha */}
      <div className="flex flex-col gap-2 relative">
        <Label htmlFor="password" className="text-sm font-medium text-white">
          Senha:
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="border border-gray-300 bg-white rounded-md p-2 pr-10 text-black w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-black cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Botão Entrar */}
      <Button
        type="submit"
        className="
          bg-azul-escuro
          text-white
          rounded-md
          p-2
          text-sm
          font-semibold
          border border-gray-400
          hover:bg-azul-claro
          cursor-pointer
          transition-colors
          duration-200
        "
      >
        Entrar
      </Button>
    </form>
  );
};

"use client";

import { login, me } from "@/core/service/AuthService";
import { useRouter } from "next/navigation";
import { createContext , useState, useContext, useEffect } from "react";
import { Usuario } from "../interface/Usuario";

type UserContextType = {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginUser: (email: string, senha: string) => Promise<boolean>;

};

export const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const userData = await me();
        console.log("User data:", userData);
        setUser(userData);
      } catch (e) {
        console.warn("Nenhum perfil ativo", e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const loginUser = async (email: string, senha: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await login(email, senha);
      localStorage.setItem("token", userData.access_token);
      router.push("/");
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const contextValue = {
    user,
    isLoading,
    isAuthenticated,
    loginUser,
  };


  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

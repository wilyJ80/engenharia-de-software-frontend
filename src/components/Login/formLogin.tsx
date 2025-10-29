'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const FormLogin = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (
        <form className="flex flex-col gap-4 w-full max-w-sm h-72  text-white bg-azul-escuro p-6 rounded-md">
            <div className="flex gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input  
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                name="email"
                type="email"
                placeholder="Usuário"
                className="border border-border rounded-md p-2"
            />
            </div>
            <div className="flex gap-2">
                <Label htmlFor="password">Senha:</Label>
                <Input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Senha"
                    className="border border-border rounded-md p-2"
                />
            </div>
            <Button type="submit" 
                    className="bg-azul-escuro text-white rounded-md p-2 border-2 border-black">
                Entrar
            </Button>
        </form>
    );
};

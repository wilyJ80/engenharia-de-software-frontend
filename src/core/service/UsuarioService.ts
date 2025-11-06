const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API

import { Usuario } from "../interface/Usuario";

const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWZmYjYzNC1mOWVkLTRlYjUtYmZmMi1jZmEzN2Y0NTRhZWUiLCJleHAiOjE3NjE3NjYyNTF9.uAxO1-4vd2-ZiegN66chTWJ7npTQWOh6Zb9LpBxNiJs"
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await fetch(`${urlBase}/usuarios/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch usuarios');
    }

    const data = response.json();
    return data || [];
};
export const getUsuarioById = async (id: string) => {
    const response = await fetch(`${urlBase}/usuarios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch usuario');
    }
    return response.json();
};

export const updateUsuario = async (id: string | undefined, data: { nome: string | undefined; email: string | undefined, senha: string }) => {
    console.log(data)
    const response = await fetch(`${urlBase}/usuarios/${id}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update usuario');
    }
    return response.json();
};

export const deleteUsuario = async (id: string | undefined) => {
    const response = await fetch(`${urlBase}/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete usuario');
    }
    return response.json();
};


export const createUsuario = async (data: { nome: string; email: string, senha: string }) => {
    const response = await fetch(`${urlBase}/usuarios/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create usuario');
    }
    return response.json();
};

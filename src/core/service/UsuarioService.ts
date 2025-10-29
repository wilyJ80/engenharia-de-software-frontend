import { Usuario } from "../interface/Usuario";

 const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyODg2YjY2ZS1jOWQyLTRmYWEtOGE3YS1mOTJhMTk2ODU5OTMiLCJleHAiOjE3NjE3NjYxMTJ9.QiqJIv81g02AfEoTYXVYmaMNZAiK5R8UlzQBrmFfnIk"
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await fetch('http://localhost:8000/usuarios/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch usuarios');
    }

    const data = response.json();
    return data || [];
};
export const getUsuarioById = async (id: string) => {
    const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch usuario');
    }
    return response.json();
};

export const updateUsuario = async (id: string, data: { nome: string; email: string }) => {
    console.log(data)
    const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update usuario');
    }
    return response.json();
};

export const deleteUsuario = async (id: string) => {
    const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete usuario');
    }
    return response.json();
};


export const createUsuario = async (data: { nome: string; email: string, senha: string }) => {
    const response = await fetch('http://localhost:8000/usuarios/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create usuario');
    }
    return response.json();
};

const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API

export const login = async (email: string, senha: string) => {
    const response = await fetch(`${urlBase}/usuarios/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });
    if(!response.ok){
        throw new Error('Login failed');
    } 

    const data = await response.json();
    return data;
}

export const me = async () => {
    const response = await fetch(`${urlBase}/usuarios/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if(!response.ok){
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
}
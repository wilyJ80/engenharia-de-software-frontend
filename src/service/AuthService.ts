export const login = async (email: string, senha: string) => {
    const response = await fetch('http://localhost:8000/usuarios/login', {
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
    const response = await fetch('http://localhost:8000/usuarios/me', {
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
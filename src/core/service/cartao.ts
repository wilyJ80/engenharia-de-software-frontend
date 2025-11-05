const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API

async function getCartoesPorIdProjeto(projetoId: string) {
    try {
        const resposta = await fetch(`${urlBase}/ciclos/projeto/${projetoId}`, {
            method: "GET",
            headers: {
                "Contente-type": "application/json"
            }
        })

        if (!resposta.ok) {
            throw new Error("Erro ao buscar ciclos");
        }

        const dados = resposta.json();

        return dados;
        
    } catch(e) {
        return
    }
}

export {
    getCartoesPorIdProjeto
}
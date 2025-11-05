import { StatusProjeto } from "../constants/StatusProjeto";

const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API
// --- Tipos (Placeholders) ---
// (Você deve definir estes tipos no seu frontend 
// para espelhar seus DTOs do Pydantic)
type CardCreateDTO = any;
type CardUpdateDTO = any;

// --- URL Base ---

/**
 * 1. Cria um novo Card (POST /card/)
 */
async function createCard(cardData: CardCreateDTO) {
    try {
        const resposta = await fetch(`${urlBase}/card/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardData)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao criar card");
        }

        const dados = await resposta.json();
        return dados;
        
    } catch(e) {
        console.error(e);
        return; // Retorna undefined em caso de erro
    }
}

/**
 * 2. Lista todos os Cards (GET /card/)
 * Permite filtrar por status ou ciclo_id.
 */
async function listCards(status_filtro?: StatusProjeto, ciclo_id?: string) { // <-- ATUALIZADO AQUI
    try {
        // Constrói os parâmetros de busca (query params)
        const params = new URLSearchParams();
        if (status_filtro) {
            params.append("status_filtro", status_filtro);
        }
        if (ciclo_id) {
            params.append("ciclo_id", ciclo_id);
        }

        const queryString = params.toString();
        const url = `${urlBase}/card/${queryString ? `?${queryString}` : ""}`;

        const resposta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error("Erro ao listar cards");
        }

        const dados = await resposta.json();
        return dados;
        
    } catch(e) {
        console.error(e);
        return;
    }
}

/**
 * 3. Busca um Card específico (GET /card/{card_id})
 */
async function getCardById(card_id: string) {
    try {
        const resposta = await fetch(`${urlBase}/card/${card_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao buscar card com ID ${card_id}`);
        }

        const dados = await resposta.json();
        return dados;
        
    } catch(e) {
        console.error(e);
        return;
    }
}

/**
 * 4. Atualiza um Card (PATCH /card/{card_id})
 */
async function updateCard(card_id: string, cardData: CardUpdateDTO) {
    try {
        const resposta = await fetch(`${urlBase}/card/${card_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cardData)
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao atualizar card com ID ${card_id}`);
        }

        const dados = await resposta.json();
        return dados;
        
    } catch(e) {
        console.error(e);
        return;
    }
}

/**
 * 5. Deleta um Card (DELETE /card/{card_id})
 */
async function deleteCard(card_id: string) {
    try {
        const resposta = await fetch(`${urlBase}/card/${card_id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao deletar card com ID ${card_id}`);
        }

        // DELETE com 204 No Content não tem corpo JSON.
        // Apenas retornamos true para indicar sucesso.
        return true; 
        
    } catch(e) {
        console.error(e);
        return; // Retorna undefined em caso de erro
    }
}


export {
    createCard,
    listCards,
    getCardById,
    updateCard,
    deleteCard
}

async function getCartoesPorIdCiclo(cicloId: string) {
    try {
        const resposta = await fetch(`${urlBase}/card?ciclo_id=${cicloId}`, {
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
    getCartoesPorIdCiclo
}
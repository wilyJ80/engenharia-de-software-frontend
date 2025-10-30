const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API

async function visualizarCiclo(projetoId: string) {
    const response = await fetch(`${urlBase}/ciclos/projeto/${projetoId}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar ciclos');
    }
    const data = await response.json();

    // backend retorna [{ id, nome, versao, projeto_id }, ...]
    return Array.isArray(data)
        ? data.map((c: any) => ({
            id: c.id,
            name: c.nome,
            versao: c.versao,
            projeto_id: c.projeto_id,
        }))
        : [];
}

async function criarCiclo(dados: { nome: string; versao: string; projeto_id?: string }) {
    const response = await fetch(`${urlBase}/ciclos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (response.status === 422) {
        const err = await response.json();
        throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
    }

    if (!response.ok) {
        throw new Error('Erro ao criar ciclo');
    }

    const created = await response.json();
    // backend retorna { id, nome, versao, projeto_id }
    return {
        id: created.id,
        name: created.nome,
        versao: created.versao,
        projeto_id: created.projeto_id,
    };
}

async function atualizarCiclo(id: string, dados: { nome: string; versao: string; projeto_id?: string }) {
    const response = await fetch(`${urlBase}/ciclos/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (response.status === 422) {
        const err = await response.json();
        throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
    }

    if (!response.ok) {
        throw new Error('Erro ao atualizar ciclo');
    }

    const updated = await response.json();
    return {
        id: updated.id,
        name: updated.nome,
        versao: updated.versao,
        projeto_id: updated.projeto_id,
    };
}

async function deletarCiclo(id: string) {
    const response = await fetch(`${urlBase}/ciclos/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 422) {
        const err = await response.json();
        throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
    }

    if (!response.ok && response.status !== 204) {
        throw new Error('Erro ao deletar ciclo');
    }

    return true;
}

export { visualizarCiclo, criarCiclo, atualizarCiclo, deletarCiclo };
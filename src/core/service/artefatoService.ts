const urlBase = process.env.NEXT_PUBLIC_ENDERECO_API

async function visualizarArtefato() {
    const response = await fetch(`${urlBase}/artefatos/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar artefatos');
    }
    const data = await response.json();

    return Array.isArray(data)
        ? data.map((a: any) => ({ id: a.id, nome: a.nome }))
        : [];
}

async function criarArtefato(nome: string) {
  const response = await fetch(`${urlBase}/artefatos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  });

  if (response.status === 422) {
    // validação do backend
    const err = await response.json();
    throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
  }

  if (!response.ok) {
    throw new Error('Erro ao criar artefato');
  }

  const created = await response.json();
  // resposta contém { nome, id, created_at, updated_at }
  return { id: created.id, nome: created.nome };
}

async function atualizarArtefato(id: string | number, nome: string) {
  const response = await fetch(`${urlBase}/artefatos/${encodeURIComponent(String(id))}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  });

  if (response.status === 422) {
    const err = await response.json();
    throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
  }

  if (!response.ok) {
    throw new Error('Erro ao atualizar artefato');
  }

  const updated = await response.json();
  // espera { nome, id }
  return { id: updated.id, nome: updated.nome };
}

async function deletarArtefato(id: string | number) {
  const response = await fetch(`${urlBase}/artefatos/${encodeURIComponent(String(id))}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 422) {
    const err = await response.json();
    throw new Error(err?.detail?.[0]?.msg ?? 'Validação inválida');
  }

  if (response.status === 204) {
    return true;
  }

  if (!response.ok) {
    throw new Error('Erro ao deletar artefato');
  }

  return true;
}

export { visualizarArtefato, criarArtefato, atualizarArtefato, deletarArtefato };
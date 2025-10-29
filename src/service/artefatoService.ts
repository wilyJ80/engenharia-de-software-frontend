async function visualizarArtefato() {
    const response = await fetch('http://localhost:8000/artefatos/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar artefatos');
    }

    // backend retorna [{ nome, id }, ...]
    const data = await response.json();

    // mapear para formato frontend { id, name }
    return Array.isArray(data)
        ? data.map((a: any) => ({ id: a.id, name: a.nome }))
        : [];
}

async function criarArtefato(nome: string) {
  const response = await fetch('http://localhost:8000/artefatos/', {
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
  return { id: created.id, name: created.nome };
}

export { visualizarArtefato, criarArtefato };
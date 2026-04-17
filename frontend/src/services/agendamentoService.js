const BASE_URL = 'https://interfaces-projeto.onrender.com'

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export async function listarAgendamentos() {
  const res = await fetch(`${BASE_URL}/agendamento`, { headers: getHeaders() })
  const json = await res.json()
  return json.dados || []
}

export async function criarAgendamento(dados) {
  const res = await fetch(`${BASE_URL}/agendamento`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dados)
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.mensagem || 'Erro ao criar agendamento')
  return json
}

export async function atualizarAgendamento(id, dados) {
  const res = await fetch(`${BASE_URL}/agendamento/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(dados)
  })
  return res.json()
}

export async function deletarAgendamento(id) {
  const res = await fetch(`${BASE_URL}/agendamento/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  return res.json()
}

export async function listarClientes() {
  const res = await fetch(`${BASE_URL}/clientes`, { headers: getHeaders() })
  const json = await res.json()
  return Array.isArray(json) ? json : json.dados || []
}

export async function listarFuncionarios() {
  const res = await fetch(`${BASE_URL}/funcionarios`, { headers: getHeaders() })
  const json = await res.json()
  return Array.isArray(json) ? json : json.dados || []
}

export async function listarServicos() {
  const res = await fetch(`${BASE_URL}/servicos`, { headers: getHeaders() })
  const json = await res.json()
  return Array.isArray(json) ? json : json.dados || []
}
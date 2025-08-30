// src/services/api.ts
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"; // backend local

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Anexa o token JWT em todas as requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🔹 Funções que falam com o backend

export async function novoCliente(dados: {
  nome: string;
  telefone: string;
  aniversario?: string;
}) {
  const res = await api.post("/clientes/owner", dados);
  return res.data;
}

export async function novoAgendamento(dados: {
  clienteId: string;
  servico: string;
  data: string;
  valor?: number;
}) {
  const res = await api.post("/agendamentos/owner", dados);
  return res.data;
}

export async function exportarRelatorio(from: string, to: string) {
  const res = await api.get(`/relatorios/export.pdf?from=${from}&to=${to}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "relatorio.pdf");
  document.body.appendChild(link);
  link.click();
}

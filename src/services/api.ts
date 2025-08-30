// src/services/api.ts
import axios from "axios";

// 👉 Ajuste para a URL do SEU backend 
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://sr-mendes-dashboard.vercel.app/";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Anexa o token JWT em todas as requisições autenticadas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // salvo após login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

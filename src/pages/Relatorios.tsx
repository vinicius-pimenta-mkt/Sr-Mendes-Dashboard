import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

// Tipos dos relatórios
interface Servico {
  servico: string;
  quantidade: number;
  receita: number;
}

interface ReceitaTempo {
  mes: string;
  receita: number;
}

interface FrequenciaCliente {
  nome: string;
  visitas: number;
}

const Relatorios = () => {
  const [servicosMaisVendidos, setServicosMaisVendidos] = useState<Servico[]>([]);
  const [receitaTempos, setReceitaTempos] = useState<ReceitaTempo[]>([]);
  const [frequenciaClientes, setFrequenciaClientes] = useState<FrequenciaCliente[]>([]);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await api.get("/relatorios");
        const data = res.data;

        // Se não vier nada da API, mantém mocks
        if (!data || Object.keys(data).length === 0) {
          setServicosMaisVendidos([
            { servico: "Corte", quantidade: 12, receita: 240 },
            { servico: "Barba", quantidade: 8, receita: 160 },

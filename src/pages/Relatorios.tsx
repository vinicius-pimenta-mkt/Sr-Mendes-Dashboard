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
            { servico: "Corte + Barba", quantidade: 5, receita: 150 },
          ]);
          setReceitaTempos([
            { mes: "Janeiro", receita: 1200 },
            { mes: "Fevereiro", receita: 1350 },
            { mes: "Março", receita: 1600 },
          ]);
          setFrequenciaClientes([
            { nome: "João", visitas: 5 },
            { nome: "Maria", visitas: 3 },
            { nome: "Carlos", visitas: 7 },
          ]);
        } else {
          setServicosMaisVendidos(data.servicos || []);
          setReceitaTempos(data.receita || []);
          setFrequenciaClientes(data.frequencia || []);
        }
      } catch (err) {
        console.error(err);
        // Mock em caso de erro
        setServicosMaisVendidos([
          { servico: "Corte", quantidade: 12, receita: 240 },
          { servico: "Barba", quantidade: 8, receita: 160 },
          { servico: "Corte + Barba", quantidade: 5, receita: 150 },
        ]);
        setReceitaTempos([
          { mes: "Janeiro", receita: 1200 },
          { mes: "Fevereiro", receita: 1350 },
          { mes: "Março", receita: 1600 },
        ]);
        setFrequenciaClientes([
          { nome: "João", visitas: 5 },
          { nome: "Maria", visitas: 3 },
          { nome: "Carlos", visitas: 7 },
        ]);
      }
    };
    fetchRelatorios();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <Button onClick={() => window.print()}>Exportar Relatório</Button>
      </div>

      <Tabs defaultValue="servicos">
        <TabsList>
          <TabsTrigger value="servicos">Serviços Mais Vendidos</TabsTrigger>
          <TabsTrigger value="receita">Receita por Mês</TabsTrigger>
          <TabsTrigger value="clientes">Clientes Frequentes</TabsTrigger>
        </TabsList>

        {/* Serviços Mais Vendidos */}
        <TabsContent value="servicos">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={servicosMaisVendidos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="servico" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receita por Mês */}
        <TabsContent value="receita">
          <Card>
            <CardHeader>
              <CardTitle>Receita por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={receitaTempos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="receita" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clientes Frequentes */}
        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Mais Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={frequenciaClientes}
                    dataKey="visitas"
                    nameKey="nome"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {frequenciaClientes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;

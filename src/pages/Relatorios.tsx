import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download 
} from "lucide-react";
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

// 👉 Componente
const Relatorios = () => {
  // 👉 Mock inicial (pra nunca ficar vazio)
  const [servicosMaisVendidos, setServicosMaisVendidos] = useState<Servico[]>([
    { servico: "Corte", quantidade: 12, receita: 240 },
    { servico: "Barba", quantidade: 8, receita: 160 },
    { servico: "Corte + Barba", quantidade: 5, receita: 150 },
  ]);

  const [receitaTempos, setReceitaTempos] = useState<ReceitaTempo[]>([
    { mes: "Janeiro", receita: 1200 },
    { mes: "Fevereiro", receita: 1350 },
    { mes: "Março", receita: 1600 },
  ]);

  const [frequenciaClientes, setFrequenciaClientes] = useState<FrequenciaCliente[]>([
    { nome: "João", visitas: 5 },
    { nome: "Maria", visitas: 3 },
    { nome: "Carlos", visitas: 7 },
  ]);

  // 👉 Busca real da API (mantém mocks se falhar)
  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await api.get("/relatorios");
        const data = res.data;

        if (data) {
          if (Array.isArray(data.servicos) && data.servicos.length > 0) {
            setServicosMaisVendidos(data.servicos);
          }
          if (Array.isArray(data.receita) && data.receita.length > 0) {
            setReceitaTempos(data.receita);
          }
          if (Array.isArray(data.frequencia) && data.frequencia.length > 0) {
            setFrequenciaClientes(data.frequencia);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar relatórios:", err);
      }
    };
    fetchRelatorios();
  }, []);

  const CORES = ["#FFB800", "#FF8000", "#222", "#666", "#999"];

  // 👉 Exportar relatório (print → PDF)
  const exportarRelatorio = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <Button onClick={exportarRelatorio} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
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
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Serviços Mais Vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={servicosMaisVendidos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="servico" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#FFB800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receita por Mês */}
        <TabsContent value="receita">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Receita por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={receitaTempos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="receita" stroke="#FF8000" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clientes Frequentes */}
        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Clientes Mais Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={frequenciaClientes}
                    dataKey="visitas"
                    nameKey="nome"
                    outerRadius={100}
                    label
                  >
                    {frequenciaClientes.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
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

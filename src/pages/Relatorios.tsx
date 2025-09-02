import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download
} from "lucide-react";

// 👉 Dados fictícios (mock)
const Relatorios = () => {
  const [servicosMaisVendidos] = useState([
    { nome: "Corte e Barba", quantidade: 45, receita: 2025 },
    { nome: "Corte", quantidade: 32, receita: 960 },
    { nome: "Barba", quantidade: 28, receita: 560 },
    { nome: "Corte, Barba e Sobrancelha", quantidade: 15, receita: 975 },
    { nome: "Sobrancelha", quantidade: 12, receita: 180 },
    { nome: "Corte e Sobrancelha", quantidade: 8, receita: 320 }
  ]);

  const [receitaTempos] = useState([
    { periodo: "Dom", valor: 380 },
    { periodo: "Seg", valor: 520 },
    { periodo: "Ter", valor: 680 },
    { periodo: "Qua", valor: 590 },
    { periodo: "Qui", valor: 720 },
    { periodo: "Sex", valor: 850 },
    { periodo: "Sáb", valor: 920 }
  ]);

  const [frequenciaClientes] = useState([
    { nome: "João Silva", visitas: 12, ultimaVisita: "2024-08-20", gasto: 540 },
    { nome: "Pedro Santos", visitas: 8, ultimaVisita: "2024-08-18", gasto: 360 },
    { nome: "Carlos Lima", visitas: 6, ultimaVisita: "2024-08-15", gasto: 270 },
    { nome: "Marcus Oliveira", visitas: 5, ultimaVisita: "2024-08-22", gasto: 325 },
    { nome: "Rafael Costa", visitas: 4, ultimaVisita: "2024-08-19", gasto: 180 }
  ]);

  const CORES_GRAFICO = [
    'hsl(var(--accent))',
    'hsl(var(--primary))', 
    'hsl(0 0% 60%)',
    'hsl(0 0% 40%)',
    'hsl(0 0% 80%)',
    'hsl(0 0% 20%)'
  ];

  // 👉 Exporta relatório em PDF (via print)
  const exportarRelatorio = () => {
    window.print(); 
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise de desempenho e estatísticas da barbearia
          </p>
        </div>
        <Button onClick={exportarRelatorio} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="servicos">
        <TabsList>
          <TabsTrigger value="servicos">Serviços Mais Vendidos</TabsTrigger>
          <TabsTrigger value="receita">Receita por Dia</TabsTrigger>
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
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Receita por Dia */}
        <TabsContent value="receita">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Receita por Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={receitaTempos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="hsl(var(--accent))" />
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
                      <Cell key={index} fill={CORES_GRAFICO[index % CORES_GRAFICO.length]} />
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

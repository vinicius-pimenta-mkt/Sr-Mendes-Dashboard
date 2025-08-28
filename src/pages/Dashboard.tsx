import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  Scissors,
  Eye,
  User
} from "lucide-react";

interface Agendamento {
  id: string;
  cliente: string;
  servico: string;
  horario: string;
  status: "confirmado" | "pendente" | "finalizado";
}

interface ServicosCount {
  barba: number;
  corteBarba: number;
  corte: number;
  sobrancelha: number;
  corteSobrancelha: number;
  corteBarbasobrancelha: number;
}

const Dashboard = () => {
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamento[]>([]);
  const [atendimentosDia, setAtendimentosDia] = useState(0);
  const [receitaDia, setReceitaDia] = useState(0);
  const [servicosDia, setServicosDia] = useState<ServicosCount>({
    barba: 0,
    corteBarba: 0,
    corte: 0,
    sobrancelha: 0,
    corteSobrancelha: 0,
    corteBarbasobrancelha: 0
  });

  // Simular dados para demonstração
  useEffect(() => {
    // Simulação de dados - substituir por chamadas HTTP reais
    setProximosAgendamentos([
      {
        id: "1",
        cliente: "João Silva",
        servico: "Corte e Barba",
        horario: "14:30",
        status: "confirmado"
      },
      {
        id: "2", 
        cliente: "Pedro Santos",
        servico: "Corte",
        horario: "15:00",
        status: "confirmado"
      },
      {
        id: "3",
        cliente: "Carlos Lima",
        servico: "Barba",
        horario: "15:30",
        status: "pendente"
      }
    ]);

    setAtendimentosDia(12);
    setReceitaDia(580);
    setServicosDia({
      barba: 3,
      corteBarba: 5,
      corte: 2,
      sobrancelha: 1,
      corteSobrancelha: 1,
      corteBarbasobrancelha: 0
    });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case "pendente":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case "finalizado":
        return <Badge className="bg-blue-100 text-blue-800">Finalizado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do dia - {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Atendimentos Hoje
            </CardTitle>
            <Users className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{atendimentosDia}</div>
            <p className="text-xs text-muted-foreground">
              clientes atendidos
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita do Dia
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {receitaDia.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              faturamento hoje
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximos Agendamentos
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{proximosAgendamentos.length}</div>
            <p className="text-xs text-muted-foreground">
              para hoje
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Serviços Realizados
            </CardTitle>
            <Scissors className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Object.values(servicosDia).reduce((a, b) => a + b, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              serviços hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximosAgendamentos.map((agendamento) => (
                <div 
                  key={agendamento.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{agendamento.cliente}</p>
                      <p className="text-sm text-muted-foreground">{agendamento.servico}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{agendamento.horario}</p>
                    {getStatusBadge(agendamento.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Serviços do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-accent" />
              Serviços Realizados Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Barba</span>
                <span className="font-medium text-foreground">{servicosDia.barba}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Corte e Barba</span>
                <span className="font-medium text-foreground">{servicosDia.corteBarba}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Corte</span>
                <span className="font-medium text-foreground">{servicosDia.corte}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sobrancelha</span>
                <span className="font-medium text-foreground">{servicosDia.sobrancelha}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Corte e Sobrancelha</span>
                <span className="font-medium text-foreground">{servicosDia.corteSobrancelha}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Corte, Barba e Sobrancelha</span>
                <span className="font-medium text-foreground">{servicosDia.corteBarbasobrancelha}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
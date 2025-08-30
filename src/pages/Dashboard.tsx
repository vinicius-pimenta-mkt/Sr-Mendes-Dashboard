import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Clock,
  Scissors,
  User
} from "lucide-react";

// 🔹 Import das funções da API (vamos criar já já em src/services/api.ts)
import { novoCliente, novoAgendamento, exportarRelatorio } from "@/services/api";

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

      {/* 🔹 Botões de ação */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={async () => {
            try {
              await novoCliente({
                nome: "Exemplo Cliente",
                telefone: "11999999999",
                aniversario: "1990-01-01"
              });
              alert("Cliente cadastrado com sucesso!");
            } catch (err) {
              alert("Erro ao cadastrar cliente");
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Novo Cliente
        </button>

        <button
          onClick={async () => {
            try {
              await novoAgendamento({
                clienteId: "1", // depois substituímos pelo cliente real
                servico: "Corte",
                data: "2025-08-30T14:00:00",
                valor: 50
              });
              alert("Agendamento criado!");
            } catch (err) {
              alert("Erro ao criar agendamento");
            }
          }}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Novo Agendamento
        </button>

        <button
          onClick={() => {
            exportarRelatorio("2025-08-01", "2025-08-31");
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Exportar Relatório
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* ... resto do seu código não alterado ... */}
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
              {/* ... resto do código igual ... */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar, 
  Edit, 
  X, 
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agendamento {
  id: string;
  cliente: string;
  telefone: string;
  servico: string;
  horario: string;
  data: string;
  status: "confirmado" | "pendente" | "finalizado" | "cancelado";
  preco: number;
}

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [visualizacao, setVisualizacao] = useState<"dia" | "semana">("dia");
  const { toast } = useToast();

  // Simular dados para demonstração
  useEffect(() => {
    const agendamentosDemo: Agendamento[] = [
      {
        id: "1",
        cliente: "João Silva",
        telefone: "(11) 99999-9999",
        servico: "Corte e Barba",
        horario: "09:00",
        data: new Date().toISOString().split('T')[0],
        status: "confirmado",
        preco: 45
      },
      {
        id: "2",
        cliente: "Pedro Santos",
        telefone: "(11) 88888-8888",
        servico: "Corte",
        horario: "10:00",
        data: new Date().toISOString().split('T')[0],
        status: "confirmado",
        preco: 30
      },
      {
        id: "3",
        cliente: "Carlos Lima",
        telefone: "(11) 77777-7777",
        servico: "Barba",
        horario: "11:00",
        data: new Date().toISOString().split('T')[0],
        status: "pendente",
        preco: 20
      },
      {
        id: "4",
        cliente: "Marcus Oliveira",
        telefone: "(11) 66666-6666",
        servico: "Corte, Barba e Sobrancelha",
        horario: "14:00",
        data: new Date().toISOString().split('T')[0],
        status: "confirmado",
        preco: 65
      }
    ];
    setAgendamentos(agendamentosDemo);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmado</Badge>;
      case "pendente":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case "finalizado":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Finalizado</Badge>;
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleEditarAgendamento = (id: string) => {
    toast({
      title: "Editar Agendamento",
      description: "Funcionalidade em desenvolvimento - integração com n8n em andamento.",
    });
    // TODO: Implementar chamada HTTP para edição via n8n
  };

  const handleCancelarAgendamento = (id: string) => {
    toast({
      title: "Cancelar Agendamento",
      description: "Agendamento cancelado com sucesso!",
    });
    
    setAgendamentos(prev => 
      prev.map(agendamento => 
        agendamento.id === id 
          ? { ...agendamento, status: "cancelado" as const }
          : agendamento
      )
    );
  };

  const agendamentosDodia = agendamentos.filter(
    agendamento => agendamento.data === dataAtual.toISOString().split('T')[0]
  );

  const proximoDia = () => {
    const novadata = new Date(dataAtual);
    novadata.setDate(novadata.getDate() + 1);
    setDataAtual(novadata);
  };

  const diaAnterior = () => {
    const novadata = new Date(dataAtual);
    novadata.setDate(novadata.getDate() - 1);
    setDataAtual(novadata);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie os agendamentos da barbearia
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Controles de Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              {dataAtual.toLocaleDateString("pt-BR", { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={diaAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setDataAtual(new Date())}
              >
                Hoje
              </Button>
              <Button variant="outline" size="sm" onClick={proximoDia}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {agendamentosDodia.length} agendamento(s) para este dia
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Agendamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Agendamentos do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agendamentosDodia.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum agendamento para este dia
                  </TableCell>
                </TableRow>
              ) : (
                agendamentosDodia
                  .sort((a, b) => a.horario.localeCompare(b.horario))
                  .map((agendamento) => (
                    <TableRow key={agendamento.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {agendamento.horario}
                      </TableCell>
                      <TableCell>{agendamento.cliente}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {agendamento.telefone}
                      </TableCell>
                      <TableCell>{agendamento.servico}</TableCell>
                      <TableCell className="font-medium">
                        R$ {agendamento.preco.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(agendamento.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditarAgendamento(agendamento.id)}
                            disabled={agendamento.status === "cancelado"}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelarAgendamento(agendamento.id)}
                            disabled={agendamento.status === "cancelado" || agendamento.status === "finalizado"}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agenda;

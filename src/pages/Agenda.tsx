import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User } from "lucide-react";
import { api } from "@/services/api";

interface Agendamento {
  id: string;
  cliente_id: string;
  servico: string;
  data_hora: string;
  preco?: number;
  status?: "confirmado" | "pendente" | "finalizado";
}

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [open, setOpen] = useState(false);
  const [clienteId, setClienteId] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👉 Mock fallback
  const mockAgendamentos: Agendamento[] = [
    {
      id: "1",
      cliente_id: "João Silva",
      servico: "Corte e Barba",
      data_hora: "2025-08-27T14:30",
      status: "confirmado",
    },
    {
      id: "2",
      cliente_id: "Pedro Santos",
      servico: "Corte",
      data_hora: "2025-08-27T15:00",
      status: "pendente",
    },
    {
      id: "3",
      cliente_id: "Carlos Lima",
      servico: "Barba",
      data_hora: "2025-08-27T15:30",
      status: "finalizado",
    },
  ];

  // 👉 Buscar agendamentos da API
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const res = await api.get("/agendamentos/owner");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAgendamentos(res.data);
        } else {
          setAgendamentos(mockAgendamentos); // fallback
        }
      } catch (err) {
        console.error(err);
        setAgendamentos(mockAgendamentos); // fallback
      }
    };
    fetchAgendamentos();
  }, []);

  // 👉 Criar agendamento
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/agendamentos/owner", {
        cliente_id: clienteId,
        servico,
        data_hora: dataHora,
        preco: 0,
      });
      setAgendamentos((prev) => [res.data, ...prev]);
      setOpen(false);
      setClienteId("");
      setServico("");
      setDataHora("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar agendamento");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "confirmado":
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case "pendente":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pendente</Badge>;
      case "finalizado":
        return <Badge className="bg-blue-100 text-blue-800">Finalizado</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie os agendamentos do dia - {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>+ Novo Agendamento</Button>
      </div>

      {/* Lista de Agendamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Próximos Agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agendamentos.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {a.cliente_id}
                    </p>
                    <p className="text-sm text-muted-foreground">{a.servico}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {new Date(a.data_hora).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {getStatusBadge(a.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog Novo Agendamento */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <Label>Cliente (ID ou Nome)</Label>
              <Input
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              />
            </div>
            <div>
              <Label>Serviço</Label>
              <Input
                value={servico}
                onChange={(e) => setServico(e.target.value)}
              />
            </div>
            <div>
              <Label>Data/Horário</Label>
              <Input
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
              />
            </div>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agenda;

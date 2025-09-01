import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

interface Agendamento {
  id: string;
  cliente: string;
  servico: string;
  horario: string;
}

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👉 Listar agendamentos
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const res = await api.get("/agendamentos");
        setAgendamentos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgendamentos();
  }, []);

  // 👉 Criar/Editar agendamento
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      if (editId) {
        // editar
        const res = await api.put(`/agendamentos/${editId}`, {
          cliente,
          servico,
          horario,
        });
        setAgendamentos((prev) =>
          prev.map((a) => (a.id === editId ? res.data : a))
        );
      } else {
        // criar
        const res = await api.post("/agendamentos/owner", {
          cliente,
          servico,
          horario,
        });
        setAgendamentos((prev) => [res.data, ...prev]);
      }
      setOpen(false);
      setEditId(null);
      setCliente("");
      setServico("");
      setHorario("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar agendamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <Button onClick={() => setOpen(true)}>+ Novo Agendamento</Button>
      </div>

      <ul className="space-y-2">
        {agendamentos.map((a) => (
          <li
            key={a.id}
            className="p-3 bg-white rounded shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">{a.cliente}</p>
              <p className="text-sm">{a.servico}</p>
              <p className="text-xs text-gray-500">{a.horario}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditId(a.id);
                setCliente(a.cliente);
                setServico(a.servico);
                setHorario(a.horario);
                setOpen(true);
              }}
            >
              Editar
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Editar Agendamento" : "Novo Agendamento"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <Label>Cliente</Label>
              <Input value={cliente} onChange={(e) => setCliente(e.target.value)} />
            </div>
            <div>
              <Label>Serviço</Label>
              <Input value={servico} onChange={(e) => setServico(e.target.value)} />
            </div>
            <div>
              <Label>Horário</Label>
              <Input
                type="datetime-local"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
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

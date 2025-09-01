import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

interface Agendamento {
  id: string;
  cliente_id: string;
  servico: string;
  data_hora: string;
  preco?: number;
}

const Agenda = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [clienteId, setClienteId] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👉 Listar agendamentos
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const res = await api.get("/agendamentos/owner"); // rota certa do backend
        if (Array.isArray(res.data)) {
          setAgendamentos(res.data);
        } else {
          console.error("Resposta inesperada:", res.data);
          setAgendamentos([]);
        }
      } catch (err) {
        console.error(err);
        setAgendamentos([]);
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
        // 🚧 rota PUT ainda não existe no backend!
        console.warn("Funcionalidade de edição ainda não implementada no backend");
      } else {
        const res = await api.post("/agendamentos/owner", {
          cliente_id: clienteId,
          servico,
          data_hora: dataHora,
          preco: 0,
        });
        setAgendamentos((prev) => [res.data, ...prev]);
      }
      setOpen(false);
      setEditId(null);
      setClienteId("");
      setServico("");
      setDataHora("");
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

      {agendamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum agendamento encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {agendamentos.map((a) => (
            <li
              key={a.id}
              className="p-3 bg-white rounded shadow flex justify-between"
            >
              <div>
                <p className="font-semibold">Cliente #{a.cliente_id}</p>
                <p className="text-sm">{a.servico}</p>
                <p className="text-xs text-gray-500">{a.data_hora}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditId(a.id);
                  setClienteId(a.cliente_id);
                  setServico(a.servico);
                  setDataHora(a.data_hora);
                  setOpen(true);
                }}
              >
                Editar
              </Button>
            </li>
          ))}
        </ul>
      )}

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
              <Label>Cliente (ID)</Label>
              <Input
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              />
            </div>
            <div>
              <Label>Serviço</Label>
              <Input value={servico} onChange={(e) => setServico(e.target.value)} />
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

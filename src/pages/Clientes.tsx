import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  aniversario?: string;
  obs?: string;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);

  // 👉 Listar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await api.get("/clientes");
        const data = Array.isArray(res.data) ? res.data : [];

        if (data.length === 0) {
          // Mock
          setClientes([
            { id: "1", nome: "Maria Oliveira", telefone: "11999999999", aniversario: "1990-05-12", obs: "Prefere WhatsApp" },
            { id: "2", nome: "João Silva", telefone: "11988888888", aniversario: "1985-09-21" },
          ]);
        } else {
          setClientes(data);
        }
      } catch (err) {
        console.error(err);
        setClientes([
          { id: "1", nome: "Maria Oliveira", telefone: "11999999999", aniversario: "1990-05-12", obs: "Prefere WhatsApp" },
          { id: "2", nome: "João Silva", telefone: "11988888888", aniversario: "1985-09-21" },
        ]);
      }
    };
    fetchClientes();
  }, []);

  // 👉 Criar/Editar cliente
  const handleSave = async () => {
    setLoading(true);
    try {
      if (editId) {
        const res = await api.put(`/clientes/${editId}`, {
          nome, telefone, aniversario, obs
        });
        setClientes(prev => prev.map(c => (c.id === editId ? res.data : c)));
      } else {
        const res = await api.post("/clientes/owner", {
          nome, telefone, aniversario, obs
        });
        setClientes(prev => [res.data, ...prev]);
      }
      setOpen(false);
      setEditId(null);
      setNome("");
      setTelefone("");
      setAniversario("");
      setObs("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={() => setOpen(true)}>+ Novo Cliente</Button>
      </div>

      <ul className="space-y-2">
        {clientes.map(c => (
          <li key={c.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">{c.nome}</p>
              <p className="text-sm">{c.telefone}</p>
              {c.aniversario && <p className="text-xs text-gray-500">🎂 {c.aniversario}</p>}
              {c.obs && <p className="text-xs text-gray-400">{c.obs}</p>}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditId(c.id);
                setNome(c.nome);
                setTelefone(c.telefone);
                setAniversario(c.aniversario || "");
                setObs(c.obs || "");
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
            <DialogTitle>{editId ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
            <div>
              <Label>Aniversário</Label>
              <Input type="date" value={aniversario} onChange={(e) => setAniversario(e.target.value)} />
            </div>
            <div>
              <Label>Observações</Label>
              <Input value={obs} onChange={(e) => setObs(e.target.value)} />
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

export default Clientes;

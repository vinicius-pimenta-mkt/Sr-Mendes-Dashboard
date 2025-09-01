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
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👉 Listar clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await api.get("/clientes");
        const data = Array.isArray(res.data) ? res.data : [];
        setClientes(data);
      } catch (err) {
        console.error(err);
        setClientes([]);
      }
    };
    fetchClientes();
  }, []);

  // 👉 Criar cliente
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/clientes/owner", {
        nome,
        telefone,
        aniversario,
        obs,
      });
      setClientes((prev) => [res.data, ...prev]);
      setOpen(false);
      setNome("");
      setTelefone("");
      setAniversario("");
      setObs("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao salvar cliente");
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
        {clientes.map((c) => (
          <li key={c.id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">{c.nome}</p>
            <p className="text-sm">{c.telefone}</p>
            {c.aniversario && (
              <p className="text-xs text-gray-500">
                Aniversário: {c.aniversario}
              </p>
            )}
            {c.obs && <p className="text-xs italic">{c.obs}</p>}
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div>
              <Label>Aniversário</Label>
              <Input
                type="date"
                value={aniversario}
                onChange={(e) => setAniversario(e.target.value)}
              />
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

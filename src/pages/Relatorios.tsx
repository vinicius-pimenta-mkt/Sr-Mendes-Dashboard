import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

interface Relatorio {
  id: string;
  tipo: string;
  valor: number;
  data: string;
}

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(false);

  // 👉 Listar relatórios
  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await api.get("/relatorios");
        const data = Array.isArray(res.data) ? res.data : [];
        setRelatorios(data);
      } catch (err) {
        console.error(err);
        setRelatorios([]);
      }
    };
    fetchRelatorios();
  }, []);

  // 👉 Exportar relatórios (ainda fake — depois conectamos ao PDF real)
  const handleExport = () => {
    alert("Exportando relatórios em PDF (mock). Depois conectamos ao backend real.");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <Button onClick={handleExport}>Exportar PDF</Button>
      </div>

      <ul className="space-y-2">
        {relatorios.map((r) => (
          <li key={r.id} className="p-3 bg-white rounded shadow">
            <p className="font-semibold">{r.tipo}</p>
            <p className="text-sm">Valor: R$ {r.valor}</p>
            <p className="text-xs text-gray-500">
              Data: {new Date(r.data).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Relatorios;

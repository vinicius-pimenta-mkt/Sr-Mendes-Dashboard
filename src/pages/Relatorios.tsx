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
        let data = Array.isArray(res.data) ? res.data : [];

        // Se não houver dados reais → usar MOCK para teste
        if (!data || data.length === 0) {
          data = [
            {
              id: "1",
              tipo: "Corte de Cabelo",
              valor: 50,
              data: new Date().toISOString(),
            },
            {
              id: "2",
              tipo: "Barba",
              valor: 30,
              data: new Date().toISOString(),
            },
            {
              id: "3",
              tipo: "Corte + Barba",
              valor: 70,
              data: new Date().toISOString(),
            },
          ];
        }

        setRelatorios(data);
      } catch (err) {
        console.error(err);
        // fallback → MOCK também
        setRelatorios([
          {
            id: "1",
            tipo: "Corte de Cabelo",
            valor: 50,
            data: new Date().toISOString(),
          },
          {
            id: "2",
            tipo: "Barba",
            valor: 30,
            data: new Date().toISOString(),
          },
          {
            id: "3",
            tipo: "Corte + Barba",
            valor: 70,
            data: new Date().toISOString(),
          },
        ]);
      }
    };
    fetchRelatorios();
  }, []);

  // 👉 Exportar relatórios (gera PDF/salvar como PDF)
  const handleExport = () => {
    window.print(); // abre a janela de impressão → usuário pode salvar como PDF
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

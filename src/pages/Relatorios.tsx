import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

const Relatorios = () => {
  const handleExport = async () => {
    try {
      const res = await api.get("/relatorios/export.pdf", {
        responseType: "blob",
      });

      // Criar link para baixar PDF
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Erro ao exportar relatório", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
      <Button onClick={handleExport}>📄 Exportar Relatório</Button>
    </div>
  );
};

export default Relatorios;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,  
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Calendar,
  Eye,
  Scissors,
  DollarSign,
  Gift
} from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  aniversario: string;
  historico: {
    totalVisitas: number;
    ultimaVisita: string;
    servicoMaisFeito: string;
    gastoTotal: number;
  };
  servicosRealizados: Array<{
    data: string;
    servico: string;
    preco: number;
  }>;
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);

  // Simular dados para demonstração
  useEffect(() => {
    const clientesDemo: Cliente[] = [
      {
        id: "1",
        nome: "João Silva",
        telefone: "(11) 99999-9999",
        email: "joao@email.com",
        aniversario: "1985-03-15",
        historico: {
          totalVisitas: 12,
          ultimaVisita: "2024-08-20",
          servicoMaisFeito: "Corte e Barba",
          gastoTotal: 540
        },
        servicosRealizados: [
          { data: "2024-08-20", servico: "Corte e Barba", preco: 45 },
          { data: "2024-08-05", servico: "Corte", preco: 30 },
          { data: "2024-07-20", servico: "Corte e Barba", preco: 45 }
        ]
      },
      {
        id: "2",
        nome: "Pedro Santos",
        telefone: "(11) 88888-8888", 
        email: "pedro@email.com",
        aniversario: "1990-07-22",
        historico: {
          totalVisitas: 8,
          ultimaVisita: "2024-08-18",
          servicoMaisFeito: "Corte",
          gastoTotal: 360
        },
        servicosRealizados: [
          { data: "2024-08-18", servico: "Corte", preco: 30 },
          { data: "2024-08-01", servico: "Corte", preco: 30 },
          { data: "2024-07-15", servico: "Corte e Barba", preco: 45 }
        ]
      },
      {
        id: "3",
        nome: "Carlos Lima",
        telefone: "(11) 77777-7777",
        email: "carlos@email.com", 
        aniversario: "1988-11-10",
        historico: {
          totalVisitas: 6,
          ultimaVisita: "2024-08-15",
          servicoMaisFeito: "Barba",
          gastoTotal: 270
        },
        servicosRealizados: [
          { data: "2024-08-15", servico: "Barba", preco: 20 },
          { data: "2024-07-30", servico: "Corte e Barba", preco: 45 },
          { data: "2024-07-10", servico: "Barba", preco: 20 }
        ]
      }
    ];
    setClientes(clientesDemo);
  }, []);

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    cliente.telefone.includes(termoBusca)
  );

  const abrirDetalhesCliente = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setDialogAberto(true);
  };

  const proximoAniversario = (aniversario: string) => {
    const hoje = new Date();
    const aniverData = new Date(aniversario);
    aniverData.setFullYear(hoje.getFullYear());
    
    if (aniverData < hoje) {
      aniverData.setFullYear(hoje.getFullYear() + 1);
    }
    
    const diffTime = aniverData.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro e histórico dos seus clientes
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{clientes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aniversariantes do Mês  
            </CardTitle>
            <Gift className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {clientes.filter(c => {
                const ultimaVisita = new Date(c.historico.ultimaVisita);
                const hoje = new Date();
                const diffDays = Math.floor((hoje.getTime() - ultimaVisita.getTime()) / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {(clientes.reduce((acc, c) => acc + c.historico.gastoTotal, 0) / clientes.length || 0).toFixed(2)}
            </div>
          </CardContent>  
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Pesquisar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Visitas</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead>Gasto Total</TableHead>
                <TableHead>Aniversário</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {termoBusca ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado"}
                  </TableCell>
                </TableRow>
              ) : (
                clientesFiltrados.map((cliente) => {
                  const diasParaAniversario = proximoAniversario(cliente.aniversario);
                  return (
                    <TableRow key={cliente.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {cliente.nome}
                        {diasParaAniversario <= 7 && (
                          <Badge variant="outline" className="ml-2 text-purple-600 border-purple-300">
                            <Gift className="h-3 w-3 mr-1" />
                            {diasParaAniversario}d
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {cliente.telefone}
                      </TableCell>
                      <TableCell>{cliente.historico.totalVisitas}</TableCell>
                      <TableCell>
                        {new Date(cliente.historico.ultimaVisita).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="font-medium">
                        R$ {cliente.historico.gastoTotal.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {new Date(cliente.aniversario).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => abrirDetalhesCliente(cliente)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Cliente */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Detalhes do Cliente
            </DialogTitle>
          </DialogHeader>
          
          {clienteSelecionado && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{clienteSelecionado.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {clienteSelecionado.telefone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="h-4 w-4 text-muted-foreground" />
                      {new Date(clienteSelecionado.aniversario).toLocaleDateString("pt-BR")}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fidelização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total de Visitas</span>
                      <span className="font-medium">{clienteSelecionado.historico.totalVisitas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Última Visita</span>
                      <span className="font-medium">
                        {new Date(clienteSelecionado.historico.ultimaVisita).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Serviço Preferido</span>
                      <span className="font-medium">{clienteSelecionado.historico.servicoMaisFeito}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gasto Total</span>
                      <span className="font-medium">R$ {clienteSelecionado.historico.gastoTotal.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Histórico de Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="h-5 w-5 text-accent" />
                    Histórico de Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clienteSelecionado.servicosRealizados.map((servico, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{servico.servico}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(servico.data).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <span className="font-medium">R$ {servico.preco.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clientes;

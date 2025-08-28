import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Agenda from "@/pages/Agenda"; 
import Relatorios from "@/pages/Relatorios";
import Clientes from "@/pages/Clientes";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </SidebarProvider>
      <Toaster />
    </Router>
  );
}

export default App;
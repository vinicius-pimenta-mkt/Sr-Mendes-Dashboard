import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between border-b bg-card px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-muted" />
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/1cb88740-dc6a-43b4-b1d8-965a046512d0.png" 
                alt="Sr. Mendes Barbearia" 
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Sr. Mendes Barbearia</h1>
                <p className="text-sm text-muted-foreground">Painel Administrativo</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR")}
          </div>
        </header>
        
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </>
  );
}
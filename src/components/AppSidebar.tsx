import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Users,
  Scissors
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Clientes", url: "/clientes", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-accent text-accent-foreground font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent className="bg-card">
        <SidebarGroup className="py-6">
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Menu Principal
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavCls(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <Scissors className="h-4 w-4 text-accent-foreground" />
              </div>  
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Sr. Mendes
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Administrador
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
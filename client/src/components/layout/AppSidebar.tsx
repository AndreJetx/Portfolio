import { Link, useLocation } from "wouter";
import { 
  Home, 
  Briefcase, 
  Code2, 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  { title: "Sobre", url: "/", icon: User },
  { title: "Projetos", url: "/projects", icon: Code2 },
  { title: "Experiência", url: "/experience", icon: Briefcase },
  { title: "Habilidades", url: "/skills", icon: Code2 },
  { title: "Contato", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-white/10 bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Avatar className="h-24 w-24 border-2 border-white/10 relative">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <h3 className="font-display font-bold text-lg text-white tracking-tight">Alex Designer</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Engenheiro Full Stack</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 px-2">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton 
                      isActive={location === item.url}
                      tooltip={item.title}
                      className={`
                        w-full justify-start gap-3 h-10 px-3 rounded-lg transition-all duration-200
                        ${location === item.url 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}
                      `}
                    >
                      <item.icon className={`h-4 w-4 ${location === item.url ? 'text-primary' : ''}`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="flex justify-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
             className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 opacity-50">
          © 2024 Alex D.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

import { Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import { 
  Briefcase, 
  Code2, 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Settings,
  Moon,
  Sun,
  Languages,
  ChevronDown
} from "lucide-react";
import { useProfile } from "@/hooks/use-portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider as TooltipProviderUI,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const navKeys = [
  { key: "about" as const, url: "/", icon: User },
  { key: "projects", url: "/projects", icon: Code2 },
  { key: "experience", url: "/experience", icon: Briefcase },
  { key: "skills", url: "/skills", icon: Code2 },
  { key: "contact", url: "/contact", icon: Mail },
  { key: "panel", url: "/admin", icon: Settings },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";
}

export function AppSidebar() {
  const [location] = useLocation();
  const { data: profile } = useProfile();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const isDark = theme === "dark";
  const items = navKeys.map(({ key, url, icon }) => ({ title: t.nav[key], url, icon }));

  return (
    <Sidebar className="border-r border-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/60">
      <SidebarHeader className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Avatar className="h-24 w-24 border-2 border-white/10 relative">
              <AvatarImage src={profile?.avatarUrl ?? undefined} />
              <AvatarFallback>{profile ? getInitials(profile.name) : "?"}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <h3 className="font-display font-bold text-lg text-foreground tracking-tight">{profile?.name ?? "—"}</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{profile?.title ?? "—"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 w-full px-2">
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-2 flex items-center gap-2">
            <TooltipProviderUI delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 rounded-lg border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/30"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{isDark ? t.nav.themeLight : t.nav.themeDark}</TooltipContent>
              </Tooltip>
            </TooltipProviderUI>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-1 min-w-0 h-9 rounded-lg border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/30 font-medium overflow-hidden justify-start gap-2"
                >
                  <Languages className="h-4 w-4 shrink-0" />
                  <span className="truncate min-w-0 flex-1">{locale === "pt" ? t.nav.switchToPt : t.nav.switchToEn}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48" side="right" sideOffset={8}>
                <DropdownMenuLabel>{t.nav.language}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={locale} onValueChange={(v) => setLocale(v as "pt" | "en")}>
                  <DropdownMenuRadioItem value="pt">{t.nav.switchToPt}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">{t.nav.switchToEn}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2 px-2">{t.nav.navigation}</SidebarGroupLabel>
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
          {profile?.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Github className="h-5 w-5" />
            </a>
          )}
          {profile?.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {profile?.twitterUrl && (
            <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer"
               className="text-muted-foreground hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 opacity-50">
          {t.common.copyright} {new Date().getFullYear()} {profile?.name?.split(" ").pop() ?? ""}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

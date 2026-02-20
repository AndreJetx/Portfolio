import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Terminal, Database, Palette, Cpu } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {t.home.available}
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t.home.building} <br />
            <span className="text-gradient-primary-animated">{t.home.experiences}</span>.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t.home.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/projects">
              <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                {t.home.viewProjects} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-border hover:bg-muted transition-all">
              {t.home.downloadCv} <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Terminal className="h-5 w-5 text-blue-400" />} 
            label={t.home.frontend} 
            value="React & TS" 
          />
          <StatCard 
            icon={<Database className="h-5 w-5 text-green-400" />} 
            label={t.home.backend} 
            value="Node & PG" 
          />
          <StatCard 
            icon={<Palette className="h-5 w-5 text-purple-400" />} 
            label={t.home.design} 
            value="Tailwind" 
          />
          <StatCard 
            icon={<Cpu className="h-5 w-5 text-orange-400" />} 
            label={t.home.devops} 
            value="Docker" 
          />
        </div>
      </div>
    </PageTransition>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-card/50 border border-border hover:border-primary/20 hover:bg-card transition-colors group">
      <div className="mb-2 p-2 bg-muted rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold text-foreground">{value}</div>
    </div>
  );
}

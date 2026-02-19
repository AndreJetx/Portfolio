import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Terminal, Database, Palette, Cpu } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            DISPONÍVEL PARA NOVOS PROJETOS
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Construindo <br />
            <span className="text-gradient-primary">experiências</span> digitais.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Sou um Engenheiro Full Stack apaixonado por criar interfaces bonitas, intuitivas e performáticas. Eu conecto o design à engenharia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/projects">
              <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-white/10 hover:bg-white/5 hover:text-white transition-all">
              Download CV <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Terminal className="h-5 w-5 text-blue-400" />} 
            label="Frontend" 
            value="React & TS" 
          />
          <StatCard 
            icon={<Database className="h-5 w-5 text-green-400" />} 
            label="Backend" 
            value="Node & PG" 
          />
          <StatCard 
            icon={<Palette className="h-5 w-5 text-purple-400" />} 
            label="Design" 
            value="Tailwind" 
          />
          <StatCard 
            icon={<Cpu className="h-5 w-5 text-orange-400" />} 
            label="DevOps" 
            value="Docker" 
          />
        </div>
      </div>
    </PageTransition>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors group">
      <div className="mb-2 p-2 bg-white/5 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold text-white">{value}</div>
    </div>
  );
}

"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { useProjects } from "@/hooks/use-portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold">{t.projects.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">{t.projects.subtitle}</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-card overflow-hidden h-[400px]">
                <Skeleton className="h-48 w-full bg-white/5" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-2/3 bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="group relative flex flex-col rounded-2xl border border-white/5 bg-card/50 overflow-hidden hover:border-primary/20 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Featured</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-xs text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 flex items-center gap-3">
                    {project.demoUrl && (
                      <Button asChild size="sm" className="rounded-full px-4 h-9 bg-primary text-primary-foreground">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">{t.projects.liveDemo} <ExternalLink className="ml-2 h-3 w-3" /></a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="sm" className="rounded-full px-4 h-9 border-border">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-3 w-3" /> {t.projects.source}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

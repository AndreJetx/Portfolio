"use client";

import { PageTransition } from "@/components/layout/PageTransition";
import { useSkills } from "@/hooks/use-portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2, Database, Layout, Server, Wrench, Cloud } from "lucide-react";
import * as SimpleIcons from "react-icons/si";

const ICON_ALIASES: Record<string, string> = { SiAmazonaws: "SiAmazonwebservices" };

function getTechIcon(iconName: string) {
  const name = iconName ? (ICON_ALIASES[iconName] || iconName) : "";
  const IconComponent = name ? (SimpleIcons as Record<string, React.ComponentType<{ className?: string }>>)[name] : null;
  return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
}

function getIcon(category: string) {
  switch (category.toLowerCase()) {
    case "frontend": return <Layout className="w-5 h-5" />;
    case "backend": return <Server className="w-5 h-5" />;
    case "database": return <Database className="w-5 h-5" />;
    case "devops": return <Cloud className="w-5 h-5" />;
    case "tools": return <Wrench className="w-5 h-5" />;
    default: return <Code2 className="w-5 h-5" />;
  }
}

export default function SkillsPage() {
  const { data: skills, isLoading } = useSkills();
  const { t } = useLanguage();
  const categories = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold">{t.skills.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">{t.skills.subtitle}</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-48 w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-48 w-full rounded-2xl bg-white/5" />
          </div>
        ) : (
          <div className="grid gap-8">
            {Object.entries(categories).map(([category, categorySkills]) => (
              <div key={category} className="bg-card/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{getIcon(category)}</div>
                  <h3 className="text-xl font-bold capitalize">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-8 justify-start">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex flex-col items-center gap-3 group hover:scale-110 transition-transform">
                      <div className="p-4 bg-white/5 rounded-2xl text-muted-foreground group-hover:text-primary group-hover:bg-primary/10">{getTechIcon(skill.icon || "")}</div>
                      <span className="font-medium text-xs text-muted-foreground">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

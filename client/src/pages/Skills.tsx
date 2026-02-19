import { PageTransition } from "@/components/layout/PageTransition";
import { useSkills } from "@/hooks/use-portfolio";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Terminal, 
  Wrench,
  Cloud
} from "lucide-react";

const getIcon = (category: string) => {
  switch(category.toLowerCase()) {
    case 'frontend': return <Layout className="w-5 h-5" />;
    case 'backend': return <Server className="w-5 h-5" />;
    case 'database': return <Database className="w-5 h-5" />;
    case 'devops': return <Cloud className="w-5 h-5" />;
    case 'tools': return <Wrench className="w-5 h-5" />;
    default: return <Code2 className="w-5 h-5" />;
  }
};

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  // Group skills by category
  const categories = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold">Technical Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive overview of my technical expertise and the technologies I work with.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
          </div>
        ) : (
          <div className="grid gap-8">
            {Object.entries(categories).map(([category, categorySkills]) => (
              <div 
                key={category} 
                className="bg-card/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold capitalize tracking-tight">{category}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="space-y-2 group">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
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

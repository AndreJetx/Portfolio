import { PageTransition } from "@/components/layout/PageTransition";
import { useExperience } from "@/hooks/use-portfolio";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const { data: experience, isLoading } = useExperience();

  // Sort by order or date if available
  const sortedExperience = experience?.sort((a, b) => a.order - b.order);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-12">
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold">Experiência</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Minha jornada profissional e os cargos que ocupei na indústria.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8 pl-8">
            <Skeleton className="h-40 w-full bg-white/5 rounded-2xl" />
            <Skeleton className="h-40 w-full bg-white/5 rounded-2xl" />
            <Skeleton className="h-40 w-full bg-white/5 rounded-2xl" />
          </div>
        ) : (
          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {sortedExperience?.map((job) => (
              <div key={job.id} className="relative pl-8 md:pl-12 group">
                {/* Timeline Node */}
                <div className="absolute -left-[5px] top-2 h-[10px] w-[10px] rounded-full bg-primary border-2 border-background group-hover:scale-125 transition-transform duration-300 ring-4 ring-primary/20" />
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium text-white/80">{job.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-3 h-3" />
                    {job.period}
                  </div>
                </div>

                <div className="bg-card/40 border border-white/5 rounded-2xl p-6 hover:bg-card/60 transition-colors backdrop-blur-sm">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

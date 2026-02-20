import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "@shared/schema";

// ============================================
// PROFILE
// ============================================

export function useProfile() {
  return useQuery({
    queryKey: [api.profile.get.path],
    queryFn: async () => {
      const res = await fetch(api.profile.get.path);
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      return data as Profile;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// ============================================
// PROJECTS
// ============================================

export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: [api.projects.get.path, id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      return api.projects.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// ============================================
// SKILLS
// ============================================

export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// EXPERIENCE
// ============================================

export function useExperience() {
  return useQuery({
    queryKey: [api.experience.list.path],
    queryFn: async () => {
      const res = await fetch(api.experience.list.path);
      if (!res.ok) throw new Error("Failed to fetch experience");
      return api.experience.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// CONTACT
// ============================================

export function useContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Verifique os dados e tente novamente.");
        }
        throw new Error("Falha ao enviar a mensagem.");
      }
      
      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: (error as Error).message || "Falha ao enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  });
}

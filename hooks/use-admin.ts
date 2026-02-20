import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Project, Skill, Experience, Message, Profile, InsertProject, InsertSkill, InsertExperience } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const credentials = { credentials: "include" as const };

function adminFetch(url: string, options: RequestInit = {}) {
  return fetch(url, { ...options, credentials: "include" });
}

// ============ Auth ============

export function useAdminAuth() {
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["admin", "me"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.me.path);
      if (res.status === 401) return false;
      if (!res.ok) throw new Error("Failed to check auth");
      return true;
    },
    retry: false,
    staleTime: 60_000,
  });

  const login = useMutation({
    mutationFn: async (password: string) => {
      const res = await adminFetch(api.admin.login.path, {
        method: api.admin.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login falhou");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["admin", "me"], true);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await adminFetch(api.admin.logout.path, { method: api.admin.logout.method });
      if (!res.ok) throw new Error("Logout falhou");
    },
    onSuccess: () => {
      queryClient.setQueryData(["admin", "me"], false);
    },
  });

  return { isAdmin: !!isAdmin, isLoading, login, logout };
}

// ============ Admin Projects ============

export function useAdminProjects() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.projects.path);
      if (!res.ok) throw new Error("Falha ao carregar projetos");
      return res.json() as Promise<Project[]>;
    },
  });

  const create = useMutation({
    mutationFn: async (data: InsertProject) => {
      const res = await adminFetch(api.admin.projects.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao criar");
      }
      return res.json() as Promise<Project>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: [api.projects.list.path] });
      toast({ title: "Projeto criado" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProject> }) => {
      const res = await adminFetch(api.admin.project(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao atualizar");
      }
      return res.json() as Promise<Project>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: [api.projects.list.path] });
      toast({ title: "Projeto atualizado" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(api.admin.project(id), { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: [api.projects.list.path] });
      toast({ title: "Projeto excluído", variant: "destructive" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  return { ...query, create, update, remove };
}

// ============ Admin Skills ============

export function useAdminSkills() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["admin", "skills"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.skills.path);
      if (!res.ok) throw new Error("Falha ao carregar habilidades");
      return res.json() as Promise<Skill[]>;
    },
  });

  const create = useMutation({
    mutationFn: async (data: InsertSkill) => {
      const res = await adminFetch(api.admin.skills.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao criar");
      }
      return res.json() as Promise<Skill>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "skills"] });
      queryClient.invalidateQueries({ queryKey: [api.skills.list.path] });
      toast({ title: "Habilidade criada" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertSkill> }) => {
      const res = await adminFetch(api.admin.skill(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao atualizar");
      }
      return res.json() as Promise<Skill>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "skills"] });
      queryClient.invalidateQueries({ queryKey: [api.skills.list.path] });
      toast({ title: "Habilidade atualizada" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(api.admin.skill(id), { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "skills"] });
      queryClient.invalidateQueries({ queryKey: [api.skills.list.path] });
      toast({ title: "Habilidade excluída", variant: "destructive" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  return { ...query, create, update, remove };
}

// ============ Admin Experience ============

export function useAdminExperience() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["admin", "experience"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.experience.path);
      if (!res.ok) throw new Error("Falha ao carregar experiência");
      return res.json() as Promise<Experience[]>;
    },
  });

  const create = useMutation({
    mutationFn: async (data: InsertExperience) => {
      const res = await adminFetch(api.admin.experience.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao criar");
      }
      return res.json() as Promise<Experience>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "experience"] });
      queryClient.invalidateQueries({ queryKey: [api.experience.list.path] });
      toast({ title: "Experiência criada" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertExperience> }) => {
      const res = await adminFetch(api.admin.experienceItem(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao atualizar");
      }
      return res.json() as Promise<Experience>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "experience"] });
      queryClient.invalidateQueries({ queryKey: [api.experience.list.path] });
      toast({ title: "Experiência atualizada" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(api.admin.experienceItem(id), { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "experience"] });
      queryClient.invalidateQueries({ queryKey: [api.experience.list.path] });
      toast({ title: "Experiência excluída", variant: "destructive" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  return { ...query, create, update, remove };
}

// ============ Admin Profile ============

export function useAdminProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.profile.path);
      if (!res.ok) throw new Error("Falha ao carregar perfil");
      return res.json() as Promise<Profile>;
    },
  });

  const update = useMutation({
    mutationFn: async (data: Partial<Pick<Profile, "avatarUrl" | "name" | "title" | "githubUrl" | "linkedinUrl" | "twitterUrl" | "contactEmail" | "contactLocation" | "contactPhone" | "cvUrl" | "showCvButton">>) => {
      const res = await adminFetch(api.admin.profile.path, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao atualizar");
      }
      return res.json() as Promise<Profile>;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData([api.profile.get.path], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["admin", "profile"] });
      toast({ title: "Perfil atualizado" });
    },
    onError: (e) => toast({ title: "Erro", description: (e as Error).message, variant: "destructive" }),
  });

  return { ...query, update };
}

// ============ Admin Messages (read only) ============

export function useAdminMessages() {
  return useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const res = await adminFetch(api.admin.messages.path);
      if (!res.ok) throw new Error("Falha ao carregar mensagens");
      return res.json() as Promise<Message[]>;
    },
  });
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAdminAuth, useAdminProjects, useAdminSkills, useAdminExperience, useAdminMessages, useAdminProfile } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Lock, Plus, Pencil, Trash2 } from "lucide-react";
import type { Project, Skill, Experience, InsertProject, InsertSkill, InsertExperience } from "@shared/schema";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 rounded-2xl border border-white/10 bg-card/50 shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Lock className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-display font-bold">Área do proprietário</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate(password);
        }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de administrador"
            className="mt-1"
            autoFocus
          />
        </div>
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? "Entrando…" : "Entrar"}
        </Button>
        {login.isError && (
          <p className="text-sm text-destructive">{(login.error as Error).message}</p>
        )}
      </form>
    </div>
  );
}

function AdminProjectsTab() {
  const { data: projects, isLoading, create, update, remove } = useAdminProjects();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<InsertProject>({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    githubUrl: "",
    demoUrl: "",
    featured: false,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", tags: [], githubUrl: "", demoUrl: "", featured: false });
    setDialogOpen(true);
  };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
      tags: p.tags ?? [],
      githubUrl: p.githubUrl ?? "",
      demoUrl: p.demoUrl ?? "",
      featured: p.featured ?? false,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", tags: [], githubUrl: "", demoUrl: "", featured: false });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsStr = typeof form.tags === "string" ? form.tags : (form.tags as string[]).join(",");
    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const payload = { ...form, tags };
    if (editing) {
      update.mutate({ id: editing.id, data: payload }, { onSuccess: closeDialog });
    } else {
      create.mutate(payload, { onSuccess: closeDialog });
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogTrigger asChild>
          <Button onClick={openCreate}><Plus className="h-4 w-4" /> Novo projeto</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar projeto" : "Novo projeto"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required rows={3} />
            </div>
            <div>
              <Label>URL da imagem</Label>
              <Input value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))} required />
            </div>
            <div>
              <Label>Tags (separadas por vírgula)</Label>
              <Input value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value.split(",").map((t) => t.trim()) }))} />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input value={form.githubUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))} />
            </div>
            <div>
              <Label>Demo URL</Label>
              <Input value={form.demoUrl ?? ""} onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.featured ?? false} onCheckedChange={(c) => setForm((f) => ({ ...f, featured: c }))} />
              <Label>Destaque</Label>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={create.isPending || update.isPending}>{editing ? "Salvar" : "Criar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.featured ? "Sim" : "Não"}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => remove.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AdminSkillsTab() {
  const { data: skills, isLoading, create, update, remove } = useAdminSkills();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<InsertSkill>({ name: "", category: "Frontend", proficiency: 0, icon: "" });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", category: "Frontend", proficiency: 0, icon: "" });
    setDialogOpen(true);
  };
  const openEdit = (s: Skill) => {
    setEditing(s);
    setForm({ name: s.name, category: s.category, proficiency: s.proficiency ?? 0, icon: s.icon ?? "" });
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm({ name: "", category: "Frontend", proficiency: 0, icon: "" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      update.mutate({ id: editing.id, data: form }, { onSuccess: closeDialog });
    } else {
      create.mutate(form, { onSuccess: closeDialog });
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogTrigger asChild>
          <Button onClick={openCreate}><Plus className="h-4 w-4" /> Nova habilidade</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar habilidade" : "Nova habilidade"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required /></div>
            <div><Label>Categoria</Label><Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Frontend, Backend, DevOps, Database" /></div>
            <div><Label>Proficiência (0-100)</Label><Input type="number" min={0} max={100} value={form.proficiency ?? 0} onChange={(e) => setForm((f) => ({ ...f, proficiency: Number(e.target.value) || 0 }))} /></div>
            <div><Label>Ícone (nome Lucide)</Label><Input value={form.icon ?? ""} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} /></div>
            <DialogFooter><Button type="submit">{editing ? "Salvar" : "Criar"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Nome</TableHead><TableHead>Categoria</TableHead><TableHead>Proficiência</TableHead><TableHead className="w-24">Ações</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {skills?.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell>{s.proficiency}%</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => remove.mutate(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AdminExperienceTab() {
  const { data: experience, isLoading, create, update, remove } = useAdminExperience();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState<InsertExperience>({ role: "", company: "", period: "", description: "", order: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ role: "", company: "", period: "", description: "", order: (experience?.length ?? 0) + 1 });
    setDialogOpen(true);
  };
  const openEdit = (exp: Experience) => {
    setEditing(exp);
    setForm({ role: exp.role, company: exp.company, period: exp.period, description: exp.description, order: exp.order });
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setForm({ role: "", company: "", period: "", description: "", order: 0 });
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (editing) {
      update.mutate({ id: editing.id, data: form }, { onSuccess: closeDialog });
    } else {
      create.mutate(form, { onSuccess: closeDialog });
    }
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogTrigger asChild>
          <Button onClick={openCreate}><Plus className="h-4 w-4" /> Nova experiência</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Editar experiência" : "Nova experiência"}</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div><Label>Cargo</Label><Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} required /></div>
            <div><Label>Empresa</Label><Input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} required /></div>
            <div><Label>Período</Label><Input value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} placeholder="2021 - Presente" /></div>
            <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required rows={3} /></div>
            <div><Label>Ordem</Label><Input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))} /></div>
            <DialogFooter><Button type="submit">{editing ? "Salvar" : "Criar"}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Cargo</TableHead><TableHead>Empresa</TableHead><TableHead>Período</TableHead><TableHead className="w-24">Ações</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {experience?.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.role}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>{exp.period}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(exp)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => remove.mutate(exp.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AdminProfileTab() {
  const { data: profile, isLoading, update } = useAdminProfile();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [showCvButton, setShowCvButton] = useState(true);
  const [showExperience, setShowExperience] = useState(true);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setTitle(profile.title);
      setAvatarUrl(profile.avatarUrl ?? "");
      setGithubUrl(profile.githubUrl ?? "");
      setLinkedinUrl(profile.linkedinUrl ?? "");
      setTwitterUrl(profile.twitterUrl ?? "");
      setContactEmail(profile.contactEmail ?? "");
      setContactLocation(profile.contactLocation ?? "");
      setContactPhone(profile.contactPhone ?? "");
      setCvUrl(profile.cvUrl ?? "");
      setShowCvButton(profile.showCvButton ?? true);
      setShowExperience(profile.showExperience ?? true);
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate({
      name,
      title,
      avatarUrl: avatarUrl || undefined,
      githubUrl: githubUrl || undefined,
      linkedinUrl: linkedinUrl || undefined,
      twitterUrl: twitterUrl || undefined,
      contactEmail: contactEmail || undefined,
      contactLocation: contactLocation || undefined,
      contactPhone: contactPhone || undefined,
      cvUrl: cvUrl || undefined,
      showCvButton,
      showExperience,
    });
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="space-y-6 max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>URL da foto de perfil</Label>
          <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
          {avatarUrl && (
            <div className="mt-2">
              <img src={avatarUrl} alt="Preview" className="h-24 w-24 rounded-full object-cover border" onError={(e) => (e.currentTarget.style.display = "none")} />
            </div>
          )}
        </div>
        <div>
          <Label>Nome</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome" />
        </div>
        <div>
          <Label>Título / Cargo</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ex: Engenheiro Full Stack" />
        </div>
        <div className="pt-2 border-t border-white/10">
          <Label className="text-muted-foreground">Redes sociais</Label>
          <div className="mt-3 space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">GitHub</Label>
              <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/seu-usuario" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">LinkedIn</Label>
              <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/seu-perfil" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Twitter / X</Label>
              <Input value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://twitter.com/seu-usuario" />
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <Label className="text-muted-foreground">Informações de contato (página Contato)</Label>
          <div className="mt-3 space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">E-mail de contato</Label>
              <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="seu@email.com" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Localização</Label>
              <Input value={contactLocation} onChange={(e) => setContactLocation(e.target.value)} placeholder="Cidade, País" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Telefone</Label>
              <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+55 11 99999-9999" />
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <Label className="text-muted-foreground">CV (botão Download na Home)</Label>
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <Switch checked={showCvButton} onCheckedChange={setShowCvButton} />
              <Label className="text-sm">Exibir botão &quot;Download CV&quot; na página inicial</Label>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">URL do PDF do currículo</Label>
              <Input value={cvUrl} onChange={(e) => setCvUrl(e.target.value)} placeholder="https://... ou deixe em branco e use public/cv.pdf" />
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <Label className="text-muted-foreground">Menu de navegação</Label>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <Switch checked={showExperience} onCheckedChange={setShowExperience} />
              <Label className="text-sm">Exibir menu &quot;Experiências&quot; na sidebar</Label>
            </div>
          </div>
        </div>
        <Button type="submit" disabled={update.isPending}>Salvar perfil</Button>
      </form>
    </div>
  );
}

function AdminMessagesTab() {
  const { data: messages, isLoading } = useAdminMessages();
  if (isLoading) return <Skeleton className="h-64 w-full" />;
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Mensagem</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages?.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell>{m.phone ?? "—"}</TableCell>
              <TableCell className="max-w-xs truncate">{m.message}</TableCell>
              <TableCell>{m.createdAt ? new Date(m.createdAt).toLocaleDateString("pt-BR") : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {messages?.length === 0 && <p className="p-4 text-muted-foreground">Nenhuma mensagem ainda.</p>}
    </div>
  );
}

export default function AdminPage() {
  const { isAdmin, isLoading, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 py-12 w-full">
            <Skeleton className="h-12 w-48 mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!isAdmin) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <AdminLogin />
            <p className="text-center mt-6">
              <Link href="/" className="text-primary hover:underline">Voltar ao portfólio</Link>
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold">Painel do portfólio</h1>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/">Ver site</Link>
              </Button>
              <Button variant="outline" onClick={() => logout.mutate()}><LogOut className="h-4 w-4" /> Sair</Button>
            </div>
          </div>
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="projects">Projetos</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="experience">Experiência</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
            </TabsList>
            <TabsContent value="profile"><AdminProfileTab /></TabsContent>
            <TabsContent value="projects"><AdminProjectsTab /></TabsContent>
            <TabsContent value="skills"><AdminSkillsTab /></TabsContent>
            <TabsContent value="experience"><AdminExperienceTab /></TabsContent>
            <TabsContent value="messages"><AdminMessagesTab /></TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}

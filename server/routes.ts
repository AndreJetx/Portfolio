import type { Express } from "express";
import { Router } from "express";
import { storage } from "./storage";
import { api } from "@shared/routes";
import {
  insertProjectSchema,
  updateProjectSchema,
  insertSkillSchema,
  updateSkillSchema,
  insertExperienceSchema,
  updateExperienceSchema,
  updateProfileSchema,
} from "@shared/schema";
import { z } from "zod";
import { requireAdmin, setAdminCookie, clearAdminCookie, checkAdminPassword } from "./auth";

/** Garante que a resposta do perfil sempre tenha camelCase para o frontend (aceita row em camel ou snake_case) */
function profileResponse(row: Record<string, unknown> | undefined) {
  if (!row) return null;
  const r = row as Record<string, unknown>;
  return {
    id: r.id,
    name: r.name ?? "",
    title: r.title ?? "",
    avatarUrl: r.avatarUrl ?? r.avatar_url ?? null,
    githubUrl: r.githubUrl ?? r.github_url ?? null,
    linkedinUrl: r.linkedinUrl ?? r.linkedin_url ?? null,
    twitterUrl: r.twitterUrl ?? r.twitter_url ?? null,
    contactEmail: r.contactEmail ?? r.contact_email ?? null,
    contactLocation: r.contactLocation ?? r.contact_location ?? null,
    contactPhone: r.contactPhone ?? r.contact_phone ?? null,
    updatedAt: r.updatedAt ?? r.updated_at ?? null,
  };
}

export async function registerRoutes(app: Express): Promise<void> {
  // === Public: Projects ===
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  // === Skills ===
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // === Public: Experience ===
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  // === Public: Profile (sempre retorna uma linha; cria se não existir) ===
  app.get(api.profile.get.path, async (req, res) => {
    let p = await storage.getProfile();
    if (!p) {
      p = await storage.createProfile({ name: "Nome", title: "Título" });
    }
    res.json(profileResponse(p));
  });

  // === Admin API (protected) ===
  const adminRouter = Router();

  adminRouter.post("/login", (req, res) => {
    const password = req.body?.password;
    if (!password || !checkAdminPassword(password)) {
      return res.status(401).json({ message: "Senha inválida" });
    }
    setAdminCookie(res);
    res.json({ ok: true });
  });

  adminRouter.post("/logout", (req, res) => {
    clearAdminCookie(res);
    res.json({ ok: true });
  });

  adminRouter.use(requireAdmin);

  adminRouter.get("/me", (req, res) => {
    res.json({ ok: true });
  });

  // Admin: Profile (sempre existe uma linha; GET garante, PUT faz replace/update)
  adminRouter.get("/profile", async (req, res) => {
    let p = await storage.getProfile();
    if (!p) {
      p = await storage.createProfile({ name: "Nome", title: "Título" });
    }
    res.json(profileResponse(p));
  });
  adminRouter.put("/profile", async (req, res) => {
    try {
      const input = updateProfileSchema.parse(req.body);
      let p = await storage.getProfile();
      if (!p) {
        p = await storage.createProfile({
          name: input.name ?? "Nome",
          title: input.title ?? "Título",
          ...(input.avatarUrl !== undefined && { avatarUrl: input.avatarUrl }),
          ...(input.githubUrl !== undefined && { githubUrl: input.githubUrl }),
          ...(input.linkedinUrl !== undefined && { linkedinUrl: input.linkedinUrl }),
          ...(input.twitterUrl !== undefined && { twitterUrl: input.twitterUrl }),
          ...(input.contactEmail !== undefined && { contactEmail: input.contactEmail }),
          ...(input.contactLocation !== undefined && { contactLocation: input.contactLocation }),
          ...(input.contactPhone !== undefined && { contactPhone: input.contactPhone }),
        });
      } else {
        const updated = await storage.updateProfile(1, input);
        if (!updated) return res.status(500).json({ message: "Falha ao atualizar perfil" });
        p = updated;
      }
      res.json(profileResponse(p));
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });

  // Admin: Messages (read only)
  adminRouter.get("/messages", async (req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  // Admin: Projects CRUD
  adminRouter.get("/projects", async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });
  adminRouter.post("/projects", async (req, res) => {
    try {
      const input = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.put("/projects/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    try {
      const input = updateProjectSchema.parse(req.body);
      const project = await storage.updateProject(id, input);
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.delete("/projects/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteProject(id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.status(204).send();
  });

  // Admin: Skills CRUD
  adminRouter.get("/skills", async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });
  adminRouter.post("/skills", async (req, res) => {
    try {
      const input = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(input);
      res.status(201).json(skill);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.put("/skills/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    try {
      const input = updateSkillSchema.parse(req.body);
      const skill = await storage.updateSkill(id, input);
      if (!skill) return res.status(404).json({ message: "Skill not found" });
      res.json(skill);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.delete("/skills/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteSkill(id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.status(204).send();
  });

  // Admin: Experience CRUD
  adminRouter.get("/experience", async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });
  adminRouter.post("/experience", async (req, res) => {
    try {
      const input = insertExperienceSchema.parse(req.body);
      const exp = await storage.createExperience(input);
      res.status(201).json(exp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.put("/experience/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    try {
      const input = updateExperienceSchema.parse(req.body);
      const exp = await storage.updateExperience(id, input);
      if (!exp) return res.status(404).json({ message: "Experience not found" });
      res.json(exp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      throw err;
    }
  });
  adminRouter.delete("/experience/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ message: "Invalid id" });
    const deleted = await storage.deleteExperience(id);
    if (!deleted) return res.status(404).json({ message: "Experience not found" });
    res.status(204).send();
  });

  app.use("/api/admin", adminRouter);

  // === Contact ===
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === Seed Data (Initial population) ===
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Alex Designer",
      title: "Engenheiro Full Stack",
      avatarUrl: "https://github.com/shadcn.png",
    });
  }
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await seedDatabase();
  }
}

async function seedDatabase() {
  // Projects
  await storage.createProject({
    title: "Plataforma de E-Commerce",
    description: "Uma solução completa de e-commerce full-stack construída com Next.js, Stripe e PostgreSQL. Inclui gerenciamento de inventário em tempo real, pagamentos seguros e um painel administrativo.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    featured: true
  });

  await storage.createProject({
    title: "App de Gerenciamento de Tarefas",
    description: "Ferramenta colaborativa de gestão de tarefas com atualizações em tempo real usando WebSockets. Suporta interfaces de arrastar e soltar e espaços de trabalho em equipe.",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    tags: ["React", "Node.js", "Socket.io", "TailwindCSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    featured: true
  });

  await storage.createProject({
    title: "Gerador de Conteúdo com IA",
    description: "Aplicação SaaS que utiliza a API GPT-4 da OpenAI para gerar textos de marketing e postagens de blog. Inclui um editor de texto rico e ferramentas de otimização de SEO.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["OpenAI API", "Python", "FastAPI", "React"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    featured: false
  });

  // Skills
  const skillsData = [
    { name: "React", category: "Frontend", proficiency: 95, icon: "SiReact" },
    { name: "TypeScript", category: "Frontend", proficiency: 90, icon: "SiTypescript" },
    { name: "TailwindCSS", category: "Frontend", proficiency: 95, icon: "SiTailwindcss" },
    { name: "Node.js", category: "Backend", proficiency: 85, icon: "SiNodedotjs" },
    { name: "PostgreSQL", category: "Database", proficiency: 80, icon: "SiPostgresql" },
    { name: "Docker", category: "DevOps", proficiency: 75, icon: "SiDocker" },
    { name: "AWS", category: "DevOps", proficiency: 70, icon: "SiAmazonwebservices" },
    { name: "Next.js", category: "Frontend", proficiency: 90, icon: "SiNextdotjs" }
  ];

  for (const skill of skillsData) {
    await storage.createSkill(skill);
  }

  // Experience
  await storage.createExperience({
    role: "Desenvolvedor Full Stack Sênior",
    company: "Tech Solutions Inc.",
    period: "2021 - Presente",
    description: "Liderança de uma equipe de 5 desenvolvedores na construção de aplicações web escaláveis. Arquitetura e implantação de infraestrutura de microserviços atendendo a mais de 1 milhão de usuários.",
    order: 1
  });

  await storage.createExperience({
    role: "Desenvolvedor Frontend",
    company: "Agência Criativa",
    period: "2019 - 2021",
    description: "Desenvolvimento de sites responsivos e aplicações web para clientes de alto perfil. Melhoria na performance do site em 40% através de otimização de código.",
    order: 2
  });

  await storage.createExperience({
    role: "Desenvolvedor Web Júnior",
    company: "StartUp Co.",
    period: "2018 - 2019",
    description: "Auxílio no desenvolvimento do produto principal da empresa. Implementação de novas funcionalidades e correção de bugs na base de código React.",
    order: 3
  });
}

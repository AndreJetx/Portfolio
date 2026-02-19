import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === Projects ===
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

  // === Experience ===
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

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
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await seedDatabase();
  }

  return httpServer;
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
    { name: "AWS", category: "DevOps", proficiency: 70, icon: "SiAmazonaws" },
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

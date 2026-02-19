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
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL. Features include real-time inventory management, secure payments, and an admin dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    featured: true
  });

  await storage.createProject({
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates using WebSockets. Supports drag-and-drop interfaces and team workspaces.",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    tags: ["React", "Node.js", "Socket.io", "TailwindCSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
    featured: true
  });

  await storage.createProject({
    title: "AI Content Generator",
    description: "SaaS application that uses OpenAI's GPT-4 API to generate marketing copy and blog posts. Includes a rich text editor and SEO optimization tools.",
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
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: "Leading a team of 5 developers building scalable web applications. Architected and deployed microservices infrastructure serving 1M+ users.",
    order: 1
  });

  await storage.createExperience({
    role: "Frontend Developer",
    company: "Creative Agency",
    period: "2019 - 2021",
    description: "Developed responsive websites and web applications for high-profile clients. Improved site performance by 40% through code optimization.",
    order: 2
  });

  await storage.createExperience({
    role: "Junior Web Developer",
    company: "StartUp Co.",
    period: "2018 - 2019",
    description: "Assisted in the development of the company's main product. Implemented new features and fixed bugs in the React codebase.",
    order: 3
  });
}

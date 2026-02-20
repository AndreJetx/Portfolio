import { db } from "./db";
import {
  projects, skills, experience, messages, profile,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type Experience, type InsertExperience,
  type Message, type InsertMessage,
  type Profile, type InsertProfile,
} from "@shared/schema";
import { eq, asc, desc } from "drizzle-orm";
import type { z } from "zod";
import type { updateProjectSchema, updateSkillSchema, updateExperienceSchema, updateProfileSchema } from "@shared/schema";

type UpdateProject = z.infer<typeof updateProjectSchema>;
type UpdateSkill = z.infer<typeof updateSkillSchema>;
type UpdateExperience = z.infer<typeof updateExperienceSchema>;
type UpdateProfile = z.infer<typeof updateProfileSchema>;

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  createProfile(data: InsertProfile): Promise<Profile>;
  updateProfile(id: number, data: UpdateProfile): Promise<Profile | undefined>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, data: UpdateProject): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, data: UpdateSkill): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;

  // Experience
  getExperience(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, data: UpdateExperience): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;

  // Messages
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

const PROFILE_ID = 1;

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [row] = await db.select().from(profile).where(eq(profile.id, PROFILE_ID));
    return row;
  }

  async createProfile(data: InsertProfile): Promise<Profile> {
    const [row] = await db.insert(profile).values(data).returning();
    return row;
  }

  async updateProfile(id: number, data: UpdateProfile): Promise<Profile | undefined> {
    const [row] = await db.update(profile).set({ ...data, updatedAt: new Date() }).where(eq(profile.id, id)).returning();
    return row;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, data: UpdateProject): Promise<Project | undefined> {
    const [project] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async updateSkill(id: number, data: UpdateSkill): Promise<Skill | undefined> {
    const [skill] = await db.update(skills).set(data).where(eq(skills.id, id)).returning();
    return skill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience).orderBy(asc(experience.order));
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [exp] = await db.insert(experience).values(insertExperience).returning();
    return exp;
  }

  async updateExperience(id: number, data: UpdateExperience): Promise<Experience | undefined> {
    const [exp] = await db.update(experience).set(data).where(eq(experience.id, id)).returning();
    return exp;
  }

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experience).where(eq(experience.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();

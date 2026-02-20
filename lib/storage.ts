import { db } from "./db";
import {
  projects,
  skills,
  experience,
  messages,
  profile,
  type Project,
  type InsertProject,
  type Skill,
  type InsertSkill,
  type Experience,
  type InsertExperience,
  type Message,
  type InsertMessage,
  type Profile,
  type InsertProfile,
} from "@/shared/schema";
import { eq, asc, desc } from "drizzle-orm";
import type { z } from "zod";
import type {
  updateProjectSchema,
  updateSkillSchema,
  updateExperienceSchema,
  updateProfileSchema,
} from "@/shared/schema";

type UpdateProject = z.infer<typeof updateProjectSchema>;
type UpdateSkill = z.infer<typeof updateSkillSchema>;
type UpdateExperience = z.infer<typeof updateExperienceSchema>;
type UpdateProfile = z.infer<typeof updateProfileSchema>;

const PROFILE_ID = 1;

function profileToCamel(row: Record<string, unknown> | undefined) {
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
    cvUrl: r.cvUrl ?? r.cv_url ?? null,
    showCvButton: r.showCvButton ?? r.show_cv_button ?? true,
    showExperience: r.showExperience ?? r.show_experience ?? true,
    updatedAt: r.updatedAt ?? r.updated_at ?? null,
  };
}

export const storage = {
  async getProfile(): Promise<ReturnType<typeof profileToCamel>> {
    const [row] = await db.select().from(profile).where(eq(profile.id, PROFILE_ID));
    return profileToCamel(row);
  },

  async createProfile(data: InsertProfile): Promise<Profile> {
    const [row] = await db.insert(profile).values(data).returning();
    return row;
  },

  async updateProfile(id: number, data: UpdateProfile): Promise<Profile | undefined> {
    const [row] = await db
      .update(profile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profile.id, id))
      .returning();
    return row;
  },

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  },

  async getProject(id: number): Promise<Project | undefined> {
    const [p] = await db.select().from(projects).where(eq(projects.id, id));
    return p;
  },

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [p] = await db.insert(projects).values(insertProject).returning();
    return p!;
  },

  async updateProject(id: number, data: UpdateProject): Promise<Project | undefined> {
    const [p] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return p;
  },

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  },

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  },

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [s] = await db.insert(skills).values(insertSkill).returning();
    return s!;
  },

  async updateSkill(id: number, data: UpdateSkill): Promise<Skill | undefined> {
    const [s] = await db.update(skills).set(data).where(eq(skills.id, id)).returning();
    return s;
  },

  async deleteSkill(id: number): Promise<boolean> {
    const result = await db.delete(skills).where(eq(skills.id, id));
    return (result.rowCount ?? 0) > 0;
  },

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience).orderBy(asc(experience.order));
  },

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [e] = await db.insert(experience).values(insertExperience).returning();
    return e!;
  },

  async updateExperience(id: number, data: UpdateExperience): Promise<Experience | undefined> {
    const [e] = await db.update(experience).set(data).where(eq(experience.id, id)).returning();
    return e;
  },

  async deleteExperience(id: number): Promise<boolean> {
    const result = await db.delete(experience).where(eq(experience.id, id));
    return (result.rowCount ?? 0) > 0;
  },

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  },

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [m] = await db.insert(messages).values(insertMessage).returning();
    return m!;
  },
};

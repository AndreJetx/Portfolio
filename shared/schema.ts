import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === PROJECTS ===
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull(), // Array of strings
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SKILLS ===
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // frontend, backend, devops, database
  proficiency: integer("proficiency").default(0), // 0-100
  icon: text("icon"), // Lucide icon name
});

// === EXPERIENCE ===
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

// === CONTACT MESSAGES ===
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === PROFILE (single row: avatar, name, title, social links, contato) ===
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  avatarUrl: text("avatar_url"),
  name: text("name").notNull(),
  title: text("title").notNull(),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  contactEmail: text("contact_email"),
  contactLocation: text("contact_location"),
  contactPhone: text("contact_phone"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === SCHEMAS ===
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const updateProjectSchema = insertProjectSchema.partial();
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const updateSkillSchema = insertSkillSchema.partial();
export const insertExperienceSchema = createInsertSchema(experience).omit({ id: true });
export const updateExperienceSchema = insertExperienceSchema.partial();
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertProfileSchema = createInsertSchema(profile).omit({ id: true, updatedAt: true });
export const updateProfileSchema = insertProfileSchema.partial();

// === TYPES ===
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Experience = typeof experience.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

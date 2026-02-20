import { z } from 'zod';
import { insertProjectSchema, insertSkillSchema, insertExperienceSchema, insertMessageSchema, projects, skills, experience, messages } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id' as const,
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
  },
  experience: {
    list: {
      method: 'GET' as const,
      path: '/api/experience' as const,
      responses: {
        200: z.array(z.custom<typeof experience.$inferSelect>()),
      },
    },
  },
  profile: {
    get: { method: 'GET' as const, path: '/api/profile' as const },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  admin: {
    login: { method: 'POST' as const, path: '/api/admin/login' as const },
    logout: { method: 'POST' as const, path: '/api/admin/logout' as const },
    me: { method: 'GET' as const, path: '/api/admin/me' as const },
    projects: { path: '/api/admin/projects' as const },
    project: (id: number) => `/api/admin/projects/${id}` as const,
    skills: { path: '/api/admin/skills' as const },
    skill: (id: number) => `/api/admin/skills/${id}` as const,
    experience: { path: '/api/admin/experience' as const },
    experienceItem: (id: number) => `/api/admin/experience/${id}` as const,
    messages: { path: '/api/admin/messages' as const },
    profile: { path: '/api/admin/profile' as const },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

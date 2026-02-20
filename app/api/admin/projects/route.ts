import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";
import { insertProjectSchema } from "@/shared/schema";
import { z } from "zod";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const projects = await storage.getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const input = insertProjectSchema.parse(await req.json());
    const project = await storage.createProject(input);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 });
    }
    throw err;
  }
}

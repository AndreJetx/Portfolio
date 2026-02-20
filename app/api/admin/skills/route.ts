import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";
import { insertSkillSchema } from "@/shared/schema";
import { z } from "zod";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const skills = await storage.getSkills();
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const input = insertSkillSchema.parse(await req.json());
    const skill = await storage.createSkill(input);
    return NextResponse.json(skill, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 });
    }
    throw err;
  }
}

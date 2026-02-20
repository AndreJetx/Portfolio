import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";
import { insertExperienceSchema } from "@/shared/schema";
import { z } from "zod";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const experience = await storage.getExperience();
  return NextResponse.json(experience);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const input = insertExperienceSchema.parse(await req.json());
    const exp = await storage.createExperience(input);
    return NextResponse.json(exp, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 });
    }
    throw err;
  }
}

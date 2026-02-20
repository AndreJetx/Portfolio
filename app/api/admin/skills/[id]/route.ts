import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";
import { updateSkillSchema } from "@/shared/schema";
import { z } from "zod";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  try {
    const input = updateSkillSchema.parse(await req.json());
    const skill = await storage.updateSkill(id, input);
    if (!skill) return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    return NextResponse.json(skill);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message }, { status: 400 });
    }
    throw err;
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  const deleted = await storage.deleteSkill(id);
  if (!deleted) return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}

import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  const project = await storage.getProject(id);
  if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

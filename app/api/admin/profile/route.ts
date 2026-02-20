import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";
import { updateProfileSchema } from "@/shared/schema";
import { z } from "zod";

function profileJson(p: Awaited<ReturnType<typeof storage.getProfile>>) {
  return p ?? null;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    let p = await storage.getProfile();
    if (!p) {
      await storage.createProfile({ name: "Nome", title: "Título" });
      p = await storage.getProfile();
    }
    return NextResponse.json(profileJson(p));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const input = updateProfileSchema.parse(await req.json());
    let p = await storage.getProfile();
    const raw = await storage.updateProfile(1, input);
    if (raw) p = profileJson(await storage.getProfile()) as Awaited<ReturnType<typeof storage.getProfile>>;
    return NextResponse.json(p ?? null);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.errors[0].message, field: err.errors[0].path.join(".") }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

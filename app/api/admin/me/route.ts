import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  const ok = await isAdmin();
  if (!ok) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true });
}

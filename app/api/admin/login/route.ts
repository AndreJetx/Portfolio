import { NextResponse } from "next/server";
import { checkAdminPassword, setAdminCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };
  if (!password || !checkAdminPassword(password)) {
    return NextResponse.json({ message: "Senha inválida" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}

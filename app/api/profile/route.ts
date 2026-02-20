import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET() {
  try {
    let p = await storage.getProfile();
    if (!p) {
      await storage.createProfile({ name: "Nome", title: "Título" });
      p = await storage.getProfile();
    }
    return NextResponse.json(p ?? null);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

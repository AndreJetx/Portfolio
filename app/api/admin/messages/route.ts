import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const messages = await storage.getMessages();
    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

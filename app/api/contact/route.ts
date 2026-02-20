import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertMessageSchema } from "@/shared/schema";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = insertMessageSchema.parse(body);
    const message = await storage.createMessage(input);
    return NextResponse.json(message, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.errors[0].message, field: err.errors[0].path.join(".") },
        { status: 400 }
      );
    }
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

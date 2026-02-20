import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
};

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_PASSWORD or ADMIN_SECRET must be set");
  return secret;
}

function signToken(): string {
  return crypto.createHmac("sha256", getSecret()).update("admin").digest("hex");
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return crypto.timingSafeEqual(Buffer.from(password, "utf8"), Buffer.from(expected, "utf8"));
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const expected = signToken();
  if (!token) return false;
  return crypto.timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"));
}

export async function setAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, signToken(), COOKIE_OPTIONS);
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

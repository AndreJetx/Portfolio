import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const COOKIE_OPTIONS = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, maxAge: 7 * 24 * 60 * 60 }; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD or ADMIN_SECRET must be set for admin auth");
  }
  return secret;
}

function signToken(): string {
  return crypto.createHmac("sha256", getSecret()).update("admin").digest("hex");
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const expected = signToken();
  const token = req.cookies?.[COOKIE_NAME];
  if (token && crypto.timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"))) {
    next();
    return;
  }
  res.status(401).json({ message: "Unauthorized" });
}

export function setAdminCookie(res: Response): void {
  res.cookie(COOKIE_NAME, signToken(), COOKIE_OPTIONS);
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return crypto.timingSafeEqual(Buffer.from(password, "utf8"), Buffer.from(expected, "utf8"));
}

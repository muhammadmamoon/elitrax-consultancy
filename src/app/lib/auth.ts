// src/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "ELITRAX_ENTERPRISE_JWT_SECRET_KEY_SECURE_2026"
);

export async function createSession(userId: string, role: string) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);

  cookies().set("elitrax_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return token;
}

export async function getSession(req?: NextRequest) {
  const token = req
    ? req.cookies.get("elitrax_session")?.value
    : cookies().get("elitrax_session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(SECRET_KEY, token);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().delete("elitrax_session");
}
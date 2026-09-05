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

  const cookieStore = await cookies();

  cookieStore.set("elitrax_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function getSession(req?: NextRequest) {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get("elitrax_session")?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get("elitrax_session")?.value;
  }

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("elitrax_session");
}
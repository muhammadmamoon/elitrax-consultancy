// src/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "ELITRAX_ENTERPRISE_JWT_SECRET_KEY_SECURE_2026"
);

// 1. Ab yeh function userId aur role accept karega aur khud Token banayega
export async function createSession(userId: string, role: string) {
  // JWT Token Generate karein
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token 24 ghante ke liye valid hai
    .sign(SECRET_KEY);

  // cookies() ko await karein
  const cookieStore = await cookies();

  cookieStore.set("elitrax_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 Din
    path: "/",
  });
}

export async function getSession(req?: NextRequest) {
  // 2. Yahan bhi cookies() ko await karna lazmi hai
  const cookieStore = await cookies();
  
  const token = req
    ? req.cookies.get("elitrax_session")?.value
    : cookieStore.get("elitrax_session")?.value;

  if (!token) return null;

  try {
   const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

// 3. Clear session ko bhi async bana kar await lagana hoga
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("elitrax_session");
}
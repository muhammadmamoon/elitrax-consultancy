// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = await getSession(request);
    if (!session) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/api/admin") || (pathname.startsWith("/api/") && ["POST", "PUT", "DELETE"].includes(request.method) && !pathname.startsWith("/api/inquiries") && !pathname.startsWith("/api/auth/login"))) {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access attempt" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
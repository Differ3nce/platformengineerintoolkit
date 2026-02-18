import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use Node.js runtime to avoid Edge Runtime incompatibility with Prisma v7
export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const isAdminRoute =
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/api/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Dynamically import auth to keep Prisma in Node.js runtime
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (session.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

import { NextRequest, NextResponse } from "next/server";

// Define public routes that should not require authentication
const publicPaths = ["/auth/login", "/auth/register"];

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isPublicRoute = publicPaths.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }
  // Retrieve session token from cookies
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|public|favicon.ico).*)"], // Protect all routes except public ones
};

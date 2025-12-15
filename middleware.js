import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;

  // Detect Supabase auth cookie
  const isLoggedIn = req.cookies
    .getAll()
    .some(
      (cookie) => cookie.name.includes("sb-") && cookie.name.includes("auth")
    );

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  const nextParam = searchParams.get("next");

  // ✅ If user is logged in AND login page has `next`, go there
  if (isLoggedIn && isAuthPage && nextParam) {
    return NextResponse.redirect(new URL(nextParam, req.url));
  }

  // ❌ Logged-in users should not see auth pages (normal case)
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  // 🔒 Logged-out users cannot access checkout
  if (!isLoggedIn && pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }

  return NextResponse.next();
}

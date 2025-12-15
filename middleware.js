import { NextResponse } from "next/server";

export function middleware(req) {
  const isAuth =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const loggedIn = req.cookies.get("sb-access-token");

  if (loggedIn && isAuth)
    return NextResponse.redirect(new URL("/products", req.url));

  if (!loggedIn && req.nextUrl.pathname.startsWith("/checkout"))
    return NextResponse.redirect(new URL("/login", req.url));
}

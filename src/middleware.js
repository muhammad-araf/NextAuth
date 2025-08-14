import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublic = path === "/login" || path === "/signup" || path === "/";
  const isVerify = path === "/verify";
  const signupEmail = request.cookies.get("signupEmail")?.value || null;
  const token = request.cookies.get("token")?.value || null;
  if ((path === "/" || path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/new", request.url));
  }

  if (isVerify && (!signupEmail || signupEmail.trim() === "")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isPublic && !isVerify && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/new", "/verify", "/login", "/signup"],
};

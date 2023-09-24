import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const auth = await getToken({ req });
  const authenticated = !!auth;

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (authenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }
  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/register", "/login", "/catalogue/:path*", "/profile/:path*"],
};

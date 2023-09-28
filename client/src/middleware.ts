import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequestWithAuth) {
  const auth = await getToken({ req });
  const authenticated = !!auth;

  /**
    blocking auth if user has logged
  */
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (authenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }

  /**
    blocking base route if user not loggin
  */

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/catalogue", req.url));
  }
}

export const config = {
  matcher: ["/", "/register", "/login", "/catalogue/:path*", "/profile/:path*"],
};

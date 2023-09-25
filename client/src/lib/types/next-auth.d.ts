import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: {
        accessToken: string;
        refreshToken: string;
      };
      provider: string;
      profilePicture: string;
      iat: 1695662531;
      exp: 1698254531;
      jti: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    profilePicture: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    email: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    provider: string;
    profilePicture: string;
    iat: 1695662531;
    exp: 1698254531;
    jti: string;
  }
}

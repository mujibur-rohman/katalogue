import authApi from "@/lib/api/auth.api";
import nextAuth, { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const user = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          });
          if (user) {
            return { ...user.data } as any;
          }
          return null;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (account) {
        token.token = user.token;
        token.id = user.id;
        token.provider = account.provider;
        token.profilePicture = user.profilePicture;
      }

      return { ...token };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };

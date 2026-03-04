import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const isDev = process.env.NODE_ENV === "development";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Credentials provider requires JWT strategy; database strategy is used in production.
  session: isDev ? { strategy: "jwt" } : { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Allow linking Google accounts to existing users (seeded admins).
      // Scoped to Google only — safe because Google always verifies email ownership.
      // WARNING: If a second provider is ever added, do NOT copy this flag unless
      // that provider also guarantees verified email addresses, as it could allow
      // account takeover via email matching on unverified addresses.
      allowDangerousEmailAccountLinking: true,
    }),
    // Dev-only: bypass OAuth by signing in as any seeded admin user.
    ...(isDev
      ? [
          Credentials({
            credentials: { email: {} },
            async authorize(credentials) {
              const email = credentials?.email as string | undefined;
              const user = email
                ? await prisma.user.findUnique({ where: { email } })
                : await prisma.user.findFirst({ where: { role: "ADMIN" } });
              if (!user || user.role !== "ADMIN") return null;
              return user;
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist role into the JWT when user first signs in (dev only).
      if (user) {
        token.role = (user as unknown as { role: string }).role;
      }
      return token;
    },
    session({ session, user, token }) {
      if (session.user) {
        // JWT strategy (dev): user info lives in the token.
        // Database strategy (prod): user info comes from the adapter.
        session.user.id = (user as { id?: string } | undefined)?.id ?? token.sub!;
        session.user.role =
          ((user as unknown as { role?: string } | undefined)?.role ??
            (token.role as string));
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

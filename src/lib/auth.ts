import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as unknown as { role: string }).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

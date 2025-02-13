import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import prisma from "@/db/prismaClient";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }


        const hashedPassword = CryptoJS.SHA256(credentials.password).toString(CryptoJS.enc.Hex);
        
        const user = await prisma.users.findUnique({
          where: { email: credentials.email, password: hashedPassword},
        });

        if (!user) {
          return null
        }


        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

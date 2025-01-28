import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        console.log("Google profile:", profile);
        return {
          id: profile.sub, // Ensure this is the correct ID from your user model
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER", // or set this based on your logic
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email) {
          throw new Error("User email is required.");
        }
        
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
    
        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
              role: "USER",
            },
          });
        }
    
        if (!account) {
          throw new Error("No account linked.");
        }
        const existingAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });
    
        if (!existingAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type || "oauth",
            },
          });
        }
    
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false; // or throw the error for NextAuth to handle
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id || token.sub;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {        
        session.user.id = token.sub;
        session.user.role = token.role; 
      }
      return session;
    },
  }
}
    

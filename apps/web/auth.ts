import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Slack from "next-auth/providers/slack"
import prisma from "@/services/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [Google,
    Slack({
      clientId: process.env.AUTH_SLACK_ID!,
      clientSecret: process.env.AUTH_SLACK_SECRET!,
      authorization: {
        params: { scope: "users:read.email" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email }) {
      const userEmail = email ?? user.email;
      if (!userEmail || typeof userEmail !== 'string') return false;
    
      const domain = userEmail.split("@")[1].toLowerCase();
    
      const validDomain = await prisma.emailDomains.findUnique({
        where: { email: domain },
      });
    
      if (!validDomain) {
        console.log("Blocked sign-in for unrecognized email domain:", domain);
        return false;
      }
    
      return true;
    }
  },

  events: {
    // dispara logo depois que o usuário é criado no banco
    async createUser({ user }) {
      const domain = user.email!.split("@")[1].toLowerCase();
      const alias = await prisma.emailDomains.findUnique({
        where: { email: domain },
      });
      if (!alias) {
        throw new Error("Domínio de e-mail não autorizado.");
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { companyId: alias.companyId },
      });
    },
  },
})

export async function handleLogin(formData: FormData) {
  const type = formData.get("type") as string;
  if (type === "email") {
    await signIn();
  } else {
    await signIn(type);
  }
}
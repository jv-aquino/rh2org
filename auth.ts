import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "@/services/prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, email }) {
      const userEmail = email ?? user.email;
      if (!userEmail || typeof userEmail !== 'string') return false;
    
      const domain = userEmail.split("@")[1].toLowerCase();
    
      const company = await prisma.company.findFirst({
        where: {
          emailDomains: {
            has: domain,
          },
        },
      });
    
      if (!company) {
        console.log("Blocked sign-in for unrecognized email domain:", domain);
        return false;
      }
    
      return true;
    }
  },    
})
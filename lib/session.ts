import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Prisma } from "@prisma/client";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      accounts: true,          
      balances: true,         
      sessions: true,    
    },
  });
  return {
    ...session.user,
    ...user, 
  };
}
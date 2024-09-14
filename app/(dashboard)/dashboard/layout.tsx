

import Header from "@/components/common/Header";
import SideBar from "@/components/common/Sidebar";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user  = await getCurrentUser()
  return (
    <section className="">
      <div className=" min-h-screen bg-slate-100 dark:bg-black">
        <Header user={user as User} />
        
        <div className="sm:ml-[6rem] " > 
          <SideBar user={user as User} />
         
          <div className="pl-[8rem] pr-[2rem]">
            {children}
          </div>
        </div>
      </div>
  </section>
  );
}

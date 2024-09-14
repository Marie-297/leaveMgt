

import Header from "@/components/common/Header";
import SideBar from "@/components/common/Sidebar";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
// import { useEffect } from "react";

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
        {/* <SideBar user={user as User} /> */}
        <div className="sm:ml-[14rem] sm:mr-2 " > 
          <SideBar user={user as User} />
          {/* <Header user={user as User} /> */}
          {children}
        </div>
      </div>
  </section>
  );
}

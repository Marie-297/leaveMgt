import * as React from "react";
import Image from "next/image";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./Routes";
import { RenderRoutes } from "./RenderRoutes";
import ToggleLight from "./ToggleLight";
import { User } from "@prisma/client";
import SignOut from "./SignOut";

type SideBarProps = {
  user: User;
};

const SideBar = ({ user }: SideBarProps) => {
  const adminIconsRouter = () => {
    return <>{RenderRoutes({ routes: AdminRoutes })}</>;
  };

  const userIconsRouter = () => {
    return <>{RenderRoutes({ routes: UserRoutes })}</>;
  };

  const moderatorIconsRouter = () => {
    return <>{RenderRoutes({ routes: ModeratorRoutes })}</>;
  };
  return (
    <div className="fixed  bottom-0 top-14 left-0 sm:block w-[12rem] dark:border-r">
      <div className="flex flex-col items-start justify-between h-full">
        {/* TOP PART  */}
        <div>
          <div className="my-8">
            <h1></h1>
          </div>

          <nav className="flex flex-col items-start px-8 mx-0 overflow-y-auto dark:text-white">
            {user?.role === "ADMIN" && adminIconsRouter()}
            {user?.role === "USER" && userIconsRouter()}
            {user?.role === "MODERATOR" && moderatorIconsRouter()}
          </nav>
        </div>
        {/* BOTTOM PART  */}
        <div className="flex flex-col items-center mx-6 space-y-6 my-8 w-full">
          <div className="flex items-center justify-start w-full">
            <SignOut />
            <p className="text-slate-950 dark:text-white font-extrabold ml-4">Sign Out</p>
          </div>
          <div className="flex items-center justify-start w-full">
            <ToggleLight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

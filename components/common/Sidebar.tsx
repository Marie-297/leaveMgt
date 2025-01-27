"use client"
import * as React from "react";
import Image from "next/image";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./Routes";
import { RenderRoutes } from "./RenderRoutes";
import ToggleLight from "./ToggleLight";
import { User } from "@prisma/client";
import SignOut from "./SignOut";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

type SideBarProps = {
  user: User;
};

const SideBar = ({ user }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <button
        className="sm:hidden fixed top-8 left-4 z-50 p-2 text-slate-950 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <FaBars size={30} />
      </button>
      <div className={`fixed top-14 bottom-0 left-0 z-40 bg-white dark:bg-black dark:border-r shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 w-[12rem]`}>
      <div className="flex flex-col items-start justify-between h-full">
        {/* TOP PART  */}
        <div>
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
    </>
    
  );
};

export default SideBar;

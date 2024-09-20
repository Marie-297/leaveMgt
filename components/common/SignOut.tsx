"use client";

import { BiLogOutCircle } from "react-icons/bi";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button
      className=" p-1  bg-blue-950 text-white rounded-full dark:bg-slate-600"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: `/` });
        console.log("successfully signed out");
        
      }}
    >
      <BiLogOutCircle />
    </button>
  );
};

export default SignOut;
"use client";

import { BiLogOutCircle } from "react-icons/bi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const SignOut = () => {
  return (
    <button title="Sign Out"
      className=" p-1  bg-blue-950 text-white rounded-full dark:bg-slate-600"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: `/` });
        console.log("successfully signed out");
        toast.success("successfully signed out");
      }}
    >
      <BiLogOutCircle size={20} />
    </button>
  );
};

export default SignOut;
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineSun } from "react-icons/hi2";
import { MdOutlineNightlightRound } from "react-icons/md";

const ToggleLight = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const currentTheme = theme === "system" ? systemTheme : theme;
  console.log("Current Theme:", currentTheme);
  return (
    <div>
      {currentTheme === "dark" ? (
        <div className="flex">
          <button
          onClick={() => setTheme("light")}
          className="p-1 ml-2 bg-slate-600 text-white rounded-full "
        >
            <HiOutlineSun size={20} />
          </button>
          <p className="text-white-950 ml-4 font font-extrabold">Light Mode</p>
          </div>
      ) : (
        <div className="flex">
          <button
            onClick={() => setTheme("dark")}
            className="p-1 bg-blue-950 text-white rounded-full "
          >
            <MdOutlineNightlightRound size={20} />
          </button>
          <p className="text-blue-950 font-extrabold ml-4">Dark Mode</p>
        </div>
      )}
    </div>
  );
};

export default ToggleLight;

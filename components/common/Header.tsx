
import { FaBell } from "react-icons/fa6";
import { BiSolidChevronDown } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Container from "./Container"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
// import SideBarDrawer from "./SideBarDrawer";
import ToggleLight from "./ToggleLight";
import { User } from "@prisma/client";
import SignOut from "./SignOut";

type HeaderProps = {
  user: User;
};

const Header = ({user}: HeaderProps) => {
  return (
    <Container>
      <header className=" z-20 bg-white rounded-md shadow-sm dark:bg-black dark:border-b ">
        <nav className="p-2 transition-all ">
          <div className="flex flex-wrap justify-between items-center mx-8 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center">
            <Image src="/clock.svg" alt="clock" width={30} height={30} />
                <span className="text-md dark:text-white font-medium ml-5 font-extrabold">
                  COMPANY NAME
                </span>
              {/* <div className="flex items-center space-x-3 md:space-x-6">
                <img className="h-8 w-8" src={circle} alt="clock" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  10:00 AM
                </span>
              {" "}
              {/* <SideBarDrawer user={user} />{" "} */}
            </div>

            {/* RIGHT SIDE  */}

            <div className="flex items-center space-x-3 md:space-x-6">
              <button className="p-2 bg-gray-100 rounded-full text-blue-900">
                <FaBell size={20} />
              </button>
              <Avatar>
                <AvatarImage src={user?.image as string} alt="Profile" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className=" text-slate-500 dark:text-slate-300">
                    <BiSolidChevronDown size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-54">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>

                  <div className="flex flex-col items-center space-y-6 ">
                    <SignOut />
                  </div>

                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;

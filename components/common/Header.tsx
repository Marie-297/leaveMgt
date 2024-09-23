
import NotificationBell from "./Notificationbell";
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
                <span className="text-md dark:text-white ml-5 font-extrabold">
                  EMPLOYEE LEAVE MANAGEMENT SYSTEM
                </span>
            </div>

            {/* RIGHT SIDE  */}

            <div className="flex items-center space-x-3 md:space-x-6 z-1000 absolute right-2">
            <NotificationBell userId={user.id} />

            <Avatar>
              {/* <AvatarImage src={user?.image as string} alt="Profile" /> */}
              <AvatarFallback className="bg-slate-950 dark:bg-slate-300 text-white font-extrabold dark:text-slate-950">
                {user?.name ? user.name.split(" ").map((word) => word.charAt(0).toUpperCase()).join(""):"U"}
              </AvatarFallback>
            </Avatar>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button title="user" className=" text-slate-500 dark:text-slate-300">
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

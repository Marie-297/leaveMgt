import {
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  HiMiniComputerDesktop,
} from "react-icons/hi2";
import { TbListCheck } from "react-icons/tb";
import { BsCalendarEventFill, BsCreditCard2Front } from "react-icons/bs";

export const AdminRoutes = [
  { title: "Dashboard", url: "/dashboard/", icon: HiOutlineSquares2X2 },
  { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
  { title: "Credits", url: "/dashboard/credits", icon: BsCreditCard2Front },
  { title: "Leaves", url: "/dashboard/leaves", icon: TbListCheck },
  { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
  {
    title: "Events",
    url: "/dashboard/event",
    icon: BsCalendarEventFill,
  },
];

export const UserRoutes = [
  { title: "Dashboard", url: "/dashboard", icon: HiMiniComputerDesktop },
  { title: "History", url: "/portal/history", icon: TbListCheck },
];


export const ModeratorRoutes = [
  { title: "Dashboard", url: "/dashboard/", icon: HiOutlineSquares2X2 },
  { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
  { title: "Credits", url: "/dashboard/credits", icon: BsCreditCard2Front },
  { title: "Leaves", url: "/dashboard/leaves", icon: TbListCheck },
  { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
  {
    title: "Events",
    url: "/dashboard/event",
    icon: BsCalendarEventFill,
  },
];
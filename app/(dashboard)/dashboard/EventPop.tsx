import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Events } from "@prisma/client";



type Props = {
  event: Events;
  date: number;
  isHoliday: boolean;
};

export default function EventPopOver({ event, date, isHoliday }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <h1
              className={cn(
                isHoliday && "bg-red-600 text-white", "bg-slate-200 text-slate-600 border",
                "h-6 w-6 p-1 grid place-content-center  rounded-full cursor-pointer hover:bg-black hover:text-white dark:hover:bg-slate-500"
              )}
            >
              {date}{" "}
            </h1>
          </NavigationMenuTrigger>
          <NavigationMenuContent className=" shadow-lg">
            <div className=" flex flex-col w-32 p-2  text-xs">
              <p className="underline underline-offset-2 ">{event?.title}</p>
              <p>{event?.description}</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

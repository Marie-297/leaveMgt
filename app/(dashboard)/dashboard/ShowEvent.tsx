import NotificationBell from "@/components/common/Notificationbell";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Events } from "@prisma/client";
import { format } from "date-fns";

type Props = {
  event: Events;
  date: Date;
};

export default function ShowEvent({ event, date }: Props) {
  const formattedDate = format(date, "dd-MM-yyyy");
  return (
    <>
      <Card>
        <CardContent className="flex w-full items-center justify-between p-1 space-y-0.5 ">
        <h1
              className={cn(
                "bg-slate-200 text-slate-600 border",
                "h-8 w-20 p-1 grid place-content-center border cursor-pointer rounded-sm hover:bg-black hover:text-white dark:hover:bg-slate-500"
              )}
            >
              {formattedDate}{" "}
            </h1>
          <div className="flex flex-col">
            <div className=" flex flex-col w-full p-2  text-xs">
              <h4 className="underline text-center underline-offset-2 font-bold ">{event?.title}</h4>
              <p>{event?.description}</p>
            </div>
          </div>
          <NotificationBell />
        </CardContent>
      </Card>
    </>
  );
}

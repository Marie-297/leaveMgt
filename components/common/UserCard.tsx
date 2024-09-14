"use client";
import { Card, CardContent } from "@/components/ui/card";

type LeaveCardProps = {
  title: string;
  firsttitle: string;
  secondtitle: string;
  thirdtitle: string;
  firstcount: number;
  secondcount: number;
  thirdcount: number;
};
const UserCard = ({
  title, firstcount, secondcount, thirdcount, firsttitle, secondtitle, thirdtitle
}: LeaveCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col p-3 space-y-2 ">
        <div className="flex items-center justify-between p-2  bg-slate-950 text-white  rounded-md font-semibold  dark:bg-gray-100 dark:text-slate-950">
          <h4>{title}</h4>
        </div>
        <div className="flex items-center justify-between ">
          <h4>{firsttitle}</h4>
          <h4>{firstcount}</h4>
        </div>
        <div className="flex items-center justify-between ">
          <h4>{secondtitle}</h4>
          <h4>{secondcount}</h4>
        </div>
        <div className="flex items-center justify-between ">
          <h4>{thirdtitle}</h4>
          <h4>{thirdcount}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;

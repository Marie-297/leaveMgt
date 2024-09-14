"use client";
import { Card, CardContent } from "@/components/ui/card";

type LeaveCardProps = {
  title: string;
  subtitle: string;
  count: number;
  details?: ReactNode;
};
const LeaveCard = ({
  title, count, subtitle, details
}: LeaveCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col p-3 space-y-2 ">
        <div className="flex items-center justify-between p-2  bg-slate-950 text-white  rounded-md font-semibold  dark:bg-gray-100 dark:text-slate-950">
          <h4>{title}</h4>
        </div>
        <div className="flex items-center justify-between ">
          <h4>{subtitle}</h4>
          <h4>{count}</h4>
        </div>
        {details && <div>{details}</div>}
      </CardContent>
    </Card>
  );
};

export default LeaveCard;

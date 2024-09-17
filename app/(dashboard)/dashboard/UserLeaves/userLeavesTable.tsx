
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { formatDistance, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Leave, LeaveStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";

type leaveProps = {
  leaves: Leave[];
};

const UserLeavesTable = async ({ leaves }: leaveProps) => {
  const user = await getCurrentUser();
  if (!user?.email) {
    return null;
  }

  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead>Year</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Requested On</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Days</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Updated At</TableHead>
          {/* <TableHead>Supervisor Notes</TableHead> */}
          <TableHead>Substitute</TableHead>
          <TableHead className="text-right">Authorized By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="whitespace-nowrap">
        {leaves.filter((leave) => leave.userEmail === user.email).map((leave) => (
          <TableRow key={leave.id}>
            <TableCell className="font-medium">{leave.year}</TableCell>
            <TableCell className="font-medium">{leave.type}</TableCell>
            <TableCell className="font-medium">
              {dayjs(leave.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </TableCell>
            <TableCell className="flex font-medium">
              <span>{dayjs(leave.startDate).format("DD/MM/YYYY")} </span> - {" "}
              <span>{dayjs(leave.endDate).format("DD/MM/YYYY")} </span>{" "}
            </TableCell>
            <TableCell>{leave.days}</TableCell>
            <TableCell className="">
              <Badge    className={ `
              ${leave.status === LeaveStatus.APPROVED && "bg-green-900"} 
              ${leave.status === LeaveStatus.PENDING && "bg-amber-300"} 
              ${leave.status === LeaveStatus.REJECTED && "bg-red-900"} 
              `  }> {leave.status}</Badge>{" "}
            </TableCell>
            <TableCell>{leave.userNote}</TableCell>
            <TableCell className="">
              {formatDistance(
                subDays(new Date(leave.updatedAt), 0),
                new Date(),
                { addSuffix: true }
              )}
            </TableCell>
            <TableCell className="">{leave.moderatorNote}</TableCell>
            <TableCell className="text-right">{leave.moderator}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserLeavesTable;

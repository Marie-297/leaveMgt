import Container from "@/components/common/Container";
import LeaveCard from "./LeaveCard";
import { Leave,  User } from "@prisma/client";
import { leaveTypes } from "@/lib/data/dummy-data";
import { Badge } from "@/components/ui/badge";

type Props = {
  user: User;
  leaves: {
    pending: Leave[];
    approved: Leave[];
    rejected: Leave[];
  };
  totalUsers: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
};

const UserBalances = ({ user, leaves={ pending: [], approved: [], rejected: [] }, totalUsers, pendingCount, approvedCount, rejectedCount }: Props) => {
  const renderLeaveDetails = (leaveList: Leave[]) => {
    // if (leaveList.length === 0) return "No leave records";

    return (
      <div>
        {leaveList.map((leave) => (
          <div key={leave.id} className="p-2 border-b flex justify-between">
            <p><strong>{leave.userName}</strong></p>
            <Badge>
              <p>{leaveTypes.find(l => l.label === leave.type)?.label || leave.type}</p>
            </Badge>
          </div>
        ))}
      </div>
    );
  };
  return (
    <Container>
      <section className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <LeaveCard
          title="Employees"
          subtitle="Total Users"
          count={totalUsers}
        />
        <LeaveCard
           title="Pending Leave(s)"
           subtitle="Total Leaves Pending"
           count={pendingCount}
           details={renderLeaveDetails(leaves.pending)}
        />
        <LeaveCard
          title="Approved Leave(s)"
          subtitle="Total Leaves Approved"
          count={approvedCount}
          details={renderLeaveDetails(leaves.approved)}
        />
        <LeaveCard
          title="Rejected Leave(s)"
          subtitle="Total Leave Rejected"
          count={rejectedCount}
          details={renderLeaveDetails(leaves.rejected)}
        />
      </section>
    </Container>
  );
};

export default UserBalances;

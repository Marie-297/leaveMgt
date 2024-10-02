import Container from "@/components/common/Container";
import LeaveCard from "./LeaveCard";
import { Balances, LeaveStatus, User } from "@prisma/client";

type Props = {
  leaveStatus: LeaveStatus
  user: User
  balances: Balances;
};

const UserBalances = ({ balances, leaveStatus, user }: Props) => {
  return (
    <Container>
      <section className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <LeaveCard
          year={balances?.year}
          leaveType={"ANNUAL"}
          credit={balances?.annualCredit as number}
          used={balances?.annualUsed as number}
          balance={balances?.annualAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"STUDY"}
          credit={balances?.studyCredit as number}
          used={balances?.studyUsed as number}
          balance={balances?.studyAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"SICK"}
          credit={balances?.sickCredit as number}
          used={balances?.sickUsed as number}
          balance={balances?.sickAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"CASUAL"}
          credit={balances?.casualCredit as number}
          used={balances?.casualUsed as number}
          balance={balances?.casualAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"PATERNITY"}
          credit={balances?.paternityCredit as number}
          used={balances?.paternityUsed as number}
          balance={balances?.paternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"MATERNITY"}
          credit={balances?.maternityCredit as number}
          used={balances?.maternityUsed as number}
          balance={balances?.maternityAvailable as number}
        />
        <LeaveCard
          year={balances?.year}
          leaveType={"UNPAID"}
          used={balances?.unpaidUsed as number}
        />
      </section>
    </Container>
  );
};

export default UserBalances;

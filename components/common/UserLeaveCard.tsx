import Container from "./Container";
import { Balances, LeaveStatus, User } from "@prisma/client";
import UserCard from "./UserCard";

type Props = {
  balances: Balances;
};

const UserLeaveCards = ({balances}: Props) => {
  

  return (
    <Container>
      <section className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <UserCard
          title="Annual Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.annualCredit as number}
          secondcount={balances?.annualUsed as number}
          thirdcount={balances?.annualAvailable as number}
        />
        <UserCard
          title="Casual Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.casualCredit as number}
          secondcount={balances?.casualUsed as number}
          thirdcount={balances?.casualAvailable as number}
        />
        <UserCard
          title="Study Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.studyCredit as number}
          secondcount={balances?.studyUsed as number}
          thirdcount={balances?.studyAvailable as number}
        />
        <UserCard
          title="Paternity Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.paternityCredit as number}
          secondcount={balances?.paternityUsed as number}
          thirdcount={balances?.paternityAvailable as number}
        />
        <UserCard
          title="Sick Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.sickCredit as number}
          secondcount={balances?.sickUsed as number}
          thirdcount={balances?.sickAvailable as number}
        />
        <UserCard
          title="Maternity Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.maternityCredit as number}
          secondcount={balances?.maternityUsed as number}
          thirdcount={balances?.maternityAvailable as number}
        />
      </section>
    </Container>
  );
};

export default UserLeaveCards;

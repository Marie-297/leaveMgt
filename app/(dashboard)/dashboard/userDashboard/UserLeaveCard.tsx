import Container from "../../../../components/common/Container";
import { Balances, LeaveStatus, User } from "@prisma/client";
import UserCard from "../../../../components/common/UserCard";

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
          firstcount={balances?.annualCredit ?? 0}
          secondcount={balances?.annualUsed ?? 0}
          thirdcount={balances?.annualAvailable ?? 0}
        />
        <UserCard
          title="Casual Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.casualCredit ?? 0}
          secondcount={balances?.casualUsed ?? 0}
          thirdcount={balances?.casualAvailable ?? 0}
        />
        <UserCard
          title="Study Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.studyCredit ?? 0}
          secondcount={balances?.studyUsed ?? 0}
          thirdcount={balances?.studyAvailable ?? 0}
        />
        <UserCard
          title="Paternity Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.paternityCredit?? 0}
          secondcount={balances?.paternityUsed ?? 0}
          thirdcount={balances?.paternityAvailable ?? 0}
        />
        <UserCard
          title="Sick Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.sickCredit ?? 0}
          secondcount={balances?.sickUsed ?? 0}
          thirdcount={balances?.sickAvailable ?? 0}
        />
        <UserCard
          title="Maternity Leave"
          firsttitle="Credit"
          secondtitle="Used"
          thirdtitle="Available"
          firstcount={balances?.maternityCredit ?? 0}
          secondcount={balances?.maternityUsed ?? 0}
          thirdcount={balances?.maternityAvailable ?? 0}
        />
      </section>
    </Container>
  );
};

export default UserLeaveCards;

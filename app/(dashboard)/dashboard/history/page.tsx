import Container from "@/components/common/Container";
import HistoryTable from "./HistoryTable";
import TableWrapper from "../../../../components/common/TableWrapper";

import { Leave } from "@prisma/client";
import { getUserLeaveDays } from "@/lib/data/getLeaveDays";

const UserHistory = async () => {
  const leaveHistory = await getUserLeaveDays()

  if (leaveHistory === null) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container>
      <h2 className="text-6xl font-cormorant font-bold tracking-tight">Dashboard</h2>
      <TableWrapper title="My Leave History">
        <HistoryTable history={leaveHistory as  Leave[]} />
      </TableWrapper>
    </Container>
  );
};

export default UserHistory;
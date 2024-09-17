import Container from "@/components/common/Container";
import TableWrapper from "@/components/common/TableWrapper";
import { getUserLeaveDays } from "@/lib/data/getLeaveDays";
import { Leave } from "@prisma/client";
import UserLeavesTable from "./userLeavesTable";

export default async function  UserLeaves()  {
  const allLeaves = await getUserLeaveDays();
  if (allLeaves === null) {
    return <Container>No Leaves found...</Container>;
  }

  return (
    <Container>
      <h2 className="text-6xl py-4 font-cormorant font-bold tracking-tight">My Annual Leave Data</h2>
      <TableWrapper title="All Leaves">
        <UserLeavesTable leaves={allLeaves as Leave[]} />
      </TableWrapper>
    </Container>
  );
};
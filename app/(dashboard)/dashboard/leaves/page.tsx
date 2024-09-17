import Container from "@/components/common/Container";
import LeavesTable from "./LeavesTable";
import TableWrapper from "@/components/common/TableWrapper";
import { getAllLeaveDays } from "@/lib/data/getLeaveDays";
import { Leave } from "@prisma/client";
import UserLeaves from "../UserLeaves/page";
import { getCurrentUser } from "@/lib/session";

export default async function  AdminLeaves()  {
  const user = await getCurrentUser();
  const allLeaves = await getAllLeaveDays();
  if (allLeaves === null) {
    return <Container>No Leaves found...</Container>;
  }
  const isAdmin = user?.role === 'ADMIN';

  return (
    <>
      {isAdmin ? (
        <>
          <Container>
            <h2 className="text-6xl py-4 font-cormorant font-bold tracking-tight">Employees Annual Leave Data</h2>
            <TableWrapper title="All Leaves">
              <LeavesTable leaves={allLeaves as Leave[]} />
            </TableWrapper>
            </Container>
        </>
      ): (
        <UserLeaves />
      )}
    </>
  );
};
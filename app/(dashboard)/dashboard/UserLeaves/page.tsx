
import Container from "@/components/common/Container";
import TableWrapper from "@/components/common/TableWrapper";
import { getUserLeaveDays } from "@/lib/data/getLeaveDays";
import { Leave } from "@prisma/client";
import UserLeavesTable from "./userLeavesTable";
import ClientDownloadButton from "@/components/common/DownlaodButton";
import { DropdownMenuItem, DropdownMenuTrigger, DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export default async function  UserLeaves()  {
  const allLeaves = await getUserLeaveDays();
  if (allLeaves === null) {
    return <Container>No Leaves found...</Container>;
  }

  return (
    <Container>
      <h2 className="text-6xl py-4 font-cormorant font-bold tracking-tight">My Annual Leave Data</h2>
      <TableWrapper title="All Leaves" buttonB = {
      <ClientDownloadButton contentId="userPrintTable" leaves={allLeaves}/>} buttonA={""}>
        <UserLeavesTable leaves={allLeaves as Leave[]} />
      </TableWrapper>
    </Container>
  );
};
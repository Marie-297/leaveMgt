import Container from "@/components/common/Container"
import BalancesTable from "./BalancesTable"
import { getAllBalances } from "@/lib/data/getBalanceData";
import { Balances } from "@prisma/client";


export default async function AdminBalances  ()  {
  const allBalances = await getAllBalances();
  if (allBalances === null) {
    return <Container>No Balances found...</Container>;
  }
  return (
    <Container>
      <h2 className="text-6xl py-4 font-cormorant font-extrabold tracking-tight">Employees Leave Credits Analytics</h2>
      <BalancesTable balances={allBalances as Balances[]}/>
    </Container>
  )
}


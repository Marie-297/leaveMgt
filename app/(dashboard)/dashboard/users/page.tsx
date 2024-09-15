import Container from '@/components/common/Container'
import TableWrapper from '@/components/common/TableWrapper'
import UsersTable from './UserTable'
import { getAllUsers } from '@/lib/data/getUserData'



export default async function AdminUsersPage ()  {
  const users = await getAllUsers()
 
  return (
    <Container>
      <h2 className="text-6xl py-4 font-cormorant font-bold tracking-tight">Employees Profile</h2>
      <TableWrapper title='Admin Users'>
        <UsersTable users={users} />
      </TableWrapper>
    </Container>
  )
}

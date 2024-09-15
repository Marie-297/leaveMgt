import React from 'react'
import WelcomeBanner from './Welcome'
import { getCurrentUser } from '@/lib/session';
import Title from '@/components/common/TitleBar';
import Calendar from './Calender';
import { Balances, LeaveCategory, User } from '@prisma/client';
import Container from '@/components/common/Container';
import UserBalances from './UserBalances';
import { getEventsData } from '@/lib/data/getEventsData';
import prisma from '@/lib/prisma';
import { getLeaveStatusCounts } from '@/lib/data/leaveData';
import UserDashboard from './userDashboard/page';
import { getLeaveData } from '@/lib/data/getLeaveData';

const Dashboard = async () => {
  const user = await getCurrentUser();
  const Events = await getEventsData();
  const totalUsers = await prisma.user.count();
  const { pendingCount, approvedCount, rejectedCount } = await getLeaveStatusCounts();
  const leaveData = await getLeaveData();

  const isAdmin = user?.role === 'ADMIN';
  return (
    <>
      {isAdmin ? (
        <>
          <Title title="Dashboard" user={user as User} />
          <WelcomeBanner user={user as User} />
          <Calendar events={Events} />
          <div>
            <Container>
              <h2 className="text-xl text-center font-extrabold leading-9  lg:text-2xl mt-4">
                Leave Types Analytics...
              </h2>
            </Container>
            <UserBalances user={user as User}
            pendingCount={pendingCount < 1 ? 0 : pendingCount}
            approvedCount={approvedCount < 1 ? 0 : approvedCount}rejectedCount={rejectedCount < 1 ? 0 : rejectedCount}
            leaves={leaveData}  />
          </div>
        </>
      ) : (
        <UserDashboard />
      )}
      
    </>
  )
}

export default Dashboard
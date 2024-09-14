import React from 'react'
import WelcomeBanner from '../Welcome';
import { getCurrentUser } from '@/lib/session';
import Title from '@/components/common/TitleBar';
import { User, Balances } from '@prisma/client';
import UserCalendar from '@/components/common/UserCalendar';
import UserLeaveCards from '@/components/common/UserLeaveCard';
import { getUserBalances } from '@/lib/data/getBalanceData';
// import { Balances, User } from '@prisma/client';
// import { getUserBalances } from '@/lib/data/getBalanceData';
// import Container from '@/components/common/Container';
// import UserBalances from './UserBalances';
// import { getEventsData } from '@/lib/data/getEventsData';
// import prisma from '@/lib/prisma';
// import { getLeaveStatusCounts } from '@/lib/data/leaveData';




const UserDashboard = async() => {
  const user = await getCurrentUser();
  const balances = await getUserBalances();
  // const CurrentYearBalances = await getUserBalances();
  // const Events = await getEventsData();

  return (
    <>
      <Title title="Dashboard" user={user as User} />
      <WelcomeBanner user={user as User} />
      <div className='w-1/2'>
        <UserCalendar user={user as User} />
      </div>
      <UserLeaveCards balances={balances as Balances} />
      <div>Hello User</div>
    </>
  )
}

export default UserDashboard;
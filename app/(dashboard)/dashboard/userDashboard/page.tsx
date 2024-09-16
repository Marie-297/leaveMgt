import React from 'react'
import WelcomeBanner from '../Welcome';
import { getCurrentUser } from '@/lib/session';
import Title from '@/components/common/TitleBar';
import { User, Balances, Events } from '@prisma/client';
import UserCalendar from '@/components/common/UserCalendar';
import UserLeaveCards from '@/components/common/UserLeaveCard';
import { getUserBalances } from '@/lib/data/getBalanceData';
import UserEventsTable from './UserEvent';
import { getUserEvents } from '@/lib/data/getEventsData';
// import { Balances, User } from '@prisma/client';
// import { getUserBalances } from '@/lib/data/getBalanceData';
// import Container from '@/components/common/Container';
// import UserBalances from './UserBalances';
import { getEventsData } from '@/lib/data/getEventsData';
// import prisma from '@/lib/prisma';
// import { getLeaveStatusCounts } from '@/lib/data/leaveData';




const UserDashboard = async() => {
  const user = await getCurrentUser();
  const balances = await getUserBalances();
  const events = await getUserEvents(user?.email || '');
  
  return (
    <>
      <Title title="Dashboard" user={user as User} />
      <WelcomeBanner user={user as User} />
      <div className="w-full flex justify-between gap-x-10">
        <div className="w-1/2">
          <UserCalendar user={user as User} />
        </div>
        <div className="w-1/2">
          <UserEventsTable events={events as Events[]} />
        </div>
      </div>
      <UserLeaveCards balances={balances as Balances} />
      <div>Hello User</div>
    </>
  )
}

export default UserDashboard;
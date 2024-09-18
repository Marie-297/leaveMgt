import React from 'react'
import WelcomeBanner from '../Welcome';
import { getCurrentUser } from '@/lib/session';
import Title from '@/components/common/TitleBar';
import { User, Balances, Events } from '@prisma/client';
import UserCalendar from '@/components/common/UserCalendar';
import UserLeaveCards from '@/app/(dashboard)/dashboard/userDashboard/UserLeaveCard';
import { getUserBalances } from '@/lib/data/getBalanceData';
import UserEventsTable from './UserEvent';
import { getUserEvents } from '@/lib/data/getEventsData';
import { getEventsData } from '@/lib/data/getEventsData';
import { format } from 'date-fns';


const UserDashboard = async() => {
  const Events = await getEventsData();
  const user = await getCurrentUser();
  const balances = await getUserBalances();
  const events = await getUserEvents(user?.email || '');
  
  return (
    <>
      <Title title="Dashboard" user={user as User} />
      <WelcomeBanner user={user as User} />
      <div className="w-full flex justify-between gap-x-10">
        <div className="w-1/2">
          <UserCalendar user={user as User} events={Events} />
        </div>
        <div className="w-1/2">
          <UserEventsTable events={events as Events[]} user={user as User} />
        </div>
      </div>
      <UserLeaveCards balances={balances as Balances} />
      <div>Hello User</div>
    </>
  )
}

export default UserDashboard;
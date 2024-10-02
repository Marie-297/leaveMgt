import Container from '@/components/common/Container';
import LeaveCard from '../(dashboard)/dashboard/LeaveCard';
import { Leave, User } from '@prisma/client';
import { leaveTypes } from '@/lib/data/dummy-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createElement } from 'react';
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { TbListCheck } from 'react-icons/tb';
import { BsCalendar4Event } from 'react-icons/bs';
import { FaBirthdayCake } from 'react-icons/fa';

type Props = {
	// user: User;
	// leaves: {
	//   pending: Leave[];
	//   approved: Leave[];
	//   rejected: Leave[];
	// };
	// totalUsers: number;
	pendingCount: number;
	approvedCount: number;
	rejectedCount: number;
	userCount: number;
	eventCount: number;
	birthdayCount: number;
};

const Statistics = ({
	pendingCount,
	approvedCount,
	rejectedCount,
	userCount,
	eventCount,
	birthdayCount,
}: Props) => {
	const renderLeaveDetails = (leaveList: Leave[]) => {
		return (
			<div>
				{leaveList.map((leave) => (
					<div key={leave.id} className='p-2 border-b flex justify-between'>
						<p>
							<strong>{leave.userName}</strong>
						</p>
						<Badge>
							<p>
								{leaveTypes.find((l) => l.label === leave.type)?.label ||
									leave.type}
							</p>
						</Badge>
					</div>
				))}
			</div>
		);
	};
	const StatsCardsData = [
		{
			key: 'leave',
			title: 'Total Leaves',
			change: -2,
			value: pendingCount + approvedCount + rejectedCount,
			icon: TbListCheck,
		},
		{
			key: 'user',
			title: 'Total Users',
			change: 4,
			value: userCount,
			icon: HiOutlineUserGroup,
		},
		{
			key: 'event',
			title: 'Upcoming Events',
			change: 3,
			value: eventCount,
			icon: BsCalendar4Event,
		},
		{
			key: 'birthday',
			title: 'Upcoming Birthdays',
			change: 3,
			value: birthdayCount,
			icon: FaBirthdayCake,
		},
	];
	return (
		<Container>
			<section className='grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{StatsCardsData.map((stat) => (
					<Card key={stat.key}>
						<CardHeader>
							<CardTitle className='flex flex-row items-center justify-between space-y-0 pb-2'>
								{stat.title}
								{createElement(stat.icon, {
									size: 24,
								})}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{stat.value}</div>
							{/* <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  {" "}
                  {stat.change > 0 ? <HiArrowNarrowUp className="text-green-600 " size={16}/> : <HiArrowNarrowDown className="text-red-600 " size={16}/>}{" "}
                  {stat.change}{" "}
                </span>{" "}
                from last month
              </p> */}
						</CardContent>
					</Card>
				))}
				{/* <LeaveCard
          title="Employees"
          subtitle="Total Users"
          count={totalUsers}
        />
        <LeaveCard
           title="Pending Leave(s)"
           subtitle="Total Leaves Pending"
           count={pendingCount}
           details={renderLeaveDetails(leaves.pending)}
        />
        <LeaveCard
          title="Approved Leave(s)"
          subtitle="Total Leaves Approved"
          count={approvedCount}
          details={renderLeaveDetails(leaves.approved)}
        />
        <LeaveCard
          title="Rejected Leave(s)"
          subtitle="Total Leave Rejected"
          count={rejectedCount}
          details={renderLeaveDetails(leaves.rejected)}
        /> */}
			</section>
		</Container>
	);
};

export default Statistics;

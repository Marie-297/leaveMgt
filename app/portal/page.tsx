
import Container from "@/components/common/Container"
import { MonthDateRangePicker } from "@/app/(dashboard)/dashboard/MonthDateRangePicker"
import { Button } from "@/components/ui/button"
import { getLeaveData } from "@/lib/data/getLeaveData"
import Statistics from "./Statistic"
import prisma from "@/lib/prisma"
import { getEventsData } from "@/lib/data/getEventsData"
import { getLeaveStatusCounts } from "@/lib/data/leaveData"
import PrintOut from "./PrintOut"
import { getAllLeaveDays } from "@/lib/data/getLeaveDays"
import { Leave } from "@prisma/client"
import React from "react"
import ClientDownloadButton from "@/components/common/DownlaodButton"



const countBirthdayEvents = (events: any[]) => {
  return events.filter(event => event.title.toUpperCase() === "BIRTHDAY").length;
};

const Portal = async () => {
 const events = await getEventsData()
  const birthCount = countBirthdayEvents(events);
  const eventsCount = await prisma.events.count();
  const totalUsers = await prisma.user.count();
  const { pendingCount, approvedCount, rejectedCount } = await getLeaveStatusCounts();
  const allLeaves = await getAllLeaveDays();

  return (
    <Container>
      <div className="flex flex-col md:flex-row py-6 items-center justify-between ">
        <h2 className="text-6xl font-cormorant font-bold tracking-tight">Portal</h2>
        <div className="flex items-center space-x-2">
          <MonthDateRangePicker />
          <ClientDownloadButton contentId="printout-table"  />
        </div>
      </div>
      <Statistics pendingCount={pendingCount} approvedCount={approvedCount} rejectedCount={rejectedCount} userCount={totalUsers} eventCount={eventsCount} birthdayCount={birthCount}  />
      <PrintOut leaves={allLeaves as Leave[]} />
    </Container>
  )
}

export default Portal
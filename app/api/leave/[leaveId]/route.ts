import calculateAndUpdateBalances from "@/lib/data/calculateBalances";
import { leaveTypes } from "@/lib/data/dummy-data";
import { getCurrentUser } from "@/lib/session";
import { LeaveStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import sendEmail from "@/lib/sendEmail";
import { format } from "date-fns";

type EditBody = {
  notes: string;
  status: LeaveStatus;
  id: string;
  userId: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string
  startDate: string;
  createdAt: string;
}

export async function PATCH(req: Request) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN" && loggedInUser?.role !== "MODERATOR") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: EditBody = await req.json();

    const { notes, status, id, days, type, year, email, user, startDate, createdAt, } = body;

    const updatedAt = new Date().toISOString();
    const moderator = loggedInUser.name;
    const leaveUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!leaveUser) {
      throw new Error("User not found for the given email");
    }

    const userId = leaveUser.id;

    if (status === LeaveStatus.APPROVED) {
      await calculateAndUpdateBalances(email, year, type, days);
      const title = `${user} on Leave`
      const description = `For ${days} days`
      await prisma.events.create({
        data: {
          startDate,
          title,
          description,
          userEmail: email,
        },
      });
      await prisma.notification.create({
        data: {
          userId, 
          title: `"Approved Leave Request"`,
          content: `Your ${type} Leave submitted has successfully been APPROVED by ${moderator} on ${updatedAt} `, 
          type: 'LEAVE_REQUEST', 
        },
      });
      
      await sendEmail(
        email, 
        'Leave Request Approved',
        `Your leave request submitted for ${days} days has been approved by ${moderator} on ${updatedAt}.`
      );
    }
   if (status === LeaveStatus.REJECTED) {
      await prisma.notification.create({
        data: {
          userId, 
          title:  "Rejected Leave Request",
          content: `Your ${type} Leave submitted has been REJECTED by ${moderator} on ${updatedAt} `, 
          type: 'LEAVE_REQUEST',
        },
      });
      await sendEmail(
        email, 
        'Leave Request Rejected',
        `Your leave request submitted for ${days} days has been rejected by ${moderator} on ${updatedAt}.`
      );
   }
    await prisma.leave.update({
      where: { id },
      data: { moderatorNote: notes, status, updatedAt, moderator },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req: Request) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser?.id) {
    return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: loggedInUser.id },
      orderBy: { createdAt: "desc" },
    });
    console.log("Notifications fetched:", notifications);

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

// POST handler for creating notifications
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { userId, title, content, type } = await req.json();

    // Create a new notification in the database
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        content,
        type,
      },
    });

    // Update the user's unread count
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        unreadCount: {
          increment: 1,
        },
      },
      select: { unreadCount: true },
    });

    // Return a success response
    return NextResponse.json({ notification, unreadCount: updatedUser.unreadCount }, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';

export async function DELETE(req: NextRequest, { params }: { params: { eventId: string } }) {
  const loggedInUser = await getCurrentUser();
  const {eventId} = params;
  if (!eventId && loggedInUser?.role !== 'USER') {
    return NextResponse.json({ error: 'Not permitted or eventId is required' }, { status: 400 });
  }

  try {
    await prisma.events.delete({
      where: { id: eventId }, // Ensure this matches your Prisma schema
    })

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

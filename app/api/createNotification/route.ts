import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, title, content, type } = req.body;

  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        content,
        type,
      },
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        unreadCount: {
          increment: 1,
        },
      },
      select: { unreadCount: true },
    });
    res.status(201).json({ notification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
}

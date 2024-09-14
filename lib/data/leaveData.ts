// lib/data/leaveData.ts
import prisma from '@/lib/prisma';

export async function getLeaveStatusCounts() {
  const pendingCount = await prisma.leave.count({
    where: { status: 'PENDING' },
  });

  const approvedCount = await prisma.leave.count({
    where: { status: 'APPROVED' },
  });

  const rejectedCount = await prisma.leave.count({
    where: { status: 'REJECTED' },
  });
  const userCount = await prisma.user.count({
    where: { role: "USER" || "ADMIN" || "MODERATOR"}
  })

  return {
    pendingCount,
    approvedCount,
    rejectedCount,
    userCount,
  };
}

import { PrismaClient, LeaveStatus, Leave } from '@prisma/client';

const prisma = new PrismaClient();

type LeaveData = {
  pending: Leave[];
  approved: Leave[];
  rejected: Leave[];
};

export const getLeaveData = async (): Promise<LeaveData> => {
  try {
    // Fetch all leaves from the database
    const allLeaves = await prisma.leave.findMany();

    // Categorize leaves based on their status
    const leaveData: LeaveData = {
      pending: allLeaves.filter(leave => leave.status === LeaveStatus.PENDING),
      approved: allLeaves.filter(leave => leave.status === LeaveStatus.APPROVED),
      rejected: allLeaves.filter(leave => leave.status === LeaveStatus.REJECTED),
    };

    return leaveData;
  } catch (error) {
    console.error('Error fetching leave data:', error);
    return { pending: [], approved: [], rejected: [] }; // Return empty arrays in case of an error
  }
};

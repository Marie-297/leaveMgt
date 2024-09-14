
import { PrismaClient, LeaveCategory } from '@prisma/client';

const prisma = new PrismaClient();

export const getLeaveCategories = async (): Promise<string[]> => {
  // Directly use Object.values if the enum is set correctly in the schema
  return Object.values(LeaveCategory);
}
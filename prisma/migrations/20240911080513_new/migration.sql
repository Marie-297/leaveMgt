/*
  Warnings:

  - The `type` column on the `Leave` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "type",
ADD COLUMN     "type" "LeaveCategory" NOT NULL DEFAULT 'Casual';

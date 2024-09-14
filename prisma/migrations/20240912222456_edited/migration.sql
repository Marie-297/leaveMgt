/*
  Warnings:

  - The `department` column on the `Leave` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('FINANCE', 'ADMINISTRATION', 'INFORMATION_TECHNOLOGY', 'LABORATORY', 'PRODUCTION', 'RETAIL');

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "department",
ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'INFORMATION_TECHNOLOGY';

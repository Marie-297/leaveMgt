/*
  Warnings:

  - Added the required column `userEmail` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "userEmail" TEXT NOT NULL;

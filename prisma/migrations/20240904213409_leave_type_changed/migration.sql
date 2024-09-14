/*
  Warnings:

  - You are about to drop the column `familyAvailable` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the column `familyCredit` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the column `familyUsed` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthAvailable` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthCredit` on the `Balances` table. All the data in the column will be lost.
  - You are about to drop the column `healthUsed` on the `Balances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balances" DROP COLUMN "familyAvailable",
DROP COLUMN "familyCredit",
DROP COLUMN "familyUsed",
DROP COLUMN "healthAvailable",
DROP COLUMN "healthCredit",
DROP COLUMN "healthUsed",
ADD COLUMN     "casualAvailable" INTEGER DEFAULT 0,
ADD COLUMN     "casualCredit" INTEGER DEFAULT 0,
ADD COLUMN     "casualUsed" INTEGER DEFAULT 0,
ADD COLUMN     "sickAvailable" INTEGER DEFAULT 0,
ADD COLUMN     "sickCredit" INTEGER DEFAULT 0,
ADD COLUMN     "sickUsed" INTEGER DEFAULT 0;

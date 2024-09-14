/*
  Warnings:

  - The values [annualAvailable] on the enum `LeaveCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeaveCategory_new" AS ENUM ('Sick', 'Study', 'Maternity', 'paternity', 'Casual', 'Annual', 'unpaid');
ALTER TABLE "Leave" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Leave" ALTER COLUMN "type" TYPE "LeaveCategory_new" USING ("type"::text::"LeaveCategory_new");
ALTER TYPE "LeaveCategory" RENAME TO "LeaveCategory_old";
ALTER TYPE "LeaveCategory_new" RENAME TO "LeaveCategory";
DROP TYPE "LeaveCategory_old";
ALTER TABLE "Leave" ALTER COLUMN "type" SET DEFAULT 'Casual';
COMMIT;

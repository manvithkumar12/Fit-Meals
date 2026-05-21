/*
  Warnings:

  - You are about to drop the column `profileId` on the `LoggedData` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `TargetData` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "LoggedData_profileId_key";

-- DropIndex
DROP INDEX "TargetData_profileId_key";

-- AlterTable
ALTER TABLE "LoggedData" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "TargetData" DROP COLUMN "profileId";

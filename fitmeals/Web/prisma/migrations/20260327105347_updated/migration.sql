/*
  Warnings:

  - Changed the type of `ActivityLevel` on the `UserData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "ActivityLevel",
ADD COLUMN     "ActivityLevel" TEXT NOT NULL;

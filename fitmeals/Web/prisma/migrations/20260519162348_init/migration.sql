/*
  Warnings:

  - You are about to drop the `SavedCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SavedCard" DROP CONSTRAINT "SavedCard_userId_fkey";

-- DropTable
DROP TABLE "SavedCard";

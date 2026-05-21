/*
  Warnings:

  - Added the required column `itemId` to the `LoggedData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggedData" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LoggedData" ADD CONSTRAINT "LoggedData_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "german_foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

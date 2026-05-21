/*
  Warnings:

  - You are about to drop the column `loggedfat` on the `loggedMeals` table. All the data in the column will be lost.
  - Added the required column `loggedFat` to the `loggedMeals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LoggedMealItems" DROP CONSTRAINT "_LoggedMealItems_A_fkey";

-- AlterTable
ALTER TABLE "loggedMeals" DROP COLUMN "loggedfat",
ADD COLUMN     "loggedFat" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "_LoggedMealItems" ADD CONSTRAINT "_LoggedMealItems_A_fkey" FOREIGN KEY ("A") REFERENCES "german_foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

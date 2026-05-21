/*
  Warnings:

  - Added the required column `fooditems` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDietProfile" ADD COLUMN     "fooditems" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserDietProfile" ADD CONSTRAINT "UserDietProfile_fooditems_fkey" FOREIGN KEY ("fooditems") REFERENCES "german_foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `fooditems` on the `UserDietProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserDietProfile" DROP COLUMN "fooditems";

-- CreateTable
CREATE TABLE "_UserDietProfileTogerman_foods" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserDietProfileTogerman_foods_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserDietProfileTogerman_foods_B_index" ON "_UserDietProfileTogerman_foods"("B");

-- AddForeignKey
ALTER TABLE "_UserDietProfileTogerman_foods" ADD CONSTRAINT "_UserDietProfileTogerman_foods_A_fkey" FOREIGN KEY ("A") REFERENCES "UserDietProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDietProfileTogerman_foods" ADD CONSTRAINT "_UserDietProfileTogerman_foods_B_fkey" FOREIGN KEY ("B") REFERENCES "german_foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_UserDietProfileTogerman_foods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserDietProfileTogerman_foods" DROP CONSTRAINT "_UserDietProfileTogerman_foods_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserDietProfileTogerman_foods" DROP CONSTRAINT "_UserDietProfileTogerman_foods_B_fkey";

-- DropTable
DROP TABLE "_UserDietProfileTogerman_foods";

-- CreateTable
CREATE TABLE "_UserDietFoods" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserDietFoods_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserDietFoods_B_index" ON "_UserDietFoods"("B");

-- AddForeignKey
ALTER TABLE "_UserDietFoods" ADD CONSTRAINT "_UserDietFoods_A_fkey" FOREIGN KEY ("A") REFERENCES "UserDietProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDietFoods" ADD CONSTRAINT "_UserDietFoods_B_fkey" FOREIGN KEY ("B") REFERENCES "german_foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

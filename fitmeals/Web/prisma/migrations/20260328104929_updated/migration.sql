/*
  Warnings:

  - You are about to drop the `_UserDietFoods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserDietFoods" DROP CONSTRAINT "_UserDietFoods_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserDietFoods" DROP CONSTRAINT "_UserDietFoods_B_fkey";

-- DropTable
DROP TABLE "_UserDietFoods";

-- CreateTable
CREATE TABLE "DietFoodItem" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "foodItemId" INTEGER NOT NULL,
    "foodType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "carbos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DietFoodItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DietFoodItem" ADD CONSTRAINT "DietFoodItem_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserDietProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietFoodItem" ADD CONSTRAINT "DietFoodItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "german_foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

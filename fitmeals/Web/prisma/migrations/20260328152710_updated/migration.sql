/*
  Warnings:

  - A unique constraint covering the columns `[userProfileId,foodType,foodItemId]` on the table `DietFoodItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DietFoodItem_userProfileId_foodType_foodItemId_key" ON "DietFoodItem"("userProfileId", "foodType", "foodItemId");

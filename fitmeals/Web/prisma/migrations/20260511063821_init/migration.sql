-- DropForeignKey
ALTER TABLE "DietFoodItem" DROP CONSTRAINT "DietFoodItem_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "UserDietProfile" DROP CONSTRAINT "UserDietProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserDietProfile" DROP CONSTRAINT "UserDietProfile_userdataId_fkey";

-- AddForeignKey
ALTER TABLE "UserDietProfile" ADD CONSTRAINT "UserDietProfile_userdataId_fkey" FOREIGN KEY ("userdataId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietProfile" ADD CONSTRAINT "UserDietProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietFoodItem" ADD CONSTRAINT "DietFoodItem_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserDietProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "loggedMeals" DROP CONSTRAINT "loggedMeals_profileId_fkey";

-- AddForeignKey
ALTER TABLE "loggedMeals" ADD CONSTRAINT "loggedMeals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserDietProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

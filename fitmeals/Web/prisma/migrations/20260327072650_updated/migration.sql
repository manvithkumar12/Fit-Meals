/*
  Warnings:

  - You are about to drop the column `carbTarget` on the `UserDietProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fatTarget` on the `UserDietProfile` table. All the data in the column will be lost.
  - You are about to drop the column `proteinTarget` on the `UserDietProfile` table. All the data in the column will be lost.
  - Added the required column `dailycarb` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyfat` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyprotein` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDietProfile" DROP COLUMN "carbTarget",
DROP COLUMN "fatTarget",
DROP COLUMN "proteinTarget",
ADD COLUMN     "dailycarb" INTEGER NOT NULL,
ADD COLUMN     "dailyfat" INTEGER NOT NULL,
ADD COLUMN     "dailyprotein" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DailyMacroLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedCalories" INTEGER NOT NULL DEFAULT 0,
    "consumedProtein" INTEGER NOT NULL DEFAULT 0,
    "consumedCarbs" INTEGER NOT NULL DEFAULT 0,
    "consumedFats" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyMacroLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietPlanProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "targetCalories" INTEGER NOT NULL,
    "targetProtein" INTEGER NOT NULL,
    "targetCarbs" INTEGER NOT NULL,
    "targetFats" INTEGER NOT NULL,
    "consumedCalories" INTEGER NOT NULL DEFAULT 0,
    "consumedProtein" INTEGER NOT NULL DEFAULT 0,
    "consumedCarbs" INTEGER NOT NULL DEFAULT 0,
    "consumedFats" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DietPlanProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyMacroLog_userId_date_key" ON "DailyMacroLog"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DietPlanProgress_userId_key" ON "DietPlanProgress"("userId");

-- AddForeignKey
ALTER TABLE "DailyMacroLog" ADD CONSTRAINT "DailyMacroLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietPlanProgress" ADD CONSTRAINT "DietPlanProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `DailyMacroItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyMacroLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DietPlanProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyMacroItem" DROP CONSTRAINT "DailyMacroItem_foodId_fkey";

-- DropForeignKey
ALTER TABLE "DailyMacroItem" DROP CONSTRAINT "DailyMacroItem_logId_fkey";

-- DropForeignKey
ALTER TABLE "DailyMacroLog" DROP CONSTRAINT "DailyMacroLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "DietPlanProgress" DROP CONSTRAINT "DietPlanProgress_userId_fkey";

-- DropTable
DROP TABLE "DailyMacroItem";

-- DropTable
DROP TABLE "DailyMacroLog";

-- DropTable
DROP TABLE "DietPlanProgress";

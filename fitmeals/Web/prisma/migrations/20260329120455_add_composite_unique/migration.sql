/*
  Warnings:

  - Added the required column `loggedQuantity` to the `loggedMeals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loggedMeals" ADD COLUMN     "loggedQuantity" INTEGER NOT NULL;

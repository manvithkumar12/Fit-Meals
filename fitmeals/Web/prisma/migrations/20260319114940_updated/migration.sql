/*
  Warnings:

  - Made the column `foodType` on table `CookBook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CookBook" ALTER COLUMN "foodType" SET NOT NULL;

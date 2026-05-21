/*
  Warnings:

  - Added the required column `planType` to the `SubscriptionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionData" ADD COLUMN     "planType" TEXT NOT NULL;

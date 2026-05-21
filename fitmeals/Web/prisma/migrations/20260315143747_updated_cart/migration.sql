/*
  Warnings:

  - Added the required column `OrderStatus` to the `OrderInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "statusofOrder" AS ENUM ('Waiting', 'Cooking', 'Packing', 'InDelivery', 'Delivered');

-- AlterTable
ALTER TABLE "OrderInfo" ADD COLUMN     "OrderStatus" "statusofOrder" NOT NULL;

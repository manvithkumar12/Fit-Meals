/*
  Warnings:

  - The `status` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RestaurantStatus" AS ENUM ('ACTIVE', 'VERIFICATION', 'BLOCKED', 'REST', 'DELETED');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "status",
ADD COLUMN     "status" "RestaurantStatus" NOT NULL DEFAULT 'VERIFICATION';

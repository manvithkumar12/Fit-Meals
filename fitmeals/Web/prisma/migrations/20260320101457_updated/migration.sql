/*
  Warnings:

  - Added the required column `endTime` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "reservationStatus" AS ENUM ('CONFIRMED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "reservationStatus" NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

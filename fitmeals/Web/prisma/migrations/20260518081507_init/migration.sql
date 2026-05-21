/*
  Warnings:

  - You are about to drop the column `LicenceUrl` on the `DeliveryPartner` table. All the data in the column will be lost.
  - You are about to drop the column `vechile` on the `DeliveryPartner` table. All the data in the column will be lost.
  - Added the required column `LicenseUrl` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryPartner" DROP COLUMN "LicenceUrl",
DROP COLUMN "vechile",
ADD COLUMN     "LicenseUrl" TEXT NOT NULL,
ADD COLUMN     "vehicle" TEXT NOT NULL;

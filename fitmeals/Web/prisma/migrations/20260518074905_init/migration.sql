/*
  Warnings:

  - The `status` column on the `DeliveryPartner` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ApplicationUrl` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LicenceUrl` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SelfieUrl` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vechile` to the `DeliveryPartner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryPartner" ADD COLUMN     "ApplicationUrl" TEXT NOT NULL,
ADD COLUMN     "LicenceUrl" TEXT NOT NULL,
ADD COLUMN     "SelfieUrl" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "vechile" TEXT NOT NULL,
ALTER COLUMN "deliveredOrders" SET DEFAULT 0,
ALTER COLUMN "TotalOrders" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "RestaurantStatus" NOT NULL DEFAULT 'VERIFICATION',
ALTER COLUMN "partnerstatus" SET DEFAULT 'IDLE';

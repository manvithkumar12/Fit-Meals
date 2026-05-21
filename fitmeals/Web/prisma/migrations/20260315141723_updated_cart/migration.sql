/*
  Warnings:

  - Added the required column `DeliveryAdressId` to the `OrderInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTime` to the `OrderInfo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `DeliveredTime` on the `OrderInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderInfo" ADD COLUMN     "DeliveryAdressId" INTEGER NOT NULL,
ADD COLUMN     "estimatedTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "DeliveredTime",
ADD COLUMN     "DeliveredTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_DeliveryAdressId_fkey" FOREIGN KEY ("DeliveryAdressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

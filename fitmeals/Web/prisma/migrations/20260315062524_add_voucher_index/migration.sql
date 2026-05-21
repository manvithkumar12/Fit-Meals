-- DropForeignKey
ALTER TABLE "OrderInfo" DROP CONSTRAINT "OrderInfo_DeliveryPartnerId_fkey";

-- AlterTable
ALTER TABLE "OrderInfo" ALTER COLUMN "DeliveryPartnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_DeliveryPartnerId_fkey" FOREIGN KEY ("DeliveryPartnerId") REFERENCES "DeliveryPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

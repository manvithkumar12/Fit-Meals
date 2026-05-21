/*
  Warnings:

  - Added the required column `status` to the `SubscriptionData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SubscriptionData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubscriptionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionData" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "type" "S_Type" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "DaysRemaining" SET DEFAULT 0,
ALTER COLUMN "OrdersPlaced" SET DEFAULT 0;

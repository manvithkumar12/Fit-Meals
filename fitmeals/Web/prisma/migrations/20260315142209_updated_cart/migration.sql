/*
  Warnings:

  - Changed the type of `estimatedTime` on the `OrderInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderInfo" DROP COLUMN "estimatedTime",
ADD COLUMN     "estimatedTime" TIMESTAMP(3) NOT NULL;

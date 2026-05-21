/*
  Warnings:

  - A unique constraint covering the columns `[orderNo]` on the table `OrderInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderInfo_orderNo_key" ON "OrderInfo"("orderNo");

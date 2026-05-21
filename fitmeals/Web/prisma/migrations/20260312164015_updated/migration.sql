-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "voucherId" INTEGER;

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "minimumPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_value_key" ON "Voucher"("value");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "addressId" INTEGER;

-- AlterTable
ALTER TABLE "CookBook" ADD COLUMN     "addressId" INTEGER;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookBook" ADD CONSTRAINT "CookBook_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

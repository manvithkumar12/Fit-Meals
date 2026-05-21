-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

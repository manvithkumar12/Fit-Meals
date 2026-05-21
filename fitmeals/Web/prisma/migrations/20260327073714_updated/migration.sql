-- DropForeignKey
ALTER TABLE "UserDietProfile" DROP CONSTRAINT "UserDietProfile_fooditems_fkey";

-- CreateTable
CREATE TABLE "DailyMacroItem" (
    "id" SERIAL NOT NULL,
    "logId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "DailyMacroItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyMacroItem_logId_idx" ON "DailyMacroItem"("logId");

-- CreateIndex
CREATE INDEX "DailyMacroItem_foodId_idx" ON "DailyMacroItem"("foodId");

-- AddForeignKey
ALTER TABLE "DailyMacroItem" ADD CONSTRAINT "DailyMacroItem_logId_fkey" FOREIGN KEY ("logId") REFERENCES "DailyMacroLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyMacroItem" ADD CONSTRAINT "DailyMacroItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "german_foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

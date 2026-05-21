/*
  Warnings:

  - You are about to drop the column `goal` on the `UserDietProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userdataId]` on the table `UserDietProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `days` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userdataId` to the `UserDietProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDietProfile" DROP COLUMN "goal",
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "userdataId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserDietProfile_userdataId_key" ON "UserDietProfile"("userdataId");

-- AddForeignKey
ALTER TABLE "UserDietProfile" ADD CONSTRAINT "UserDietProfile_userdataId_fkey" FOREIGN KEY ("userdataId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

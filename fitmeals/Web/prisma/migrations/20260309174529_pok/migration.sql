/*
  Warnings:

  - You are about to drop the `german_foods_1` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "german_foods_1";

-- CreateTable
CREATE TABLE "german_foods" (
    "id" SERIAL NOT NULL,
    "bls_code" TEXT,
    "foodname" TEXT,
    "energy" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "carbohydrate" DOUBLE PRECISION,
    "salt" DOUBLE PRECISION,

    CONSTRAINT "german_foods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "german_foods_foodname_idx" ON "german_foods"("foodname");

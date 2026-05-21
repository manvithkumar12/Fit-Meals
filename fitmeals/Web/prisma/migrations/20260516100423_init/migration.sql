-- CreateTable
CREATE TABLE "updates" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "updates_userId_key" ON "updates"("userId");

-- AddForeignKey
ALTER TABLE "updates" ADD CONSTRAINT "updates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

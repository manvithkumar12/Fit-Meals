-- CreateTable
CREATE TABLE "TargetData" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "dailyCalories" INTEGER NOT NULL,
    "dailyprotein" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dailycarb" INTEGER NOT NULL,
    "dailyfat" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TargetData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedData" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "loggedCalories" DOUBLE PRECISION NOT NULL,
    "loggedProtein" DOUBLE PRECISION NOT NULL,
    "loggedCarbos" DOUBLE PRECISION NOT NULL,
    "loggedFat" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "targetDataId" INTEGER NOT NULL,

    CONSTRAINT "LoggedData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TargetData_profileId_key" ON "TargetData"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "TargetData_userId_key" ON "TargetData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LoggedData_profileId_key" ON "LoggedData"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "LoggedData_userId_key" ON "LoggedData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LoggedData_targetDataId_key" ON "LoggedData"("targetDataId");

-- AddForeignKey
ALTER TABLE "TargetData" ADD CONSTRAINT "TargetData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedData" ADD CONSTRAINT "LoggedData_targetDataId_fkey" FOREIGN KEY ("targetDataId") REFERENCES "TargetData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedData" ADD CONSTRAINT "LoggedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

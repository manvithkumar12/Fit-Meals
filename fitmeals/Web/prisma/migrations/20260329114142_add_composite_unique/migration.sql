-- CreateTable
CREATE TABLE "loggedMeals" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "loggedCalories" INTEGER NOT NULL,
    "loggedProtein" INTEGER NOT NULL,
    "loggedCarbos" INTEGER NOT NULL,
    "loggedfat" INTEGER NOT NULL,

    CONSTRAINT "loggedMeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LoggedMealItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LoggedMealItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LoggedMealItems_B_index" ON "_LoggedMealItems"("B");

-- AddForeignKey
ALTER TABLE "loggedMeals" ADD CONSTRAINT "loggedMeals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "UserDietProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedMealItems" ADD CONSTRAINT "_LoggedMealItems_A_fkey" FOREIGN KEY ("A") REFERENCES "DietFoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LoggedMealItems" ADD CONSTRAINT "_LoggedMealItems_B_fkey" FOREIGN KEY ("B") REFERENCES "loggedMeals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

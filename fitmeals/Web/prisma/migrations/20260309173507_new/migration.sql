-- CreateEnum
CREATE TYPE "S_Type" AS ENUM ('NONE', 'STARTER', 'PLUS', 'PREMIUM');

-- CreateEnum
CREATE TYPE "QueryStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'CARD', 'UPI');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'PENDING');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Delivered');

-- CreateEnum
CREATE TYPE "TargetLevel" AS ENUM ('EASY', 'MODERATE', 'HARD');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'DIVERS', 'NOT_SPECIFIED');

-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('ON_ORDER', 'IDLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'OWNER', 'DELIVERY', 'ADMIN', 'SUPPORT');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('BLOCKED', 'SUSPENDED', 'ACTIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "subscriptionsType" "S_Type" NOT NULL DEFAULT 'NONE',
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "profileUrl" TEXT,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "isVerified" "VerificationStatus" NOT NULL,
    "lockUntil" TIMESTAMP(3),
    "failedAttempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "cuisineType" TEXT NOT NULL,
    "priceForTwo" INTEGER NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "facilities" TEXT[],
    "description" TEXT[],
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,
    "mapLink" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "city" TEXT NOT NULL,
    "houseNo" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "streetName" TEXT NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "totalPersons" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT NOT NULL DEFAULT 'N/A',

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "weight" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "description" TEXT[],
    "proteinPer100gm" INTEGER NOT NULL,
    "carboHydratePer100gm" INTEGER NOT NULL,
    "caloriesPer100gm" INTEGER NOT NULL,
    "fatsPer100gm" INTEGER NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAvailable" BOOLEAN NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "foodBenefits" TEXT[],
    "imgUrl" TEXT,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodIngredient" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "foodItemId" INTEGER,
    "cookBookId" INTEGER,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "FoodIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "steps" TEXT[],
    "description" TEXT[],
    "imgUrl" TEXT[],
    "weight" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "nutritionalValue" INTEGER NOT NULL,
    "proteinPer100gm" INTEGER NOT NULL,
    "caloriesPer100gm" INTEGER NOT NULL,
    "fatsPer100gm" INTEGER NOT NULL,
    "carboHydratePer100gm" INTEGER NOT NULL,
    "mainurl" TEXT NOT NULL,
    "addedBy" INTEGER NOT NULL,

    CONSTRAINT "CookBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryPartner" (
    "title" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "deliveredOrders" INTEGER NOT NULL,
    "TotalOrders" INTEGER NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "partnerstatus" "PartnerStatus" NOT NULL,

    CONSTRAINT "DeliveryPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservations" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "reservationTime" TEXT NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerNumber" TEXT NOT NULL,
    "reservationDate" TEXT NOT NULL,
    "seatNo" TEXT NOT NULL DEFAULT 'NA',

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedBacks" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedBacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queries" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "status" "QueryStatus" NOT NULL,

    CONSTRAINT "Queries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserData" (
    "userId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "ActivityLevel" "TargetLevel" NOT NULL,
    "Goal" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDietProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "dailyCalories" INTEGER NOT NULL,
    "proteinTarget" INTEGER NOT NULL,
    "carbTarget" INTEGER NOT NULL,
    "fatTarget" INTEGER NOT NULL,

    CONSTRAINT "UserDietProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "DaysRemaining" INTEGER NOT NULL,
    "OrdersPlaced" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedCard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "last4" TEXT NOT NULL,
    "expMonth" INTEGER NOT NULL,
    "expYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderInfo" (
    "orderNo" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "DeliveryPartnerId" INTEGER NOT NULL,
    "OrderType" "S_Type" NOT NULL,
    "Amount" DECIMAL(10,2) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "modeOfPayment" "PaymentType" NOT NULL,
    "DeliveredTime" INTEGER NOT NULL,
    "OrderedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderInfo_pkey" PRIMARY KEY ("orderNo")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "foodItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodItemId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "german_foods_1" (
    "id" SERIAL NOT NULL,
    "bls_code" TEXT,
    "foodname" TEXT,
    "energy" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "carbohydrate" DOUBLE PRECISION,
    "salt" DOUBLE PRECISION,

    CONSTRAINT "german_foods_1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_ownerId_key" ON "Restaurant"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_restaurantId_title_key" ON "FoodItem"("restaurantId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "CookBook_title_key" ON "CookBook"("title");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryPartner_UserId_key" ON "DeliveryPartner"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "UserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietProfile_userId_key" ON "UserDietProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionData_userId_key" ON "SubscriptionData"("userId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_foodItemId_idx" ON "OrderItem"("foodItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_foodItemId_key" ON "Review"("userId", "foodItemId");

-- CreateIndex
CREATE INDEX "foodname_idx" ON "german_foods_1"("foodname");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIngredient" ADD CONSTRAINT "FoodIngredient_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "CookBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIngredient" ADD CONSTRAINT "FoodIngredient_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookBook" ADD CONSTRAINT "CookBook_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryPartner" ADD CONSTRAINT "DeliveryPartner_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservations" ADD CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBacks" ADD CONSTRAINT "FeedBacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queries" ADD CONSTRAINT "Queries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietProfile" ADD CONSTRAINT "UserDietProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionData" ADD CONSTRAINT "SubscriptionData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCard" ADD CONSTRAINT "SavedCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_DeliveryPartnerId_fkey" FOREIGN KEY ("DeliveryPartnerId") REFERENCES "DeliveryPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderInfo" ADD CONSTRAINT "OrderInfo_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderInfo"("orderNo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

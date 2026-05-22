import React from "react";
import ChatBotButton from "../../General/Button/ChatBotButton";
import HeroSection from "../../FoodComponents/HeroSection";
import Ingredients from "../../IngredientSection/Ingredients";
import NutritionalComponent from "../../NutritionalCard/NutritionalComponent";
import NavbarData from "@/src/Components/General/Navbar/OrderNavbar";

interface FoodDataProps {
  itemData: {
    id: number;
    title: string;
    price: number;
    weight: number;
    time: number;
    proteinPer100gm: number;
    carboHydratePer100gm: number;
    caloriesPer100gm: number;
    fatsPer100gm: number;
    averageRating: number;
    description: string[];
    foodBenefits: string[];
    isAvailable: boolean;
    restaurantId: number;
    totalReviews: number;
    type: string;
    category: string;
    imgUrl: string | null;
    salt: number;
    Ingredients?: {
      id?: number;
      title: string;
      quantity: string;
      imgUrl: string;
    }[];
  };
  restaurantName: string;
}

const OrderItem = ({ itemData, restaurantName }: FoodDataProps) => {
  const ingredients = itemData.Ingredients || [];

  return (
    <>
      <ChatBotButton />
      {/* Premium Content Wrapper */}
      <div className="min-h-screen bg-zinc-50/40 dark:bg-zinc-950 pb-20">
        
        {/* Navigation Navbar */}
        <NavbarData
          NavType={"order"}
          itemsdata={{
            id: itemData.id,
            restaurantId: itemData.restaurantId,
            title: itemData.title,
            restaurant: restaurantName,
          }}
        />

        {/* Hero Banner Section */}
        <div className="w-full max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-100 dark:border-zinc-800/80 shadow-xl shadow-zinc-100/30 dark:shadow-none">
            <HeroSection
              title={itemData.title}
              description={itemData.description}
              calories={itemData.caloriesPer100gm}
              time={itemData.time}
              weight={itemData.weight}
              ImgUrl={itemData.imgUrl ?? "/Fitmeals-logo.png"}
              price={itemData.price}
              Rating={itemData.averageRating}
            />
          </div>
        </div>

        {/* 2-Column Responsive Layout Grid (Ingredients + Nutrition) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left/Main Column - Ingredients */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Dynamic Ingredients card (rendered ONCE) */}
              <Ingredients IngredientList={ingredients} />
            </div>

            {/* Sidebar Column - Nutritional Info */}
            <div className="lg:col-span-1 lg:sticky lg:top-8">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xl shadow-zinc-100/30 dark:shadow-none transition-all duration-300">
                <NutritionalComponent
                  EnergyKcal={itemData.caloriesPer100gm}
                  Fat={itemData.fatsPer100gm}
                  Salt={itemData.salt}
                  Carbohydrates={itemData.carboHydratePer100gm}
                  Protein={itemData.proteinPer100gm}
                />
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </>
  );
};

export default OrderItem;

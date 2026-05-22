import React from "react";
import ChatBotButton from "../../General/Button/ChatBotButton";
import HeroSection from "../../FoodComponents/HeroSection";
import Ingredients from "../../IngredientSection/Ingredients";
import NutritionalComponent from "../../NutritionalCard/NutritionalComponent";
import Steps from "../../Preparation/Steps";

interface Cookbookprops {
  Item: {
    id: number;
    title: string;
    calories: number;
    steps: string[];
    description: string[];
    imgUrl: string[];
    weight: number;
    foodType: string;
    time: number;
    nutritionalValue: number;
    proteinPer100gm: number;
    caloriesPer100gm: number;
    fatsPer100gm: number;
    carboHydratePer100gm: number;
    mainurl: string;
    FoodIngredients?: {
      id?: number;
      title: string;
      quantity: string;
      imgUrl: string;
    }[];
  };
}

const CookBookItem = ({ Item }: Cookbookprops) => {
  const ingredients = Item.FoodIngredients || [];

  return (
    <>
      <ChatBotButton />

      <div className="min-h-screen bg-zinc-50/40 dark:bg-zinc-950 pb-20">

        <div className="w-full max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-zinc-100 dark:border-zinc-800/80 shadow-xl shadow-zinc-100/30 dark:shadow-none">
            <HeroSection
              title={Item.title}
              description={Item.description}
              calories={Item.calories}
              time={Item.time}
              weight={Item.weight}
              ImgUrl={Item.mainurl}
              Rating={Item.nutritionalValue}
            />
          </div>
        </div>


        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            

            <div className="lg:col-span-2 flex flex-col gap-8">

              <Ingredients IngredientList={ingredients} />
            </div>


            <div className="lg:col-span-1 lg:sticky lg:top-8">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xl shadow-zinc-100/30 dark:shadow-none transition-all duration-300">
                <NutritionalComponent
                  EnergyKcal={Item.caloriesPer100gm}
                  Fat={Item.fatsPer100gm}
                  Salt={0}
                  Carbohydrates={Item.carboHydratePer100gm}
                  Protein={Item.proteinPer100gm}
                />
              </div>
            </div>
            
          </div>


          <div className="mt-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-zinc-100/30 dark:shadow-none transition-all duration-300">
            <Steps
              images={Item.imgUrl}
              steps={Item.steps}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default CookBookItem;

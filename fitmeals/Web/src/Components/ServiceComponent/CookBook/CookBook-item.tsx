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
  };
}
const CookBookItem = ({ Item }: Cookbookprops) => {
  return (
    <>
      <ChatBotButton />
      <div className="pb-5 flex flex-col overflow-hidden justify-center items-center z-5">
        <div className="w-screen flex pt-10 flex-col lg:flex-row  lg:pl-10 ">
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
        <div className="h-max w-[98%] flex-col  pl-0 lg:items-start  lg:flex-row flex gap-5 md:gap-10 pt-5 lg:pl-15 lg:pr-10 md:pr-5 justify-center items-center ">
          <div className="h-max w-[90%] xl:w-[70%] lg:w-[50%] gap-5 flex flex-col">
            <Ingredients
              IngredientList={[
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
              ]}
            />
            <Ingredients
              IngredientList={[
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
                {
                  title: "Chicken",
                  weight: 300,
                  imgUrl:
                    "https://drin721riupcf.cloudfront.net/cookbook/chicken.webp",
                },
              ]}
            />
          </div>
          <div className="h-max p-5 w-[90%]  lg:mr-0 lg:ml-0 lg:w-[80%] max-w-max pr-10 rounded-2xl shadow-lg">
            <NutritionalComponent
              EnergyKcal={23}
              Fat={10}
              Salt={4}
              Carbohydrates={150}
              Protein={25}
            />
          </div>
        </div>
        <div className="w-[95%]">
          <div className="w-[98%] bg-[#fbf9f3] ml-auto mr-auto lg:w-[95%]   mt-7 rounded-2xl shadow-lg">
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

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
  };
  restaurantName: string;
}
const OrderItem = ({ itemData, restaurantName }: FoodDataProps) => {
  return (
    <>
      <ChatBotButton />
      <div className="pb-5  flex flex-col overflow-hidden justify-center items-center z-5">
        <NavbarData
          NavType={"order"}
          itemsdata={{
            id: itemData.id,
            restaurantId: itemData.restaurantId,
            title: itemData.title,
            restaurant: restaurantName,
          }}
        />
        <div className="w-screen flex pt-10 flex-col lg:flex-row  lg:pl-20 ">
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
        <div className="h-max w-[98%] flex-col  pl-0 lg:items-start  lg:flex-row flex gap-5  pt-5 xl:pl-10 xl:pr-10 justify-center items-center ">
          <div className="h-max w-[90%] xl:w-[60%] lg:w-[50%] gap-3 flex flex-col">
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
          <div className="h-max p-5 w-[90%] lg:mr-0 lg:ml-0 lg:w-[80%] lg:max-w-max pr-10 rounded-2xl shadow-lg">
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
    </>
  );
};

export default OrderItem;

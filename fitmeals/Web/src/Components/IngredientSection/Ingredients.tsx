"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

interface IngredientsItems {
  IngredientList: {
    title: string;
    weight: number;
    imgUrl: string;
  }[];
}

const Ingredients = ({ IngredientList }: IngredientsItems) => {
  const [servingsize, setServingsize] = React.useState("2");
  const t = useTranslations("Ingredients.Ingredients");
  return (
    <div className="h-max p-2 md:p-4 w-full  lg:w-full bg-[#fbf9f3] rounded-2xl shadow-lg ">
      <div className="h-full w-full flex flex-col">
        <div className="md:flex justify-center items-center">
          <h1 className="lg:text-3xl w-max text-lg ml-3 font-semibold font-montserrat">
            {t("title")}
          </h1>
          <div className="ml-3 lg:mt-2 md:ml-auto md:mr-3 flex gap-2 md:justify-center items-center">
            <h3>{t("Serving_size")}</h3>
            <div>
              <button
                onClick={() => setServingsize("2")}
                className={`h-10 w-10 border rounded-tl-xl rounded-bl-xl cursor-pointer border-black ${servingsize === "2" ? "bg-black text-white" : "bg-white text-black"}`}
              >
                2
              </button>
              <button
                onClick={() => setServingsize("4")}
                className={`h-10 w-10 border rounded-tr-xl rounded-br-xl cursor-pointer  border-black ${servingsize === "4" ? "bg-black text-white " : "bg-white text-black"}`}
              >
                4
              </button>
            </div>
          </div>
        </div>
        <div className="w-max grid grid-cols-2 lg:grid-cols-3 mt-10 md:ml-2 pl-3 md:pl-5 gap-15 place-items-center ">
          {IngredientList.map((item, index) => (
            <div className="flex items-center gap-2" key={index + 1}>
              <div className="rounded-full h-15 w-15 relative border border-black/10">
                <Image
                  alt="image"
                  className="rounded-full object-contain"
                  src={item.imgUrl}
                  fill
                  sizes="60px"
                  loading="lazy"
                  blurDataURL="/blur.jpeg"
                  placeholder="blur"
                />
              </div>
              <div className="flex flex-col text-[14px]">
                <h3>{item.weight}g</h3>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;

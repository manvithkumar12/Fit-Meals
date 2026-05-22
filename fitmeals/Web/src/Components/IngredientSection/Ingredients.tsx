"use client";
import Image from "next/image";
import React from "react";
import { useLocale, useTranslations } from "next-intl";

interface Ingredient {
  title: string;
  weight?: number;
  quantity?: string | number;
  imgUrl?: string | null;
}

interface IngredientsItems {
  IngredientList: Ingredient[];
}

const Ingredients = ({ IngredientList }: IngredientsItems) => {
  const locale = useLocale()
  const [servingsize, setServingsize] = React.useState("2");
  const t = useTranslations("Ingredients.Ingredients");
  const getScaledQuantity = (item: Ingredient, servingSize: string) => {
    const rawVal = item.quantity !== undefined ? item.quantity : item.weight;
    if (rawVal === undefined || rawVal === null) return "";

    const valStr = String(rawVal).trim();
    const match = valStr.match(/^([\d.,]+)\s*([a-zA-Z%]*)$/);

    if (match) {
      const numPart = parseFloat(match[1].replace(",", "."));
      const unitPart = match[2] || "g";
      if (!isNaN(numPart)) {
        const scaleFactor = Number(servingSize) / 2;
        const scaledVal = numPart * scaleFactor;
        const formattedVal = scaledVal % 1 === 0 ? scaledVal.toString() : scaledVal.toFixed(1);
        return `${formattedVal} ${unitPart}`;
      }
    }

    return valStr;
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-zinc-100/50 dark:shadow-none transition-all duration-300">
      <div className="w-full flex flex-col">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#00a73c] animate-pulse" />
            <h2 className="text-2xl font-bold font-montserrat text-zinc-800 dark:text-zinc-100">
              {t("title")}
            </h2>
          </div>


          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-1.5 rounded-2xl border border-zinc-100 dark:border-zinc-800/30">
            <span className="text-sm font-semibold font-montserrat text-zinc-500 dark:text-zinc-400 pl-2 pr-1 select-none">
              {t("Serving_size")}
            </span>
            <div className="relative flex items-center bg-zinc-200/50 dark:bg-zinc-800/80 rounded-xl p-0.5 w-[96px] h-8">

              <div
                className={`absolute top-0.5 bottom-0.5 left-0.5 w-[44px] bg-[#00a73c] rounded-lg shadow-sm transition-transform duration-300 ease-out ${servingsize === "4" ? "translate-x-[46px]" : "translate-x-0"
                  }`}
              />
              <button
                onClick={() => setServingsize("2")}
                className={`relative z-10 w-[44px] h-full text-xs font-bold font-montserrat transition-colors duration-200 rounded-lg ${servingsize === "2" ? "text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
              >
                2
              </button>
              <button
                onClick={() => setServingsize("4")}
                className={`relative z-10 w-[44px] h-full text-xs font-bold font-montserrat transition-colors duration-200 rounded-lg ${servingsize === "4" ? "text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
              >
                4
              </button>
            </div>
          </div>
        </div>


        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          {IngredientList && IngredientList.length > 0 ? (
            IngredientList.map((item, index) => (
              <div
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 border border-zinc-100/50 dark:border-zinc-800/20 hover:border-[#00a73c]/30 dark:hover:border-[#00a73c]/30 hover:shadow-md hover:shadow-[#00a73c]/5 transition-all duration-300 ease-out cursor-default"
                key={`${item.title}-${index}`}
              >

                {item.imgUrl ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md group-hover:scale-105 group-hover:border-[#00a73c] transition-all duration-300 ease-out">
                    <Image
                      alt={item.title}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      src={item.imgUrl}
                      fill
                      sizes="64px"
                      loading="lazy"
                      blurDataURL="/blur.jpeg"
                      placeholder="blur"
                    />
                  </div>
                ) : (
                  <div className="relative w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border-2 border-white dark:border-zinc-850 shadow-md group-hover:scale-105 group-hover:border-[#00a73c] flex items-center justify-center transition-all duration-300 ease-out">
                    <span className="text-zinc-400 dark:text-zinc-500 font-extrabold text-xl uppercase font-montserrat select-none">
                      {item.title ? item.title.charAt(0) : "•"}
                    </span>
                  </div>
                )}

                <span className="font-bold text-[#00a73c] dark:text-[#00c84b] text-sm mt-3 font-montserrat">
                  {getScaledQuantity(item, servingsize)}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-semibold font-montserrat group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors duration-200">
                  {item.title}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-sm text-zinc-400">
              {locale === "en" ? "No ingredients specified." : "Keine Zutaten angegeben."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;

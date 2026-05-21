"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { MealformContext } from "@/src/context/AddMealForm";
import { PlainPopUp } from "../../PopUp/Popup";

const NutritionCard = () => {
  const context = useContext(MealformContext)!;
  const foodname = context.foodname;
  const aiLoading = context.aiLoading;
  const [popup, setPopUp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fetchedData = context.fetchedData;
  const setfetched = context.setFetchedData;
  const reqData = context.reqdata;
  const setReqData = context.setReqData;
  const handleGetData = context.handleGetData;
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    const numericValue = value === "" ? "" : Number(value);

    setReqData((prev: any) => {
      if (name === "proteinPer100gm") return { ...prev, protein: numericValue };
      if (name === "salt") return { ...prev, salt: numericValue };
      if (name === "carboHydratePer100gm")
        return { ...prev, carbohydrate: numericValue };
      if (name === "caloriesPer100gm") return { ...prev, energy: numericValue };
      if (name === "fatsPer100gm") return { ...prev, fat: numericValue };
      return prev;
    });
  };
  const t = useTranslations("Form_Meals");
  return (
    <div className="h-max w-full mt-2 bg-white p-2  border border-gray-200  rounded-lg flex flex-col">
      <div className="border-b border-black/20 font-semibold pb-1">
        {t("Nutritions.title")}
      </div>
      <h2 className="text-sm opacity-45 ml-0.5 mt-1">
        {t("Nutritions.subtitle")}
      </h2>
      <section>
        <h3 className="mt-3 font-semibold">Per 100g</h3>
        <div className="flex gap-2.5 mt-1">
          <div className="flex flex-col w-[20%]">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="text-sm font-semibold ml-1">
                {t("Nutritions.Protein")}
              </h2>
              <span className="font-lg text-red-500">*</span>
            </div>

            <div
              className={`${aiLoading ? "p-0.5 rounded-md bg-[linear-gradient(90deg,red,yellow,green,blue)] bg-size-[300%_300%] animate-[borderMove_2s_linear_infinite]" : ""}`}
            >
              <input
                className="border rounded-md border-black p-2 outline-none text-center text-sm bg-white w-full"
                type="number"
                name="proteinPer100gm"
                value={reqData.protein ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="g"
              />
            </div>
          </div>
          <div className="flex flex-col w-[30%]">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="text-sm font-semibold ml-1">
                {t("Nutritions.Carbohydrates")}
              </h2>
              <span className="font-lg text-red-500">*</span>
            </div>

            <div
              className={`${aiLoading ? "p-0.5 rounded-md bg-[linear-gradient(90deg,red,yellow,green,blue)] bg-size-[300%_300%] animate-[borderMove_2s_linear_infinite]" : ""}`}
            >
              <input
                className="border rounded-md border-black p-2 text-center text-sm bg-white w-full"
                placeholder="g"
                value={reqData.carbohydrate ?? ""}
                type="number"
                onChange={handleChange}
                name="carboHydratePer100gm"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col w-[20%]">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="text-sm font-semibold ml-1">Salts</h2>
              <span className="font-lg text-red-500">*</span>
            </div>

            <div
              className={`${aiLoading ? "p-0.5 rounded-md bg-[linear-gradient(90deg,red,yellow,green,blue)] bg-size-[300%_300%] animate-[borderMove_2s_linear_infinite]" : ""}`}
            >
              <input
                className="border rounded-md border-black p-2 text-center text-sm bg-white w-full"
                placeholder="g"
                value={reqData.salt ?? ""}
                type="number"
                onChange={handleChange}
                name="salt"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col w-[20%]">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="text-sm font-semibold ml-1">
                {t("Nutritions.Calories")}
              </h2>
              <span className="font-lg text-red-500">*</span>
            </div>

            <div
              className={`${aiLoading ? "p-0.5 rounded-md bg-[linear-gradient(90deg,red,yellow,green,blue)] bg-size-[300%_300%] animate-[borderMove_2s_linear_infinite]" : ""}`}
            >
              <input
                className="border rounded-md border-black p-2 text-center text-sm bg-white w-full"
                type="number"
                name="caloriesPer100gm"
                value={reqData.energy ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="kcal"
              />
            </div>
          </div>
          <div className="flex flex-col w-[20%]">
            <div className="flex gap-1 items-center justify-center">
              <h2 className="text-sm font-semibold ml-1">
                {t("Nutritions.Fats")}
              </h2>
              <span className="font-lg text-red-500">*</span>
            </div>

            <div
              className={`${aiLoading ? "p-0.5 rounded-md bg-[linear-gradient(90deg,red,yellow,green,blue)] bg-size-[300%_300%] animate-[borderMove_2s_linear_infinite]" : ""}`}
            >
              <input
                className="border rounded-md border-black p-2 text-center text-sm bg-white w-full"
                type="number"
                value={reqData.fat ?? ""}
                onChange={handleChange}
                name="fatsPer100gm"
                readOnly={!isEditing}
                placeholder="g"
              />
            </div>
          </div>
        </div>
      </section>

      <button
        disabled={aiLoading}
        onClick={() => {
          handleGetData();
          setPopUp(true);
        }}
        className={`bg-green-700 mt-3  text-white font-semibold w-max ml-auto rounded-lg p-2 ${aiLoading ? "opacity-30 cursor-not-allowed" : ""} `}
      >
        <i className="fa-solid fa-splotch mr-2"></i>
        {t("Nutritions.Add_with_AI")}
      </button>
      <button
        onClick={() => setIsEditing(true)}
        className="w-31 p-2 bg-yellow-400 flex gap-1 justify-center items-center font-semibold text-black rounded-md ml-auto mt-2"
      >
        {t("Nutritions.edit")}
        <i className="fa-solid fa-pencil"></i>
      </button>
      {popup && foodname && fetchedData.length > 1 && (
        <PlainPopUp setPopUp={setPopUp}>
          <div className="w-[95vw] md:w-full max-w-225 bg-white rounded-2xl overflow-hidden flex flex-col max-h-[85vh] ">
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                  Select Nutrition Data
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1.5 font-medium">
                  Multiple matches found for{" "}
                  <span className="font-bold text-green-700">
                    &quot;{foodname}&quot;
                  </span>
                  . Please select the most accurate one.
                </p>
              </div>
            </div>

            {/* Grid Content */}
            <div className="p-4 md:p-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {fetchedData.map((item, index) => (
                  <div
                    key={index + 1}
                    className="bg-white border border-gray-200 hover:border-green-400 hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-3xl p-5 flex flex-col relative group"
                  >
                    <h3 className="font-bold text-gray-900 text-[15px] md:text-base line-clamp-2 mb-4 leading-snug">
                      {item.foodname}
                    </h3>

                    <div className="grid grid-cols-2 gap-2.5 md:gap-3 mb-5 grow">
                      <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-2.5 text-center transition-colors group-hover:bg-orange-50">
                        <p className="text-[10px] md:text-xs text-orange-600 font-bold uppercase tracking-widest">
                          Protein
                        </p>
                        <p className="text-sm md:text-base font-extrabold text-gray-800 mt-1">
                          {item.protein}g
                        </p>
                      </div>
                      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5 text-center transition-colors group-hover:bg-blue-50">
                        <p className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-widest">
                          Carbs
                        </p>
                        <p className="text-sm md:text-base font-extrabold text-gray-800 mt-1">
                          {item.carbohydrate}g
                        </p>
                      </div>
                      <div className="bg-red-50/70 border border-red-100 rounded-xl p-2.5 text-center transition-colors group-hover:bg-red-50">
                        <p className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-widest">
                          Fats
                        </p>
                        <p className="text-sm md:text-base font-extrabold text-gray-800 mt-1">
                          {item.fat}g
                        </p>
                      </div>
                      <div className="bg-green-50/70 border border-green-100 rounded-xl p-2.5 text-center transition-colors group-hover:bg-green-50">
                        <p className="text-[10px] md:text-xs text-green-600 font-bold uppercase tracking-widest">
                          Calories
                        </p>
                        <p className="text-sm md:text-base font-extrabold text-gray-800 mt-1">
                          {item.energy}kcal
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <p className="text-[11px] md:text-xs text-gray-400 font-semibold">
                        Salt:{" "}
                        <span className="text-gray-600">{item.salt}g</span>
                      </p>
                      <button
                        onClick={() => {
                          setReqData(item);
                          setPopUp(false);
                          setfetched([]);
                        }}
                        className="bg-green-50 text-green-700 hover:bg-green-600 hover:text-white px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 active:scale-95 shadow-sm"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PlainPopUp>
      )}
    </div>
  );
};

export default NutritionCard;

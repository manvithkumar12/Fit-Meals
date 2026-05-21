"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { MealformContext } from "@/src/context/AddMealForm";
import { FoodCategory } from "@/src/types/enums/FoodCategory.types";
import { FoodBenefits } from "@/src/types/enums/foodBenefits.types";

const MealInfo = () => {
  const { setFile, setInputdata } = useContext(MealformContext)!;
  const t = useTranslations("Form_Meals");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ingredientRows, setIngredientRows] = useState<number[]>([0]);
  const context = useContext(MealformContext);
  const setFoodName = context?.setFoodName;

  const imageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
    if (file) {
      setFile?.(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (!setInputdata) return;
    const { value, dataset } = e.target;
    const name = e.target.name;

    if (name === "description" || name === "foodBenefits") {
      const index = Number(dataset.index);

      setInputdata((prev) => {
        const updatedArray = [...(prev?.[name] || [])];

        // avoid saving empty values from select
        if (value !== "") {
          updatedArray[index] = value;
        }

        return {
          ...prev,
          [name]: updatedArray.filter((item) => item && item !== ""),
        };
      });
      return;
    }

    if (name === "ingredients.title" || name === "ingredients.quantity") {
      const index = Number(dataset.index);
      const field = name.split(".")[1];

      setInputdata((prev) => {
        const ingredients: any = { ...prev?.ingredients };

        const arr = Array.isArray(ingredients[field])
          ? [...ingredients[field]]
          : [];
        arr[index] = value;

        ingredients[field] = arr;

        return {
          ...prev,
          ingredients,
        };
      });
      return;
    }

    setInputdata((prev) =>
      prev ? { ...prev, [name]: value } : ({ [name]: value } as any),
    );
  };

  return (
    <>
      <div className="w-full h-40 mt-2 flex gap-1">
        <div className="w-40 h-40 md:w-60 rounded-lg flex justify-center items-center relative">
          <div className="h-40 w-40 md:w-60  top-0 bg-green-200 flex justify-center items-center  border border-gray-200 rounded-lg">
            <input
              type="file"
              id="partner-file"
              className="hidden"
              onChange={imageOnchange}
            />
            {selectedFile && (
              <></> //Add url preview
            )}
            <label
              htmlFor="partner-file"
              className="w-[80%] bg-green-500 text-white font-semibold text-md py-2 rounded-md cursor-pointer text-center"
            >
              Upload File
            </label>
          </div>
        </div>
        <div className="w-[61%] md:w-full pb-2 flex flex-col justify-center pl-1 rounded-lg items-center text-center bg-[white]  border border-gray-200 text-[13px] relative">
          <div className="flex flex-col gap-1 text-left md:w-[80%]">
            <h1 className="font-semibold">
              {t("MealDetails.Title")}{" "}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <input
              type="text"
              name="title"
              onChange={(e) => {
                handleChange(e);
                setFoodName?.(e.target.value);
              }}
              className="h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              placeholder={t("MealDetails.placeholder_title")}
            />
          </div>
          <div className="flex flex-col gap-1 mt-2 text-left md:w-[80%]">
            <h1 className="font-semibold">
              {t("MealDetails.Price")}{" "}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <input
              type="text"
              onChange={handleChange}
              name="price"
              className="h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              placeholder={t("MealDetails.placeholder_price")}
            />
          </div>
        </div>
      </div>
      <div className="w-full  flex flex-col  p-2 gap-2 mt-2 pt-3 rounded-lg  border border-gray-200 bg-[white]">
        <div className="flex  gap-2 md:justify-center">
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold">
              {t("form_section.Type")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <select
              className="border rounded-md border-black p-2 text-center text-sm"
              name="type"
              onChange={handleChange}
            >
              <option value="">{t("form_section.placeholder_type")}</option>
              <option value="VEGETARIAN">{t("form_section.Vegetarian")}</option>
              <option value="NON_VEGETARIAN">
                {t("form_section.Non-Vegetarian")}
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold">
              {t("form_section.Weight")} (in g)
              <span className="font-lg text-red-500">*</span>
            </h1>
            <input
              type="text"
              onChange={handleChange}
              name="weight"
              className="h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              placeholder={t("form_section.placeholder_weight")}
            />
          </div>
        </div>
        <div className="flex gap-2 md:justify-center">
          <div className="flex flex-col w-[47%]">
            <div className="flex flex-col gap-1 mt-2 text-left">
              <h1 className="font-semibold">
                {t("form_section.Cooking_Time")}
                <span className="font-lg text-red-500">*</span>
              </h1>
              <select
                className="border rounded-md border-black p-2 text-center text-sm"
                name="time"
                onChange={handleChange}
              >
                <option value="" className="pr-4">
                  {t("form_section.placeholder_cooking_time")}
                </option>
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="20">20 min</option>
                <option value="25">25 min</option>
                <option value="30">30 min</option>
                <option value="35">35 min</option>
                <option value="40">40 min</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 mt-2 text-left">
              <h1 className="font-semibold">
                {t("form_section.Category")}
                <span className="font-lg text-red-500">*</span>
              </h1>
              <select
                className="border rounded-md border-black p-2 text-center text-sm"
                name="category"
                onChange={handleChange}
              >
                <option value="">Select</option>
                {FoodCategory.map((item, index) => (
                  <option value={item} key={index + 1}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2 text-left w-[47%]">
            <h1 className="font-semibold text-md">
              {t("form_section.Food Benefits (max 2)")}
              <span className="font-lg text-red-500"></span>
            </h1>
            {Array.from({ length: 2 }).map((_, index) => (
              <select
                name="foodBenefits"
                key={index + 1}
                onChange={handleChange}
                data-index={index}
                id=""
                className="h-11 w-full border rounded-lg outline-0 p-2 text-sm border-black"
              >
                <option value="">Select</option>
                {FoodBenefits.map((item, index) => (
                  <option value={item} key={index + 1}>
                    {item}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
        <div className="flex w-full gap-2 mt-2 max-h-70 md:justify-center">
          <div className="flex flex-col gap-2 w-[47%] ">
            <h1 className="font-semibold">
              {t("form_section.Description (max 4)")}
              about food
              <span className="font-lg text-red-500">*</span>
            </h1>
            {Array.from({ length: 3 }).map((_, index) => (
              <textarea
                key={index + 1}
                name="description"
                data-index={index}
                onChange={handleChange}
                className="min-h-10 w-full border rounded-lg outline-0 p-2 text-sm border-black"
                placeholder={t("form_section.placeholder_description")}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2  w-[47%]">
            <h1 className="font-semibold">
              {t("form_section.Ingredients")}
              <span className="font-lg text-red-500">*</span>
            </h1>
            <div className="flex flex-col overflow-scroll w-full h-40 gap-2 pt-2">
              {ingredientRows.map((_, index) => (
                <div key={index + 1} className="flex gap-2">
                  <textarea
                    name="ingredients.title"
                    data-index={index}
                    onChange={handleChange}
                    className="min-h-10 w-[48%] border rounded-lg outline-0 p-2 text-sm border-black"
                    placeholder={t("form_section.placeholder_ingredients")}
                  />
                  <textarea
                    name="ingredients.quantity"
                    data-index={index}
                    onChange={handleChange}
                    className="min-h-10 w-[48%] border rounded-lg outline-0 p-2 text-sm border-black"
                    placeholder="Quantity"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setIngredientRows((prev) => [...prev, prev.length])
              }
              className="bg-green-600 text-white text-sm px-3 py-1 rounded-md mt-2 w-max ml-auto"
            >
              + {t("form_section.add_ingredient")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealInfo;

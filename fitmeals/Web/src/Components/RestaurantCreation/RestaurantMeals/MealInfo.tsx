"use client";
import React, { useContext, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MealformContext } from "@/src/context/AddMealForm";
import { FoodCategory } from "@/src/types/enums/FoodCategory.types";
import { FoodBenefits } from "@/src/types/enums/foodBenefits.types";
import Image from "next/image";

const MealInfo = () => {
  const { setFile, setInputdata } = useContext(MealformContext)!;
  const t = useTranslations("Form_Meals");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ingredientRows, setIngredientRows] = useState<number[]>([0]);
  const context = useContext(MealformContext);
  const setFoodName = context?.setFoodName;

  const imageOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
    if (file) {
      setFile?.(file);
      const url = URL.createObjectURL(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(url);
    } else {
      setFile?.(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFile?.(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const removeIngredientRow = (indexToRemove: number) => {
    if (ingredientRows.length === 1) return;

    setIngredientRows((prev) => prev.slice(0, -1));

    if (setInputdata) {
      setInputdata((prev: any) => {
        if (!prev?.ingredients) return prev;
        const ingredients = { ...prev.ingredients };

        const titleArr = Array.isArray(ingredients.title) ? [...ingredients.title] : [];
        const quantityArr = Array.isArray(ingredients.quantity) ? [...ingredients.quantity] : [];

        titleArr.splice(indexToRemove, 1);
        quantityArr.splice(indexToRemove, 1);

        ingredients.title = titleArr;
        ingredients.quantity = quantityArr;

        return {
          ...prev,
          ingredients
        };
      });
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
    <div className="w-full">
      {/* File Upload and General Info Cards */}
      <div className="w-full flex flex-col md:flex-row gap-6 mt-4">
        {/* Modern Image Dropzone / Preview */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
            {t("MealDetails.Image")}
            <span className="text-red-500">*</span>
          </label>
          <div className="w-full h-56 md:w-64 md:h-64 border-2 border-dashed border-gray-200 hover:border-green-500 rounded-2xl bg-gray-50/50 hover:bg-green-50/10 cursor-pointer flex flex-col justify-center items-center gap-2 relative group overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
            <input
              type="file"
              id="partner-file"
              className="hidden"
              onChange={imageOnchange}
              accept="image/*"
            />
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Meal Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <label htmlFor="partner-file" className="cursor-pointer flex flex-col items-center gap-2">
                    <i className="fa-solid fa-camera text-2xl animate-pulse"></i>
                    <span className="text-xs font-bold uppercase tracking-wider">{t("MealDetails.change_image")}</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 absolute top-3 right-3 shadow-lg z-10 transition-all hover:scale-110 active:scale-95"
                  title={t("MealDetails.remove_image")}
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </>
            ) : (
              <label
                htmlFor="partner-file"
                className="w-full h-full flex flex-col justify-center items-center cursor-pointer p-4 text-center"
              >
                <i className="fa-solid fa-cloud-arrow-up text-4xl text-green-500 group-hover:-translate-y-1 transition-transform duration-300 mb-3 animate-bounce-slow"></i>
                <span className="text-sm font-bold text-gray-700 block mb-1">
                  {t("MealDetails.placeholder_image")}
                </span>
                <span className="text-[11px] text-gray-400 font-medium leading-relaxed">
                  {t("MealDetails.upload_subtext")}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Title and Price */}
        <div className="flex-1 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col justify-center gap-5 relative">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("MealDetails.Title")}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={context?.inputData?.title ?? ""}
              onChange={(e) => {
                handleChange(e);
                setFoodName?.(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400 font-medium"
              placeholder={t("MealDetails.placeholder_title")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("MealDetails.Price")}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">€</span>
              <input
                type="text"
                name="price"
                value={context?.inputData?.price || ""}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400 font-medium"
                placeholder={t("MealDetails.placeholder_price")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Details Card */}
      <div className="w-full flex flex-col p-6 md:p-8 gap-6 mt-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Type & Weight row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Type")}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white appearance-none cursor-pointer font-medium pr-10"
                name="type"
                value={context?.inputData?.type ?? ""}
                onChange={handleChange}
              >
                <option value="">{t("form_section.placeholder_type")}</option>
                <option value="VEGETARIAN">{t("form_section.Vegetarian")}</option>
                <option value="NON_VEGETARIAN">
                  {t("form_section.Non-Vegetarian")}
                </option>
              </select>
              <i className="fa-solid fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Weight")} (in g)
              <span className="text-red-500">*</span>
            </label>
     <input
              type="number"
              onChange={handleChange}
              name="weight"
              value={context?.inputData?.weight || ""}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400 font-medium"
              placeholder={t("form_section.placeholder_weight")}
            />
          </div>
        </div>

        {/* Cooking Time, Category & Food Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cooking Time */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Cooking_Time")}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white appearance-none cursor-pointer font-medium pr-10"
                name="time"
                value={context?.inputData?.time || ""}
                onChange={handleChange}
              >
                <option value="">
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
              <i className="fa-solid fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Category")}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white appearance-none cursor-pointer font-medium pr-10"
                name="category"
                value={context?.inputData?.category ?? ""}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {FoodCategory.map((item, index) => (
                  <option value={item} key={index + 1}>
                    {item}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
            </div>
          </div>

          {/* Food Benefits (max 2) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Food Benefits (max 2)")}
            </label>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="relative" key={index + 1}>
                  <select
                    name="foodBenefits"
                    onChange={handleChange}
                    data-index={index}
                    value={context?.inputData?.foodBenefits?.[index] ?? ""}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white appearance-none cursor-pointer font-medium pr-10"
                  >
                    <option value="">Select</option>
                    {FoodBenefits.map((item, index) => (
                      <option value={item} key={index + 1}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs"></i>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Ingredients Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              {t("form_section.Description (max 4)")} about food
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 3 }).map((_, index) => (
                <textarea
                  key={index + 1}
                  name="description"
                  data-index={index}
                  value={context?.inputData?.description?.[index] ?? ""}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-gray-50/50 focus:bg-white placeholder-gray-400 font-medium resize-none min-h-[3rem]"
                  placeholder={t("form_section.placeholder_description")}
                />
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                {t("form_section.Ingredients")}
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setIngredientRows((prev) => [...prev, prev.length])
                }
                className="bg-green-55 text-green-700 hover:bg-green-600 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border border-green-150 hover:border-green-600 shadow-sm active:scale-95"
              >
                <i className="fa-solid fa-plus text-[10px]"></i>
                {t("form_section.add_ingredient")}
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {ingredientRows.map((_, index) => (
                <div key={index + 1} className="flex gap-2 items-center bg-gray-50/30 p-2 rounded-xl border border-gray-100/50">
                  <input
                    name="ingredients.title"
                    data-index={index}
                    value={context?.inputData?.ingredients?.title?.[index] ?? ""}
                    onChange={handleChange}
                    className="w-[48%] px-3 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-white placeholder-gray-400 font-medium"
                    placeholder={t("form_section.placeholder_ingredients")}
                  />
                  <input
                    name="ingredients.quantity"
                    data-index={index}
                    value={context?.inputData?.ingredients?.quantity?.[index] ?? ""}
                    onChange={handleChange}
                    className="w-[40%] px-3 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none text-sm transition-all bg-white placeholder-gray-400 font-medium"
                    placeholder={t("form_section.quantity")}
                  />
                  {ingredientRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientRow(index)}
                      className="w-[10%] flex justify-center items-center h-9 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Remove Ingredient"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealInfo;


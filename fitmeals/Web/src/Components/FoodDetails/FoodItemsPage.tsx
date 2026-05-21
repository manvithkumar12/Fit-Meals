"use client";

import { FoodItem } from "@/src/Apiservices/api/restaurant/getFoodItems";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PlainPopUp } from "../PopUp/Popup";
import Link from "@/src/Components/LocalizedLink";
import { useRestaurantFoodItems } from "@/src/query/useRestaurantFoodItems";
import ProductCardLoading from "../ProductCard/ProductCardLoading";

import { useTranslations } from "next-intl";
import { useUpdateFoodItem } from "@/src/mutations/restaurant/EditFood";
import { useDeleteFoodItem } from "@/src/mutations/restaurant/DeleteFood";

interface IDProps {
  restaurantID: number;
}
const FoodItemsPage = ({ restaurantID }: IDProps) => {
  const t = useTranslations("food_item");
  const [searchTerm,] = useState("");
  const [selectedCategory,] = useState("All");
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const { data: response, isLoading } = useRestaurantFoodItems(restaurantID);
  const data = useMemo(() => response?.message ?? [], [response?.message]);
  const categories = useMemo(() => {
    const cats = data.map((item) => item.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  const { mutate: updateFoodItem, isPending: isUpdating } = useUpdateFoodItem(
    restaurantID,
    setEditingItem,
  );
  const { mutate: deleteFoodItem, isPending: isDeleting } =
    useDeleteFoodItem(restaurantID);
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    const formData = new FormData(e.currentTarget);
    updateFoodItem({
      data: {
        id: editingItem.id,
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        prepTime: Number(formData.get("prepTime")),
        Protein: Number(formData.get("Protein")),
        Carbs: Number(formData.get("Carbs")),
        Fats: Number(formData.get("Fats")),
        Calories: Number(formData.get("Calories")),
      },
    });
  };
  return (
    <div className="w-full max-w-350 mx-auto px-4 md:px-8 py-8 font-manrope">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            {t("subtitle")}
          </p>
        </div>
        <Link href="/form/restaurant/addmeal">
          <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-500/20 transition-all duration-300 active:scale-95 flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> {t("addFoodItemBtn")}
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardLoading key={index} />
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-gray-200 border-dashed shadow-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-utensils text-3xl text-green-500"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {t("noItemsTitle")}
          </h3>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
            {data.length === 0 ? t("noItemsDescEmpty") : t("noItemsDescSearch")}
          </p>
          {data.length === 0 && (
            <Link href="/form/restaurant/addmeal">
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95 flex items-center gap-2 text-sm shadow-sm">
                <i className="fa-solid fa-plus"></i> {t("addFoodItemBtn")}
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-4xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col relative"
            >
              <div className="relative w-full h-50 bg-gray-50 overflow-hidden">
                <Image
                  src={
                    item.imgUrl ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  }
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-green-700 shadow-sm flex items-center gap-1.5 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {t("availableBadge")}
                </div>

                {item.type && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-sm border border-white/20">
                    <div
                      className={`w-3.5 h-3.5 rounded-sm border-[1.5px] ${item.type.toLowerCase() === "veg" ? "border-green-600" : "border-red-600"} flex items-center justify-center p-[1.5px]`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${item.type.toLowerCase() === "veg" ? "bg-green-600" : "bg-red-600"}`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col grow bg-white">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-gray-900 text-[1.15rem] leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mt-1.5">
                      {item.category}
                    </p>
                  </div>
                  <span className="font-extrabold text-gray-900 text-lg bg-green-50 px-2.5 py-1 rounded-lg">
                    €{item.price}
                  </span>
                </div>

                <p className="text-gray-500 text-[13px] mt-2 line-clamp-2 leading-relaxed grow font-medium">
                  {item.description?.[0] || t("defaultDesc")}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-gray-400 flex items-center gap-4">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <i className="fa-regular fa-clock"></i>{" "}
                      {item.time || "20"} min
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                      {item.averageRating || "0.0"}
                    </span>
                  </div>
                  <div className="flex gap-2 relative z-10">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 flex items-center justify-center transition-all duration-200"
                    >
                      <i className="fa-solid fa-pen text-[11px]"></i>
                    </button>
                    <button
                      onClick={() => deleteFoodItem(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200"
                    >
                      <i className="fa-solid fa-trash text-[11px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingItem && (
        <PlainPopUp setPopUp={() => setEditingItem(null)}>
          <form
            onSubmit={onFormSubmit}
            className="w-[95vw] md:w-125 bg-white rounded-2xl p-6 flex flex-col gap-5 text-left relative font-manrope"
          >
            <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  {t("editTitle")}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {t("editSubtitle", { title: editingItem.title })}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[65vh] px-1 pb-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  {t("itemNameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  defaultValue={editingItem.title}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    {t("priceLabel")}
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    defaultValue={editingItem.price}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    {t("prepTimeLabel")}
                  </label>
                  <input
                    type="number"
                    name="prepTime"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    defaultValue={editingItem.time}
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 mt-1">
                <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-leaf"></i> {t("macrosTitle")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      {t("proteinLabel")}
                    </label>
                    <input
                      type="number"
                      name="Protein"
                      step="0.01"
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none shadow-sm"
                      defaultValue={editingItem.proteinPer100gm}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      {t("carbsLabel")}
                    </label>
                    <input
                      type="number"
                      name="Carbs"
                      step="0.01"
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none shadow-sm"
                      defaultValue={editingItem.carboHydratePer100gm}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      {t("fatsLabel")}
                    </label>
                    <input
                      type="number"
                      name="Fats"
                      step="0.01"
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none shadow-sm"
                      defaultValue={editingItem.fatsPer100gm}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                      {t("caloriesLabel")}
                    </label>
                    <input
                      type="number"
                      name="Calories"
                      step="0.01"
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none shadow-sm"
                      defaultValue={editingItem.caloriesPer100gm}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-5 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors text-sm"
              >
                {t("cancelBtn")}
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-extrabold rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-95 text-sm flex items-center gap-2 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isUpdating ? (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                ) : (
                  <i className="fa-solid fa-check"></i>
                )}
                {isUpdating ? t("savingBtn") : t("saveChangesBtn")}
              </button>
            </div>
          </form>
        </PlainPopUp>
      )}
    </div>
  );
};

export default FoodItemsPage;

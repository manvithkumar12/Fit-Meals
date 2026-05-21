"use client";

import React, { useContext } from "react";
import PopUpButton from "../../General/Button/PopUpButton";
import { MealformContext } from "@/src/context/AddMealForm";

const ConfirmSection = () => {
  const context = useContext(MealformContext);
  const loading = context?.loading;
  const handleSubmit = context?.handleSubmit;
  const agree = context?.agreed ?? false;
  const inputData = context?.inputData;
  const reqdata = context?.reqdata;

  return (
    <div className="w-full mt-2">
      <PopUpButton btnTxt="Add Meal" btnDisable={!agree}>
        <div className="w-[95vw] md:w-162.5 bg-white p-2 md:p-6 rounded-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto text-left font-manrope">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              Confirm Meal Details
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1.5">
              Please review all the details before adding the meal to your menu.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            {/* General Info */}
            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-utensils"></i> General Information
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Meal Name
                  </span>{" "}
                  <span className="font-extrabold text-gray-900 text-base md:text-lg line-clamp-1">
                    {inputData?.title || "Not specified"}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Price
                  </span>{" "}
                  <span className="font-extrabold text-gray-900 text-base md:text-lg">
                    ₹{inputData?.price || 0}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Type
                  </span>{" "}
                  <span className="font-bold text-gray-700">
                    {inputData?.type || "Not specified"}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Category
                  </span>{" "}
                  <span className="font-bold text-gray-700">
                    {inputData?.category || "Not specified"}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Weight
                  </span>{" "}
                  <span className="font-bold text-gray-700">
                    {inputData?.weight || 0}g
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                    Prep Time
                  </span>{" "}
                  <span className="font-bold text-gray-700">
                    {inputData?.time || 0} min
                  </span>
                </p>
              </div>
            </div>

            {/* Nutrition */}
            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-leaf"></i> Nutrition (per 100g)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Protein
                  </span>{" "}
                  <span className="font-extrabold text-gray-900">
                    {reqdata?.protein || 0}g
                  </span>
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Carbs
                  </span>{" "}
                  <span className="font-extrabold text-gray-900">
                    {reqdata?.carbohydrate || 0}g
                  </span>
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Fats
                  </span>{" "}
                  <span className="font-extrabold text-gray-900">
                    {reqdata?.fat || 0}g
                  </span>
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Calories
                  </span>{" "}
                  <span className="font-extrabold text-gray-900">
                    {reqdata?.energy || 0}kcal
                  </span>
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                    Salt
                  </span>{" "}
                  <span className="font-extrabold text-gray-900">
                    {reqdata?.salt || 0}g
                  </span>
                </div>
              </div>
            </div>

            {/* File */}
            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <span className="font-bold text-gray-700 flex items-center gap-2">
                <i className="fa-regular fa-image"></i> Image
              </span>
              <span className="text-gray-600 text-xs font-semibold bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm truncate max-w-full">
                {context?.file ? context.file.name : "No image selected"}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-gray-100">
            <button
              disabled={loading}
              onClick={() => handleSubmit?.()}
              className={`px-8 py-3.5 bg-green-600 hover:bg-green-500 font-extrabold text-white rounded-xl shadow-[0_8px_20px_rgb(34,197,94,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading && <i className="fa-solid fa-spinner animate-spin"></i>}
              {loading ? "Saving to Menu..." : "Confirm & Add Meal"}
            </button>
          </div>
        </div>
      </PopUpButton>
    </div>
  );
};

export default ConfirmSection;

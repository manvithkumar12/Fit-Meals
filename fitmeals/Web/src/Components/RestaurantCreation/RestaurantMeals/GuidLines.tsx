// const t = useTranslations("Form_DeliveryPartner");
"use client";
import React, { useContext, useState } from "react";
import { useTranslations } from "next-intl";
import { MealformContext } from "@/src/context/AddMealForm";
import { RiderContext } from "@/src/context/RiderContext";

interface Type {
  Pagetype: "Restaurant" | "DeliveryPartner";
}
const GuidLines = ({ Pagetype }: Type) => {
  const t1 = useTranslations("Form_DeliveryPartner");
  const t2 = useTranslations("Form_Meals");
  const context = useContext(MealformContext);
  const riderContext = useContext(RiderContext);
  const loading = context?.loading || riderContext?.loading;
  const isAgreed = context?.setAgreed;
  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);

  return (
    <div className="h-max w-full mt-2 bg-white p-2  border border-gray-200  rounded-lg flex flex-col">
      <div className="flex gap-2">
        {Pagetype === "Restaurant" && (
          <div className="w-full flex flex-col">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={r1}
                onChange={(e) => {
                  const next = e.target.checked;
                  setR1(next);
                  isAgreed?.(next && r2);
                }}
              />
              <h2 className="text-sm md:text-md">
                {t2("Guidelines_section.guideline_1")}
              </h2>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={r2}
                onChange={(e) => {
                  const next = e.target.checked;
                  setR2(next);
                  isAgreed?.(r1 && next);
                }}
              />
              <h2 className="text-sm md:text-md">
                {t2("Guidelines_section.guideline_2")}
              </h2>
            </div>
          </div>
        )}
        {Pagetype === "DeliveryPartner" && (
          <div className="w-full flex flex-col">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={r1}
                onChange={(e) => setR1(e.target.checked)}
              />
              <h2 className="text-sm md:text-md">
                {t1("Regulations_section.regulation_1")}
              </h2>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={r2}
                onChange={(e) => setR2(e.target.checked)}
              />
              <h2 className="text-sm md:text-md">
                {t1("Regulations_section.regulation_2")}
              </h2>
            </div>
          </div>
        )}
      </div>
      {Pagetype === "DeliveryPartner" && (
        <button
          onClick={riderContext?.HandleSubmit}
          disabled={!r1 || !r2 || loading}
          className={`w-[80%] m-auto p-2 font-semibold rounded-md mt-3 shadow-lg transition-colors text-white ${
            r1 && r2 && !loading
              ? "bg-green-700 hover:bg-green-600 active:shadow"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {t1("form.submit")}
        </button>
      )}
    </div>
  );
};

export default GuidLines;

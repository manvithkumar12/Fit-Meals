"use client";
import React from "react";
import { useTranslations } from "next-intl";

interface Data {
  EnergyKcal: number;
  Fat: number;
  Salt: number;
  Carbohydrates: number;
  Protein: number;
}
const formatVal = (v: number | string | undefined | null) => {
  const num = Number(v);
  if (v === undefined || v === null || isNaN(num)) return "0";
  return Number(num.toFixed(2));
};

const NutritionalComponent = ({
  EnergyKcal,
  Fat,
  Carbohydrates,
  Protein,
  Salt,
}: Data) => {
  const perServing = [];
  const [size, setSize] = React.useState("grams");
  const t = useTranslations("Ingredients");
  const portionSize = 250;
  const grams = {
    EnergyKcal: EnergyKcal,
    EnergyKJ: EnergyKcal * 4.184,
    Fat: Fat,
    Carbohydrates: Carbohydrates,
    Protein: Protein,
    Salt: Salt,
  };
  const portion = {
    EnergyKJ: (EnergyKcal * 4.184 * portionSize) / 100,
    EnergyKcal: (EnergyKcal * portionSize) / 100,
    Fat: (Fat * portionSize) / 100,
    Carbohydrates: (Carbohydrates * portionSize) / 100,
    Protein: (Protein * portionSize) / 100,
    Salt: (Salt * portionSize) / 100,
  };
  const values = size === "portion" ? portion : grams;
  return (
    <div className="p-5 h-max lg:w-102 w-full  flex flex-col">
      <h1 className="text-3xl font-semibold font-montserrat">
        {t("nutriousCard.title")}
      </h1>
      <div className="p-2 mt-3 flex">
        <button
          onClick={() => {
            setSize("grams");
          }}
          className={`w-max  font-semibold flex items-center h-10 p-2 border border-black rounded-tl-xl rounded-bl-xl cursor-pointer ${size === "grams" ? "bg-black text-white" : "bg-white text-black"}`}
        >
          {t("nutriousCard.per_100g")}
        </button>
        <button
          onClick={() => {
            setSize("portion");
          }}
          className={`w-max font-semibold flex items-center h-10 p-2 border border-black   rounded-tr-xl rounded-br-xl  cursor-pointer ${size === "portion" ? "bg-black text-white" : "bg-white text-black"} `}
        >
          per portion
        </button>
      </div>
      <table className="w-full max-w-md border-collapse mt-5">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left font-bold">
              {t("nutriousCard.Nutrient")}
            </th>
            <th className="py-2 text-right">{t("nutriousCard.Amount")}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">{t("nutriousCard.Energy_kJ")}</td>
            <td className="py-2 text-right">{formatVal(values.EnergyKJ)} kJ</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">
              {t("nutriousCard.Energy_kcal")}
            </td>
            <td className="py-2 text-right">{formatVal(values.EnergyKcal)} kcal</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">{t("nutriousCard.Fat")}</td>
            <td className="py-2 text-right">{formatVal(values.Fat)} g</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">
              {t("nutriousCard.Carbohydrates")}
            </td>
            <td className="py-2 text-right">{formatVal(values.Carbohydrates)} g</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">{t("nutriousCard.Protein")}</td>
            <td className="py-2 text-right">{formatVal(values.Protein)} g</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">{t("nutriousCard.Salt")}</td>
            <td className="py-2 text-right">{formatVal(values.Salt)} g</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionalComponent;

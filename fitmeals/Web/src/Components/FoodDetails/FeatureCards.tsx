import React from "react";
import { ScanLine, Activity, Flame } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeatureCards() {
  const t = useTranslations("Recognition.featureCards");

  return (
    <div className="grid grid-cols-1  xl:grid-cols-3 gap-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group ">
        <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
          <ScanLine className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          {t("card1Title")}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t("card1Desc")}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
        <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
          <Activity className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          {t("card2Title")}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t("card2Desc")}
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
        <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
          <Flame className="w-7 h-7 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          {t("card3Title")}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          {t("card3Desc")}
        </p>
      </div>
    </div>
  );
}

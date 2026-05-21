import React from "react";
import { motion } from "framer-motion";
import { ImageIcon, AlertCircle } from "lucide-react";
import { FoodPrediction } from "@/src/types/recognition/recognition.types";
import { useTranslations } from "next-intl";

interface AnalysisResultsProps {
  predictions: FoodPrediction[];
  isLowConfidence?: boolean;
}

export default function AnalysisResults({ predictions, isLowConfidence }: Readonly<AnalysisResultsProps>) {
  const t = useTranslations("Recognition.analysisResults");
  const tUX = useTranslations("Recognition.ux");
  const tCategories = useTranslations("Recognition.categories");

  if (!predictions || predictions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
        {isLowConfidence && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            {tUX("lowConfidence")}
          </div>
        )}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            {t("title")}
          </h3>
        </div>

        <div className="space-y-4 flex-1">
          {predictions.map((pred, idx) => {
            const displayName = pred.food
              .split("_")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            let translatedName = displayName;
            try {
              if (typeof tCategories.has === "function" && !tCategories.has(displayName as any)) {
                translatedName = displayName;
              } else {
                translatedName = tCategories(displayName as any);
              }
            } catch (e) {
              translatedName = displayName;
            }

            return (
              <div
                key={pred.food}
                className={`relative p-4 rounded-2xl ${
                  idx === 0
                    ? "border-2 border-green-500 bg-green-50/30 shadow-sm"
                    : "border border-slate-100 bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`font-medium ${
                      idx === 0 ? "text-green-800 text-lg" : "text-slate-600"
                    }`}
                  >
                    {translatedName}
                  </span>
                  <span
                    className={`font-semibold ${
                      idx === 0 ? "text-green-600" : "text-slate-500"
                    }`}
                  >
                    {pred.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.confidence}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + idx * 0.1,
                      ease: "easeOut",
                    }}
                    className={`h-full rounded-full ${
                      idx === 0 ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

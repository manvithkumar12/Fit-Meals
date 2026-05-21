"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { getRecognition } from "@/app/api/actions/Recognize/getRecognition";
import { FoodPrediction } from "@/src/types/recognition/recognition.types";

import Sidebar from "./Sidebar";
import UploadDropzone from "./UploadDropzone";
import FeatureCards from "./FeatureCards";
import AnalysisResults from "./AnalysisResults";
import NutritionCard from "./NutritionCard";
import { useTranslations } from "next-intl";
import { ImageIcon, AlertTriangle } from "lucide-react";

const SUPPORTED_CATEGORIES = [
  "Caesar Salad",
  "Omelette",
  "Spaghetti Bolognese",
  "Steak",
  "Apple Pie",
  "Cheesecake",
  "Waffles",
  "Pancakes",
  "Sushi",
  "Ramen",
  "Fried Rice",
  "Hamburger",
  "Pizza",
  "Hot Dog",
];

export default function RecognitionComponent() {
  const t = useTranslations("Recognition");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<FoodPrediction[]>([]);
  const [quantity, setQuantity] = useState<number>(100);

  const highestConfidence =
    predictions.length > 0 ? predictions[0].confidence : 0;
  const hasValidFood = highestConfidence >= 70;
  const isLowConfidence = highestConfidence >= 70 && highestConfidence < 85;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const imageUrl = URL.createObjectURL(uploadedFile);
      setSelectedImage(imageUrl);
      setShowResults(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !file) return;
    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const res = await getRecognition(file);
      setPredictions(res.top3);
    } catch (error) {
      toast.error(t("toast.error"));
      console.error(error);
    } finally {
      setIsAnalyzing(false);
      setShowResults(true);
    }
  };

  const handleImageRemove = () => {
    setFile(null);
    setSelectedImage(null);
    setShowResults(false);
    setPredictions([]);
  };

  return (
    <div className="w-full h-max font-sans text-slate-800 pb-20">
      <div className="max-w-7xl mx-auto flex h-max flex-col lg:flex-row gap-8">
        <div className="w-full h-max lg:w-2/5 xl:w-1/3 shrink-0 flex flex-col gap-6 lg:sticky lg:top-8 self-start">
          <Sidebar supportedCategories={SUPPORTED_CATEGORIES} />
          {showResults && hasValidFood && (
            <div className="hidden lg:block">
              <NutritionCard
                predictions={predictions}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          )}
        </div>

        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-8">
          {/* Upload & Hero Section */}
          <UploadDropzone
            selectedImage={selectedImage}
            isAnalyzing={isAnalyzing}
            onImageUpload={handleImageUpload}
            onAnalyze={handleAnalyze}
            onImageRemove={handleImageRemove}
          />

          {/* Mobile Nutrition Card */}
          {showResults && hasValidFood && (
            <div className="block lg:hidden">
              <NutritionCard
                predictions={predictions}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          )}

          {!showResults && !selectedImage && <FeatureCards />}

          {!showResults && selectedImage && !isAnalyzing && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500 text-center">
              <ImageIcon className="w-16 h-16 mb-4 text-slate-200" />
              <p className="text-xl font-medium text-slate-600">
                {t("ux.emptyState")}
              </p>
            </div>
          )}

          {showResults && !hasValidFood && (
            <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-3xl border border-red-100 shadow-sm text-center">
              <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
              <p className="text-xl font-medium text-red-600 max-w-md">
                {t("ux.noFoodDetected")}
              </p>
            </div>
          )}

          {showResults && hasValidFood && (
            <AnalysisResults
              predictions={predictions}
              isLowConfidence={isLowConfidence}
            />
          )}
        </div>
      </div>
    </div>
  );
}

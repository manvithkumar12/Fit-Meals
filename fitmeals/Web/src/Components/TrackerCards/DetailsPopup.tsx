"use client";
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";
import { useUser } from "@/src/context/UserContext";
import { useRecommendation } from "@/src/query/useRecommendation";
import { useTranslations } from "next-intl";

import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

interface PreferenceProps {
  Preferences: {
    high_protein: boolean;
    low_fat: boolean;
    low_calories: boolean;
    high_carbs: boolean;
    low_salt: boolean;
  };
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailsPopup = ({ Preferences, setPopUp }: PreferenceProps) => {
  const context = useContext(DietContext);
  const context2 = useContext(TrackGoalContext);
  const user = useUser();
  const setResponse = context2?.setResponse;
  const setRecommendationLoading = context2?.setRecommendationLoading;
  const setRecommendationError = context2?.setRecommendationError;
  const [formData, setFormData] = useState({
    gender: "male",
    weight: 0,
    height: 0,
    age: 0,
    activity: "high",
    goal: "gain",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };
  const handleImport = () => {
    if (context?.userData) {
      const { gender, weight, height, age, activity, goal } = context.userData;
      setFormData({
        gender: gender || "male",
        weight: weight || 0,
        height: height || 0,
        age: age || 0,
        activity: activity?.includes("high") ? "high" : "low",
        goal: goal?.includes("loss") ? "loss" : "gain",
      });
    }
  };
  const targetData = context2?.targetData;
  const loggedData = context2?.loggedData;
  const recommendationMutation = useRecommendation();
  const isInvalid =
    formData.weight <= 0 || formData.height <= 0 || formData.age <= 0;
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetData && Preferences) {
      const payload: recomendationInputType = {
        user: {
          gender: formData.gender,
          weight: formData.weight,
          height: formData.height,
          age: formData.age,
          activity: formData.activity,
          goal: formData.goal,
        },
        target: {
          calories: targetData.calories,
          protein: targetData.protein,
          carbs: targetData.carbs,
          fat: targetData.fats,
        },

        logged: {
          calories: loggedData?.loggedCalories || 0,
          protein: loggedData?.loggedProtein || 0,
          carbs: loggedData?.loggedCarbos || 0,
          fat: loggedData?.loggedFat || 0,
        },
        preferences: Preferences,
      };
      setRecommendationLoading?.(true);
      setRecommendationError?.(null);
      recommendationMutation.mutate(payload, {
        onSuccess(data) {
          setResponse?.(data);
          setRecommendationLoading?.(false);
          setPopUp(false);
        },
        onError(error: any) {
          setRecommendationError?.(
            error?.message || "Unable to fetch recommendations",
          );
          setRecommendationLoading?.(false);
        },
      });
    } else if (!user?.id) {
        toast.error("Looks like you are not logged in");
      } else if (!targetData) {
        toast.error("Please set targets for recommendation");
      }
  };
  const t = useTranslations("Fit_tracker.userForm");
  return (
    <div className="p-6 bg-white lg:w-150 md:w-120 w-[98%] rounded-lg md:shadow-md mx-auto md:border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{t("title")}</h2>
      <form onSubmit={handleSubmission} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">
            {t("gender")}
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 bg-white"
          >
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm text-gray-600 font-medium">
              {t("weight")}
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm text-gray-600 font-medium">
              {t("height")}
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm text-gray-600 font-medium">
              {t("activity")}
            </label>
            <select
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 bg-white"
            >
              <option value="high">{t("high")}</option>
              <option value="low">{t("low")}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label className="text-sm text-gray-600 font-medium">
              {t("goal")}
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 bg-white"
            >
              <option value="gain">{t("gain")}</option>
              <option value="loss">{t("loss")}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <button
            type="button"
            onClick={handleImport}
            className="w-full py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors border border-green-200"
          >
            {t("import_btn")}
          </button>
          <button
            type="submit"
            disabled={isInvalid || recommendationMutation.isPending}
            className={`w-full py-2 text-sm font-medium text-white rounded-md transition-colors shadow-sm ${
              isInvalid || recommendationMutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {recommendationMutation.isPending ? (
              <>{t("submitting")}...</>
            ) : (
              t("submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsPopup;

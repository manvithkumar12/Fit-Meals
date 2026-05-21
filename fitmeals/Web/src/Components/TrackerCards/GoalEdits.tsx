"use client";
import React, { useEffect, useState } from "react";
import { PlainPopUp } from "../PopUp/Popup";
import { targetDataType } from "@/src/types/Trackers/TargetData.types";
import { useUser } from "@/src/context/UserContext";
import { toast } from "react-toastify";
import { useChangeTargets } from "@/src/mutations/Tracker/Tracker.Targets";
import { useTargetData } from "@/src/query/useLoggedData";
import { useTranslations } from "next-intl";

interface GoalEditsProps {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalEdits = ({ setPopUp }: GoalEditsProps) => {
  const user = useUser();
  const t = useTranslations("Fit_tracker.Goals");
  const { data } = useTargetData(user?.id);
  const mutation = useChangeTargets(user?.id!);

  const [form, setForm] = useState<targetDataType>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  useEffect(() => {
    if (data?.targets) {
      setForm(data.targets);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    mutation.mutate(form, {
      onSuccess: () => {
        setPopUp(false);
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error("Failed to update targets");
      },
    });
  };

  return (
    <PlainPopUp setPopUp={setPopUp}>
      <div className="flex flex-col md:w-120 w-full items-center justify-center p-4 sm:p-8 mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("title")}
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Calories */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("calories")} (kcal)
            </label>
            <input
              type="number"
              value={form.calories}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  calories: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
          </div>

          {/* Protein */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("protein")} (g)
            </label>
            <input
              type="number"
              value={form.protein}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  protein: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
          </div>

          {/* Carbs */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("carbs")} (g)
            </label>
            <input
              type="number"
              value={form.carbs}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  carbs: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
          </div>

          {/* Fats */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">
              {t("fats")} (g)
            </label>
            <input
              type="number"
              value={form.fats}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  fats: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className={`py-3 px-4 rounded-md font-semibold text-white ${
              mutation.isPending
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } bg-green-600 hover:bg-green-700 transition`}
          >
            {mutation.isPending ? t("saving") : t("save")}
          </button>
        </form>
      </div>
    </PlainPopUp>
  );
};

export default GoalEdits;

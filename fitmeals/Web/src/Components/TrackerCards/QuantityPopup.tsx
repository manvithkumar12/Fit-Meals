import { LoggedDataType } from "@/app/api/actions/Tracker/ChangeLoggedFood";
import { useAddLoggedFood } from "@/src/mutations/Tracker/LoggedFood";
import React, { useState, useContext } from "react";

import { TrackGoalContext } from "@/src/context/TrackContext/TrackGoalsContext";
import { useUser } from "@/src/context/UserContext";
import { toast } from "react-toastify";

interface FoodData {
  title?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  id: number;
  fats?: number;
}

interface QuantityPopupProps {
  foodData: FoodData;
  onClose: () => void;
}

const QuantityPopup: React.FC<QuantityPopupProps> = ({ foodData, onClose }) => {
  const [quantity, setQuantity] = useState<number | "">(100);

  const cal = foodData.calories || 0;
  const pro = foodData.protein || 0;
  const car = foodData.carbs || 0;
  const fat = foodData.fats || 0;

  const currentQuantity = typeof quantity === "number" ? quantity : 0;
  const updatedCalories = ((cal / 100) * currentQuantity).toFixed(1);
  const updatedProtein = ((pro / 100) * currentQuantity).toFixed(1);
  const updatedCarbs = ((car / 100) * currentQuantity).toFixed(1);
  const updatedFats = ((fat / 100) * currentQuantity).toFixed(1);

  const { mutate, isPending } = useAddLoggedFood();

  const context = useContext(TrackGoalContext);
  const targetId = context?.targetId;
  const user = useUser();

  const handleSubmit = () => {
    if (!targetId || !user?.id) {
      toast.error("User or Target ID not found.");
      return;
    }
    try {
      const dataToSubmit: LoggedDataType = {
        itemId: foodData.id,
        calories: Number(updatedCalories),
        protein: Number(updatedProtein),
        carbs: Number(updatedCarbs),
        fat: Number(updatedFats),
      };

      mutate(
        { data: dataToSubmit, targetId: targetId, userId: user.id },
        {
          onSuccess: () => {
            toast.success("Food logged successfully!");
            onClose();
          },
          onError: () => {
            toast.error("Failed to add food");
          },
        },
      );
    } catch (error) {
      toast.error("Failed to add food");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150]">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm m-4 text-gray-800 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold truncate pr-4">
            {foodData.title || "Food Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-3">
          <label className="block text-sm font-medium text-gray-700 mb-1 mr-auto">
            Quantity (grams)
          </label>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Enter quantity in grams"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-100">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            Updated Macros
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Calories</span>
              <span className="font-bold text-gray-900">
                {updatedCalories} kcal
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Protein</span>
              <span className="font-bold text-gray-900">
                {updatedProtein} g
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Carbs</span>
              <span className="font-bold text-gray-900">{updatedCarbs} g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Fats</span>
              <span className="font-bold text-gray-900">{updatedFats} g</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`w-full bg-green-600 text-white font-semibold py-2.5 rounded-md hover:bg-green-700 active:bg-green-800 transition-colors cursor-pointer ${isPending ? "opacity-50" : ""}`}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuantityPopup;

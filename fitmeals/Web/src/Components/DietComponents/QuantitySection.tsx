import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
const Confetti = dynamic(
  () => import("../StatCard/Confetti"),
  {
    ssr: false,
  }
);
import { DietContext } from "@/src/context/dietPlan/dietPlanContext";
import { logItemType, logMeal } from "@/app/api/actions/loggedMeals/logMeal";
import { toast } from "react-toastify";
import { removeDietItem } from "@/app/api/actions/getDiet/removeFood";
import { SelectionContext } from "@/src/context/dietPlan/selectionContext";
import { FoodType } from "@/app/api/actions/getDiet/addFood";
import { loggedMealContext } from "@/src/context/loggedMeals/loggedMeal.Context";
export type FoodDetails = {
  calories: number;
  carbos: number;
  fats: number;
  foodItem: { foodname: string | null };
  foodItemId: number;
  foodType: string;
  protein: number;
  quantity: number;
};
interface ItemProps {
  selectedItem: FoodDetails;
  popUpState: React.Dispatch<React.SetStateAction<boolean>>;
}
const QuantitySection = ({ selectedItem, popUpState }: ItemProps) => {
  const context2 = useContext(SelectionContext);
  const changeDietItems = context2?.setDietItems;
  const [quantity, setQuantity] = useState<number>(0);
  const context = useContext(DietContext);
  const context3 = useContext(loggedMealContext);
  const profileId = context?.userdietid;
  const handleDelete = async (itemId: number, mealType: FoodType) => {
    if (!profileId) return;
    await removeDietItem(profileId, itemId, mealType);
  };

  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const totalValue = (value: number) => {
    if (!quantity) return 0;
    return (quantity / 100) * value;
  };
  const handleSubmit = async (items: logItemType) => {
    if (!profileId) return null;
    try {
      setLoading(true);
      await logMeal(profileId, items);
    } catch {
      toast.error("An error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-90 md:w-120  flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2  w-[85%]">
        <h2>Please select quantity in grams</h2>
        <input
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          type="number"
          className="w-full rounded-md p-2 h-10 border-gray-200 border"
        />
        <div className="flex flex-col  w-full  justify-center items-center md:flex-row  md:w-100 md:h-10 min-h-10 max-h-max rounded-md  bg-[#f0f0e5]">
          Food name:
          <span className="font-semibold">
            {selectedItem.foodItem.foodname?.split(/[,(]/)[0]}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center flex-wrap w-[85%] gap-2">
        <div className="flex justify-center w-full min-h-10 md:w-50 rounded-md overflow-x-scroll  bg-[#f0f0e5] items-center">
          <h2>
            Calories:
            <span className="font-semibold">
              {totalValue(selectedItem.calories).toFixed(2)}
              Kcal
            </span>
          </h2>
          <h2 className="font-semibold text-xl ml-1">•</h2>
        </div>
        <div className="flex md:w-50 rounded-md overflow-x-scroll w-full min-h-10   bg-[#f0f0e5]  justify-center items-center">
          <h2>
            Protein:
            <span className="font-semibold">
              {totalValue(selectedItem.protein).toFixed(2)}g
            </span>
          </h2>
        </div>
        <div className="flex justify-center w-full min-h-10  items-center md:w-50 rounded-md overflow-x-scroll  bg-[#f0f0e5]">
          <h2>
            Carbohydrates:
            <span className="font-semibold">
              {totalValue(selectedItem.carbos).toFixed(2)}g
            </span>
          </h2>
          <h2 className="font-semibold text-xl ml-1">•</h2>
        </div>
        <div className=" flex justify-center w-full min-h-10  items-center md:w-50 rounded-md overflow-x-scroll  bg-[#f0f0e5] ">
          <h2>
            Fats:
            <span className="font-semibold">
              {totalValue(selectedItem.fats).toFixed(2)}g
            </span>
          </h2>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={async () => {
          const round = (val: number) => Number(val.toFixed(2));
          const snapshot = context2?.dietItems;
          const snapshot2 = context3?.data;
          try {
            changeDietItems?.((prev) =>
              prev.filter(
                (item) =>
                  item.foodItemId !== selectedItem.foodItemId ||
                  item.foodType !== selectedItem.foodType,
              ),
            );
            context3?.setdata((prev) => [
              ...prev,
              {
                loggedItems: [{ foodname: selectedItem.foodItem.foodname }],
                loggedQuantity: quantity,
                date: new Date(),
                time: selectedItem.foodType,
              },
            ]);
            await handleSubmit({
              itemId: selectedItem.foodItemId,
              loggedCalories: round(totalValue(selectedItem.calories)),
              loggedProtein: round(totalValue(selectedItem.protein)),
              loggedCarbos: round(totalValue(selectedItem.carbos)),
              loggedFat: round(totalValue(selectedItem.fats)),
              loggedQuantity: quantity,
              time: selectedItem.foodType as "BREAKFAST" | "LUNCH" | "DINNER",
            });
            await handleDelete(
              selectedItem.foodItemId,
              selectedItem.foodType as FoodType,
            );
            setConfetti(true);
            toast.success("Item logged successfully");
            setTimeout(() => {
              popUpState(false);
            }, 1200);
          } catch {
            if (snapshot) changeDietItems?.(() => snapshot);
            if (snapshot2) context3?.setdata(() => snapshot2);
            toast.error("An error occured");
          }
        }}
        className={`p-2 bg-green-700 text-white font-semibold w-[85%] mt-3 rounded-md ${loading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
      >
        Submit
      </button>
      {confetti && <Confetti />}
    </div>
  );
};

export default QuantitySection;

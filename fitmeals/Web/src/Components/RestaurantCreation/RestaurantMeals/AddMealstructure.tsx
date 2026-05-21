"use client";
import GuidLines from "./GuidLines";
import MealInfo from "./MealInfo";
import NutritionCard from "./NutritionCard";
import ConfirmSection from "./ConfirmSection";
import { MealformContextProvider } from "@/src/context/AddMealForm";
import { useUser } from "@/src/context/UserContext";
import { redirect } from "next/navigation";

const AddMealstructure = () => {
  const user = useUser();
  if (!user?.id) redirect("/login");
  return (
    <MealformContextProvider id={user?.id}>
      <MealInfo />
      <NutritionCard />
      <GuidLines Pagetype="Restaurant" />
      <ConfirmSection />
    </MealformContextProvider>
  );
};

export default AddMealstructure;

// src/Components/DietComponents/DietProviders.tsx

"use client";

import { DietProvider } from "@/src/context/dietPlan/dietPlanContext";
import { SelectionProvider } from "@/src/context/dietPlan/selectionContext";
import { LoggedMealContextProvider } from "@/src/context/loggedMeals/loggedMeal.Context";

export default function DietProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DietProvider>
      <LoggedMealContextProvider>
        <SelectionProvider>{children}</SelectionProvider>
      </LoggedMealContextProvider>
    </DietProvider>
  );
}

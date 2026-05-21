"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { userDietInput } from "../../types/userDiet.types";
import { useUser } from "../UserContext";
import { getDietPlan } from "@/app/api/actions/getDiet/getDiet";
import { toast } from "react-toastify";
import { dietResData, FoodAmountProps } from "../../types/dietRes.types";
import { getUserMacros } from "@/app/api/actions/getDiet/getUserMacros";
import { fetchuserDietData } from "@/src/Apiservices/api/dietcontext/dietApi";

export type MacrosProps = {
  days: number;
  dailyCalories: number;
  dailyprotein: number;
  dailycarb: number;
  dailyfat: number;
};

export type TimedMacrosType = {
  Breakfast: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  Lunch: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  Dinner: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
};

export type dietContextType = {
  userData: userDietInput;
  setUserData: React.Dispatch<SetStateAction<userDietInput>>;
  valuesloading: boolean;
  setValuesLoading: React.Dispatch<SetStateAction<boolean>>;
  handlePlanSubmit: () => Promise<void>;
  setFoodItems: React.Dispatch<SetStateAction<FoodAmountProps>>;
  submitloading: boolean;
  itemspopup: boolean;
  fetcheditems: dietResData | null;
  setFetchedItems: React.Dispatch<SetStateAction<dietResData | null>>;
  setItemsPopup: React.Dispatch<SetStateAction<boolean>>;
  macros: MacrosProps;
  timedMacros: TimedMacrosType | null;
  setUserDietId: React.Dispatch<SetStateAction<number | undefined>>;
  userdietid: number | undefined;
  creationDate: Date | null;
  fetchedItemsLoading: boolean;
  refreshMacros: () => Promise<void>;
};

export const DietContext = createContext<dietContextType | null>(null);

export const DietProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();

  const [creationDate, setCreationDate] = useState<Date | null>(null);

  const [userData, setUserData] = useState<userDietInput>({
    gender: "male",
    weight: 0,
    height: 0,
    age: 0,
    target_weight: 0,
    activity: "low",
    goal: "weight loss",
  });

  const [foodItems, setFoodItems] = useState<FoodAmountProps>({
    breakFastItems: 1,
    lunchItems: 5,
    dinnerItems: 2,
  });

  const [valuesloading, setValuesLoading] = useState<boolean>(true);

  const [userdietid, setUserDietId] = useState<number | undefined>(undefined);

  const [macros, setmacros] = useState<MacrosProps>({
    days: 0,
    dailyCalories: 0,
    dailyprotein: 0,
    dailycarb: 0,
    dailyfat: 0,
  });

  const [itemspopup, setItemsPopup] = useState<boolean>(false);

  const [timedMacros, setTimedMacros] = useState<TimedMacrosType | null>(null);

  const [submitloading, setSubmitLoading] = useState<boolean>(false);

  const [fetchedItemsLoading, setFetchedItemsLoading] =
    useState<boolean>(false);

  const [fetcheditems, setFetchedItems] = useState<dietResData | null>(null);

  // LOAD USER PROFILE
  useEffect(() => {
    const loadUserDiet = async () => {
      try {
        if (!user?.id) {
          setValuesLoading(false);
          return;
        }

        setValuesLoading(true);

        const res = await fetchuserDietData(user.id);

        if (res) {
          setUserData(res as userDietInput);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setValuesLoading(false);
      }
    };

    loadUserDiet();
  }, [user?.id]);

  // REFRESH MACROS
  const refreshMacros = useCallback(async () => {
    try {
      if (!user?.id) return;

      const res = await getUserMacros(user.id);

      if (res) {
        setmacros({
          days: res.days,
          dailyCalories: res.dailyCalories,
          dailyprotein: res.dailyprotein,
          dailycarb: res.dailycarb,
          dailyfat: res.dailyfat,
        });

        setUserDietId(res.id);
        setCreationDate(res.date ?? null);
      }
    } catch (error) {
      console.log("unable to get Macros", error);
    }
  }, [user?.id]);

  // INITIAL FETCH
  useEffect(() => {
    refreshMacros();
  }, [refreshMacros]);

  // HANDLE PLAN SUBMIT
  const handlePlanSubmit = useCallback(async () => {
    if (!user?.id) {
      toast.error("Looks like you are not logged in");
      return;
    }

    try {
      setSubmitLoading(true);
      setItemsPopup(true);
      setFetchedItemsLoading(true);

      const res = await getDietPlan(
        user.id,
        foodItems.breakFastItems,
        foodItems.dinnerItems,
        foodItems.lunchItems,
      );

      if (!res) return;

      setUserDietId(res?.date.id);

      const data = res?.data ?? null;

      setFetchedItems(data);

      setTimedMacros(res?.postApi?.timings ?? null);

      setCreationDate(res?.date.date ?? null);

      // REFRESH MACROS AFTER PLAN GENERATION
      await refreshMacros();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      setFetchedItemsLoading(false);
    }
  }, [
    user?.id,
    foodItems.breakFastItems,
    foodItems.dinnerItems,
    foodItems.lunchItems,
    refreshMacros,
  ]);

  const value = useMemo(
    () => ({
      userData,
      valuesloading,
      setUserData,
      setValuesLoading,
      handlePlanSubmit,
      setFoodItems,
      submitloading,
      setItemsPopup,
      itemspopup,
      fetcheditems,
      setFetchedItems,
      macros,
      setUserDietId,
      userdietid,
      creationDate,
      timedMacros,
      fetchedItemsLoading,
      refreshMacros,
    }),
    [
      handlePlanSubmit,
      userData,
      macros,
      valuesloading,
      userdietid,
      submitloading,
      itemspopup,
      fetcheditems,
      creationDate,
      timedMacros,
      fetchedItemsLoading,
      refreshMacros,
    ],
  );

  return (
    <DietContext.Provider value={value}>
      {children}
    </DietContext.Provider>
  );
};

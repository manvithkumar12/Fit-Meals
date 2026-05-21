"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import { DietContext } from "../dietPlan/dietPlanContext";

import { getLoggedItems } from "@/app/api/actions/loggedMeals/getLoggedMeals";

import {
  getProgressData,
  totalType,
} from "@/app/api/actions/loggedMeals/getProgressData";

type resType = {
  loggedItems: {
    foodname: string | null;
  }[];

  loggedQuantity: number;

  date: Date;

  time: string;
};

type dailyLoggedData = {
  totalFats: number;
  totalCarbs: number;
  totalProtein: number;
  totalCalories: number;
};

type LoggedMeal = {
  loggedbreakFast: resType[];

  setLoggedbreakFast: React.Dispatch<React.SetStateAction<resType[]>>;

  loggedLunch: resType[];

  setLoggedLunch: React.Dispatch<React.SetStateAction<resType[]>>;

  loggedDinner: resType[];

  setLoggedDinner: React.Dispatch<React.SetStateAction<resType[]>>;

  setdata: React.Dispatch<React.SetStateAction<resType[]>>;

  data: resType[];

  totalData: totalType | null;

  setTotalData: React.Dispatch<React.SetStateAction<totalType | null>>;

  dailyTargets: dailyLoggedData | null;

  setDailyTargets: React.Dispatch<React.SetStateAction<dailyLoggedData | null>>;

  refreshProgress: () => void;
};

export const loggedMealContext = createContext<LoggedMeal | null>(null);

export const LoggedMealContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const user = useContext(DietContext);

  const profileId = user?.userdietid;

  const [data, setdata] = useState<resType[]>([]);

  const [loggedbreakFast, setLoggedbreakFast] = useState<resType[]>([]);

  const [loggedLunch, setLoggedLunch] = useState<resType[]>([]);

  const [loggedDinner, setLoggedDinner] = useState<resType[]>([]);

  const [totalData, setTotalData] = useState<totalType | null>(null);

  const [refresh, setRefresh] = useState(false);

  const [dailyTargets, setDailyTargets] = useState<dailyLoggedData | null>(
    null,
  );

  // FETCH LOGGED MEALS
  useEffect(() => {
    const fetchLoggedMeals = async () => {
      if (!profileId) return;

      try {
        const res = await getLoggedItems(profileId);

        if (res) {
          setdata(res.result);

          setDailyTargets(res.totalData);
        }
      } catch {
        toast.error("Unable to load logged items");
      }
    };

    fetchLoggedMeals();
  }, [profileId, refresh]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!profileId) return;

      try {
        const res = await getProgressData(profileId);

        if (res) {
          setTotalData(res);
        }
      } catch {
        toast.error("Unable to load progress data");
      }
    };

    fetchProgressData();
  }, [profileId, refresh]);

  useEffect(() => {
    setLoggedbreakFast(
      data.filter((item) => item.time?.toUpperCase() === "BREAKFAST"),
    );

    setLoggedLunch(data.filter((item) => item.time?.toUpperCase() === "LUNCH"));

    setLoggedDinner(
      data.filter((item) => item.time?.toUpperCase() === "DINNER"),
    );
  }, [data]);

  // MANUAL REFRESH
  const refreshProgress = () => {
    setRefresh((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      loggedbreakFast,
      setLoggedbreakFast,

      loggedLunch,
      setLoggedLunch,

      loggedDinner,
      setLoggedDinner,

      data,
      setdata,

      totalData,
      setTotalData,

      dailyTargets,
      setDailyTargets,

      refreshProgress,
    }),
    [loggedbreakFast, loggedLunch, loggedDinner, data, totalData, dailyTargets],
  );

  return (
    <loggedMealContext.Provider value={value}>
      {children}
    </loggedMealContext.Provider>
  );
};

"use client";

import { sumData, targetDataType } from "@/src/types/Trackers/TargetData.types";

import { createContext, ReactNode, useMemo, useState } from "react";

import { useUser } from "../UserContext";
import { RecommendationResponseType } from "@/src/types/Recommendation/response";
import { useTargetData } from "@/src/query/useLoggedData";

export type trackGoalType = {
  targetId: number | undefined;
  targetData: targetDataType | null;
  loggedData: sumData | null;
  setTargetId: React.Dispatch<React.SetStateAction<number | undefined>>;

  Response: RecommendationResponseType;
  setResponse: React.Dispatch<React.SetStateAction<RecommendationResponseType>>;

  isLoading: boolean;

  recommendationLoading: boolean;
  setRecommendationLoading: React.Dispatch<React.SetStateAction<boolean>>;

  recommendationError: string | null;
  setRecommendationError: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TrackGoalContext = createContext<trackGoalType | null>(null);

export const TrackGoalProvider = ({ children }: { children: ReactNode }) => {
  const user = useUser();

  const [Response, setResponse] = useState<RecommendationResponseType>([]);
  const [targetid, setTargetId] = useState<number | undefined>(undefined);
  const [recommendationLoading, setRecommendationLoading] = useState(false);

  const [recommendationError, setRecommendationError] = useState<string | null>(
    null,
  );

  const { data, isLoading } = useTargetData(user?.id);

  const value = useMemo(
    () => ({
      targetId: targetid,
      setTargetId: setTargetId,
      targetData: data?.targets || null,

      loggedData: data?.loggedData || null,

      Response,
      setResponse,

      isLoading,

      recommendationLoading,
      setRecommendationLoading,

      recommendationError,
      setRecommendationError,
    }),
    [
      data,
      Response,
      isLoading,
      recommendationLoading,
      recommendationError,
      targetid,
    ],
  );

  return (
    <TrackGoalContext.Provider value={value}>
      {children}
    </TrackGoalContext.Provider>
  );
};

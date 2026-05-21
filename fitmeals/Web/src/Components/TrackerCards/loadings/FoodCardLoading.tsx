"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface TypeProps {
  type: "logged" | "searched" | "suggestion";
}
const FoodCardLoading = ({ type }: TypeProps) => {
  return (
    <div
      className={`overflow-scroll pb-1 text-sm   flex-col flex  rounded-md bg-gray-100 ${type === "logged" ? "w-full gap-4 h-42" : type === "suggestion" ? "h-30 w-full" : "h-40  w-85 gap-2 md:w-70 lg:w-65"}`}
    >
      <div className="flex flex-col ml-3 mt-4 gap-2">
        <div className="w-[70%] h-7">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-sm"
            width="100%"
            height="100%"
          />
        </div>
        <div className="w-[70%] h-5">
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-sm"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className={`w-[70%] h-5 ${type === "suggestion" ? "hidden" : "flex"}`}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-sm"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <div className={`flex w-full`}>
        <button
          className={`w-20  h-9 mb-2 ml-4 bg-gray-100 cursor-pointer text-white font-semibold text-md rounded-xs ${type === "suggestion" ? "hidden" : "flex"}`}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-md"
            width="100%"
            height="100%"
          />
        </button>
        <button
          className={`w-20  ml-auto h-9 mb-2  mr-2 bg-gray-100 cursor-pointer text-white font-semibold text-md rounded-xs`}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="rounded-md"
            width="100%"
            height="100%"
          />
        </button>
      </div>
    </div>
  );
};

export default FoodCardLoading;

"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";

const DietFoodLoading = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((item, i) => (
        <div
          key={i+1}
          className="w-[95%] h-30 md:h-35 flex mt-3 rounded-md bg-[#F0F0E5] shadow-md  border border-gray-200"
        >
          <Skeleton
            variant="rectangular"
            className="rounded-md"
            width="100%"
            height="100%"
          />
        </div>
      ))}
    </>
  );
};

export default DietFoodLoading;

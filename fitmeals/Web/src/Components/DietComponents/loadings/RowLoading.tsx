import Skeleton from "@mui/material/Skeleton";
import React from "react";

const RowLoading = () => {
  return (
    <div className="flex flex-col w-full gap-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index + 1}
          className={`flex border-b border-gray-200  h-9 rounded-md md:text-[17px]`}
        >
          <Skeleton
            variant="rectangular"
            className="rounded-md"
            width="100%"
            height="100%"
          />
        </div>
      ))}
    </div>
  );
};

export default RowLoading;

"use client";

import Skeleton from "@mui/material/Skeleton";

const FlexFilterLoading = () => {
  return (
    <div className="flex gap-1 md:gap-3  md:pr-2 h-max w-full flex-wrap overflow-visible">
      {Array.from({ length: 5 }).map((key, index) => (
        <button
          key={index + 1}
          className={`h-10 w-20 rounded-lg border whitespace-nowrap text-sm cursor-pointer}`}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </button>
      ))}
    </div>
  );
};

export default FlexFilterLoading;

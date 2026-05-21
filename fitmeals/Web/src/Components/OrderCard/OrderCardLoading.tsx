"use client";
import React from "react";

import Skeleton from "@mui/material/Skeleton";

const OrderCardLoading = () => {
  return (
    <div className="w-full h-full p-2">
      <div className="p-2 border-b border-black/25 w-[80%] h-13">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="p-2 border-b border-black/25 w-[80%] h-15 flex flex-col flex-wrap">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="p-2 border-b border-black/25 w-full items-center  h-15 flex">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="p-2 border-b border-black/25 w-full h-15 flex items-center justify-center gap-3 ">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="p-2 border-b border-black/25 w-full h-max">
        <div className="flex mt-2 h-10 w-[80%]">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </div>
        <div className="flex flex-col gap-1 h-max max-h-22 overflow-y-scroll mt-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex gap-3 items-center h-7" key={index + 1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </div>
          ))}
        </div>
        <div>
          {" "}
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </div>
      </div>
      <button className="p-2 rounded-md text-white gap-2 flex justify-center items-center font-semibold mt-3 mb-2">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </button>
    </div>
  );
};

export default OrderCardLoading;

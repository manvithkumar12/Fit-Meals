import React from "react";
import Skeleton from "@mui/material/Skeleton";

const RestaurantCardLoading = () => {
  return (
    <div className="w-full  h-max max-h-57 rounded-lg pl-2 pt-2 pb-2 shadow-md hover:shadow-lg transition-shadow flex bg-white border border-gray-300">
      <div className="w-[38%] mt-3">
        <div className="image relative rounded-lg h-30 md:h-38">
          <Skeleton
            height="100%"
            width="100%"
            className="rounded-lg"
            animation="wave"
            variant="rectangular"
          />
        </div>
        <div>
          <button className="gap-2 w-30 h-10  bg-green-100 flex items-center font-semibold text-white mt-2 rounded-md">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-md"
              animation="wave"
              variant="rectangular"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-[60%] pl-3 p-2">
        <div className="font-bold text-xl w-40 h-5 rounded-md">
          <Skeleton
            height="100%"
            width="100%"
            animation="wave"
            variant="rectangular"
          />
        </div>
        <div className="text-sm h-4 w-32 rounded-md">
          <Skeleton
            height="100%"
            width="100%"
            animation="wave"
            variant="rectangular"
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex w-20 h-10  rounded-lg  bg-yellow-100 items-center gap-2">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-lg"
              animation="wave"
              variant="rectangular"
            />
          </div>
          <div className="flex w-20 h-10  rounded-lg p-1 bg-gray-100 items-center gap-2">
            <h2>
              <Skeleton
                height="100%"
                width="100%"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
        </div>
        <div className="hidden md:flex w-20 h-10 gap-2 items-center">
          <Skeleton
            height="100%"
            width="100%"
            animation="wave"
            variant="rectangular"
            className="rounded-lg"
          />
        </div>
        <div className="gap-2 hidden md:flex">
          <div className="bg-green-100 w-max rounded-lg">
            <h4 className="text-green-700 text-sm font-semibold w-20 h-10 ">
              <Skeleton
                height="100%"
                width="100%"
                animation="wave"
                className="rounded-lg"
                variant="rectangular"
              />
            </h4>
          </div>
          <div className=" w-20 h-10 rounded-lg">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-lg"
              animation="wave"
              variant="rectangular"
            />
          </div>
        </div>
        <div className="w-max ml-auto">
          <button className="ml-auto md:mt-1 flex gap-1 w-30 items-center max-h-8 mt-3 bg-green-100 h-10 group rounded-md text-white font-semibold cursor-pointer">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-md"
              animation="wave"
              variant="rectangular"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardLoading;

"use client";
import Skeleton from "@mui/material/Skeleton";

const FoodBoxLoading = () => {
  return (
    <div className="w-full h-45  bg-white border border-gray-200 shadow-xl hover:shadow-2xl items-center rounded-lg pl-2 pr-2 flex cursor-pointer">
      <div>
        <div className="w-30 h-35 lg:w-35  relative rounded-md">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] ml-5 lg:ml-3 lg:mt-3 overflow-hidden">
        <h1 className="text-md md:text-lg w-50 h-5 font-semibold">
          {" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-sm"
            height="100%"
          />
        </h1>
        <h3 className="text-[12px] md:text-[14px] h-5 mt-2 w-[95%] truncate ">
          {" "}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-sm"
            height="100%"
          />
        </h3>
        <div className="flex w-full">
          <div className="flex-col flex w-full">
            <div className="text-[13px] mt-2 whitespace-nowrap xl:text-[14px] h-5 w-[50%]">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-sm"
                height="100%"
              />
            </div>
            <div className="text-[13px] mt-2 whitespace-nowrap xl:text-[14px] h-5 w-[50%]">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-sm"
                height="100%"
              />
            </div>
            <div className="flex w-full gap-2 items-center">
              <button className="cursor-pointer ml-auto mt-1.5 rounded-md bg-white font-semibold text-green-600  active:bg-green-400 active:text-white border border-gray-200 h-6 w-20 lg:w-25 xl:w-30 ">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  className="rounded-sm"
                  height="100%"
                />
              </button>
              <div className=" bg-green-100 mt-2 h-9 w-10 rounded-md whitespace-nowrap">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  className="rounded-sm"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodBoxLoading;

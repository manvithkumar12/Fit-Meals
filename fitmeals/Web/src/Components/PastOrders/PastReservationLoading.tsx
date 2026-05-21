import Skeleton from "@mui/material/Skeleton";
import React from "react";

const PastCardLoading = () => {
  return (
    <div className="border rounded-md flex-col flex gap-5 p-2 border-gray-200 h-60 mt-2">
      <div className="h-32 border-b border-gray-300 flex w-full">
        <div className="w-30 h-25 mt-3 rounded-md relative">
          <Skeleton
            height="100%"
            width="100%"
            className="rounded-lg"
            animation="wave"
            variant="rectangular"
          />
        </div>
        <div className="ml-4 mt-2 flex flex-col">
          <h2 className="font-semibold w-30 h-7 text-xl">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-lg"
              animation="wave"
              variant="rectangular"
            />
          </h2>
          <div className="flex items-center mt-1.5 gap-3">
            <h2 className="font-semibold h-7 w-40 text-lg">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
            <h2 className="font-semibold w-30 text-sm">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
          <div className="flex text-3md items-center h-10 max-w-120 gap-2 font-semibold">
            <h2>Address:</h2>
            <h2 className="font-semibold text-sm max-h-10 w-40 items-center flex h-7 overflow-y-scroll">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
            <i className="fa-solid fa-location-dot"></i>
            <h2 className="w-30 h-7">
              {" "}
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
        </div>
        <div className="ml-auto mt-5 h-max flex-col gap-2">
          <div className="h-10 w-45 border border-gray-200  mr-3 rounded-md font-medium">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-md"
              animation="wave"
              variant="rectangular"
            />
          </div>
          <div className="h-10 bg-green-100 w-45 text-white mt-2 border border-gray-200  mr-3 rounded-md font-medium">
            <Skeleton
              height="100%"
              width="100%"
              className="rounded-md"
              animation="wave"
              variant="rectangular"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div>
          <div className="flex ml-3 gap-2 whitespace-nowrap  items-center">
            <h2 className="font-semibold">Reservation Status : </h2>
            <h2 className="h-7 w-30">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
          <div className="flex ml-3 gap-2 mt-3 items-center">
            <h2 className="font-semibold">Reservation Time: </h2>
            <h2 className="w-30 h-7">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
        </div>
        <div>
          <div className="flex ml-3 gap-2 whitespace-nowrap items-center">
            <h2 className="font-semibold">Reservation Date : </h2>
            <h2 className="w-30 h-7">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
          <div className="flex ml-3 gap-2 mt-3 whitespace-nowrap items-center min-w-0">
            <h2 className="font-semibold">No of seats :</h2>
            <h2 className="w-30 h-7">
              <Skeleton
                height="100%"
                width="100%"
                className="rounded-lg"
                animation="wave"
                variant="rectangular"
              />
            </h2>
          </div>
        </div>
        <button className="ml-auto mr-3 bg-green-100 h-10  w-45 rounded-md font-semibold text-white">
          <Skeleton
            height="100%"
            width="100%"
            className="rounded-lg"
            animation="wave"
            variant="rectangular"
          />
        </button>
      </div>
    </div>
  );
};

export default PastCardLoading;

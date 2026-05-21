"use client";
import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CheckoutCardLoading = () => {
  return (
    <div className="h-120 xl:w-[60%] bg-white flex lg:w-[80%] w-[90%] p-5 rounded-md border border-black/20">
      <div className="w-full gap-3">
        <h1 className="font-semibold w-30 h-9 text-xl">
          {" "}
          <Skeleton
            variant="rectangular"
            className="rounded-md"
            animation="wave"
            width="100%"
            height="100%"
          />
        </h1>
        <div className="gap-3 flex flex-col mt-4 border-b border-black/40 pb-2 ">
          <div className="flex w-full font-semibold">
            <h2 className="w-30 h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md"
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
            <h2 className="ml-auto  w-30 h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md"
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
          </div>
          <div className="flex w-full font-semibold">
            <h2 className="w-30  h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md "
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
            <h2 className="ml-auto w-30  h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md"
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
          </div>
          <div className="flex w-full font-semibold">
            <h2 className="w-30  h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md"
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
            <h2 className="ml-auto w-30  h-9">
              {" "}
              <Skeleton
                variant="rectangular"
                className="rounded-md"
                animation="wave"
                width="100%"
                height="100%"
              />
            </h2>
          </div>
        </div>
        <div className="flex w-full font-semibold mt-2">
          <h2 className="w-30  h-9">
            {" "}
            <Skeleton
              variant="rectangular"
              className="rounded-md"
              animation="wave"
              width="100%"
              height="100%"
            />
          </h2>
          <h2 className="ml-auto w-30  h-9">
            {" "}
            <Skeleton
              variant="rectangular"
              className="rounded-md"
              animation="wave"
              width="100%"
              height="100%"
            />
          </h2>
        </div>
        <div className="w-full flex flex-col gap-2  mt-5 justify-center items-center">
          <button className="w-full h-10 rounded-md text-white cursor-pointer font-semibold bg-green-100">
            <Skeleton
              variant="rectangular"
              className="rounded-md"
              animation="wave"
              width="100%"
              height="100%"
            />
          </button>
          <button className="w-full h-10 rounded-md cursor-pointer text-green-100 font-semibold">
            <Skeleton
              variant="rectangular"
              className="rounded-md"
              animation="wave"
              width="100%"
              height="100%"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCardLoading;

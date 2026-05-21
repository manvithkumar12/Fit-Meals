import Skeleton from "@mui/material/Skeleton";
import React from "react";

const AddressCardLoading = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i+i}
          className="rounded-xl mt-5 space-y-3 h-35 w-200 border  p-4"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  className="rounded-md"
                  height="100%"
                />
              </div>
              <div className="w-50 h-7">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  className="rounded-md"
                  height="100%"
                />
              </div>
            </div>
            <div className="ml-9 w-50 h-7">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <div className="ml-auto w-10 h-7">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </div>
            <div className="w-10 h-7">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="h-30 mt-5  w-200">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
    </div>
  );
};

export default AddressCardLoading;

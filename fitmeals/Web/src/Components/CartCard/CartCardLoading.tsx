"use client";
import Skeleton from "@mui/material/Skeleton";

const CartCardLoading = () => {
  return (
    <div className="w-full h-max flex border-b border-black/20 p-2">
      <div className="h-20 w-25 relative rounded-md overflow-hidden cursor-pointer">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </div>
      <div className="flex flex-col p-2.5">
        <h2 className="font-semibold w-30 h-7 rounded-md truncate md:text-lg">
          {" "}
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        </h2>
        <h2 className="font-semibold w-20 h-5 rounded-md mt-3">
          {" "}
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </h2>
      </div>
      <div className="ml-auto flex mt-5 md:mt-0 flex-col">
        <div className="w-20 md:w-35 gap-2 h-6 md:h-10 flex">
          <button className="w-16  h-5 md:h-9 flex justify-center items-center text-sm md:text-xl font-semibold cursor-pointer">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              className="rounded-md"
            />
          </button>
          <div className="w-17.5 h-5 md:h-9 flex justify-center items-center text-sm md:text-lg font-semibold">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              className="rounded-md"
            />
          </div>
          <button className="w-16 h-5 md:h-9 flex justify-center items-center text-sm md:text-3xl font-semibold cursor-pointer">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              className="rounded-md"
            />
          </button>
        </div>
        <button className="ml-auto md:mt-auto mt-2 h-5 w-20 md:mb-1 font-semibold cursor-pointer text-sm md:text-lg text-black/60">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </button>
      </div>
    </div>
  );
};

export default CartCardLoading;

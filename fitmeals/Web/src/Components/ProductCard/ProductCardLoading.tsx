import React from "react";
import "./product.css";
import Skeleton from "@mui/material/Skeleton";

const ProductCardLoading = () => {
  return (
    <div className="h-max w-40 pb-3 md:pb-0 lg:w-72 overflow-hidden xl:h-100.5 xl:w-85.5 bg-[#f4f1ea] rounded-2xl md:shadow-lg relative flex flex-col items-center md:w-80">
      <div className="w-[90%] ml-auto mr-auto  md:h-50 mt-2 relative md:mt-3 rounded-xl group overflow-hidden h-30">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="flex flex-col md:mt-3 gap-1 justify-center items-center text-center">
        <h4 className="text-sm mt-2 md:mt-0 md:text-xl font-semibold font-montserrat">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </h4>
        <div className="w-full  flex-col items-center gap-1 hidden md:flex md:text-sm text-black/60">
          <div className="flex gap-2">
            <span className="w-30 h-7">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </span>
            <span>|</span>
            <span className="w-30 h-7">
              {" "}
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-30 h-7">
              {" "}
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </span>
            <span>|</span>
            <span className="w-30 h-7">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="w-[80%] border-b border-black/30 flex justify-center items-center">
        <div className="md:flex gap-2 justify-center hidden  items-center  md:text-sm ml-auto mr-auto w-max">
          <h4 className=" text-black/70 text-[14px] mt-2 whitespace-nowrap font-semibold ">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h4>
          <span className="hidden mt-2 md:block">|</span>
          <h4 className="text-black/70 hidden text-[14px]  whitespace-nowrap font-semibold md:mt-2  md:block">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h4>
        </div>
      </div>
      <div>
        <button className="w-50 h-6 text-xs md:text-lg mt-2 md:mt-5 md:mb-5 md:h-10 font-semibold rounded-2xl shadow-xl active:shadow ">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCardLoading;

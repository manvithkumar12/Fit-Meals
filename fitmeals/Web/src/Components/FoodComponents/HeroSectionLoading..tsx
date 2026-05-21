import React from "react";
import Skeleton from "@mui/material/Skeleton";

const HeroSectionLoading = () => {
  return (
    <>
      {" "}
      <div className="image-container xl:w-137.5 xl:h-140 lg:w-120.5 lg:h-120 md:w-100 md:h-100 h-80 w-80 ml-auto mr-auto  bg-linear-to-br box-shadow: inset 0 0 20px rgba(0,0,0,0.03); from-[#f7f7f7] to-[#eaeaea] rounded-lg relative  overflow-hidden group ">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          className="rounded-md"
          height="100%"
        />
      </div>
      <div className="flex-1 flex pl-8 md:pl-10 pt-10 flex-col">
        <div className="border-b pb-3 border-b-black/30  w-[90%] md:w-[80%]">
          <h1 className="text-4xl font-semibold font-montserrat w-70 h-12">
            {" "}
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h1>
          <h4 className="mt-5 text-[1.75rem] w-30 h-10 font-semibold font-montserrat  text-green-600">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h4>
        </div>
        <div className="mt-5 flex gap-3 border-b border-b-black/40 w-[90%] md:w-[80%] pb-2 ">
          <div className="flex items-center gap-2">
            <h4 className="text-sm whitespace-nowrap md:text-[16px] h-8 w-20">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </h4>
          </div>
          <span className="text-4xl text-black/40 opacity-55">|</span>
          <div className="flex items-center gap-2">
            <h4 className="text-sm whitespace-nowrap md:text-[16px] h-8 w-20">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                className="rounded-md"
                height="100%"
              />
            </h4>
          </div>
          <span className="text-4xl text-black/40 opacity-55">|</span>
          <div className="flex items-center gap-2">
            <h4 className="text-sm whitespace-nowrap md:text-[16px] h-8 w-20">
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
        <div className="flex flex-col mt-3 gap-2">
          <h1 className="text-2xl h-10 w-70 font-semibold font-montserrat">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="rounded-md"
              height="100%"
            />
          </h1>
          {Array.from({ length: 3 }).map((items, index) => (
            <div
              className="flex items-center gap-2 leading-snug"
              key={index + 1}
            >
              <h3 key={index + 1} className="w-30 h-7">
                {" "}
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  className="rounded-md"
                  height="100%"
                />
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSectionLoading;

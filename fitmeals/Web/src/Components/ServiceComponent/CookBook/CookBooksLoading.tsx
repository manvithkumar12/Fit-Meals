import React from "react";
import Skeleton from "@mui/material/Skeleton";
import FlexFilterLoading from "../../FlexFilter/FlexFilterLoading";
import ProductCardLoading from "../../ProductCard/ProductCardLoading";

const CookBooksLoading = () => {
  return (
    <div className="mt-7 overflow-z md:w-[90%] pl-2 pr-2">
      <div className="ml-3 md:ml-0 pr-4">
        <h1 className="text-2xl  md:text-4xl h-12 w-70 font-bold font-montserrat">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </h1>
        <h4 className="mt-3 h-12 w-full text-md md:text-lg text-black/60">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </h4>
        <h4 className="mt-3 h-12 w-[30%] text-md md:text-lg text-black/60">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            className="rounded-md"
            height="100%"
          />
        </h4>
      </div>
      <div className="hidden md:flex overflow-y-visible mr-2 ml-2 mt-3">
        <FlexFilterLoading />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-5 pb-10 gap-3 place-items-center w-[98%]  md:gap-7">
        <ProductCardLoading />
      </div>
    </div>
  );
};

export default CookBooksLoading;

import HotelFilters from "@/src/Components/FlexFilter/HotelFilters";
import FoodBoxLoading from "@/src/Components/ServiceComponent/order/FoodBoxLoading";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-[30%] h-max p-2 lg:pt-10">
        <HotelFilters />
      </div>
      <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 lg:w-[70%] h-full p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <FoodBoxLoading key={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default loading;

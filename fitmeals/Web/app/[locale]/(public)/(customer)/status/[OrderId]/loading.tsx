import React from "react";
import FoodCardLoading from "@/src/Components/DeliveryCard/loading/FoodCardLoading";
import OrderCardLoading from "@/src/Components/OrderCard/OrderCardLoading";

const Page = async ({ params }: { params: Promise<{ OrderId: string }> }) => {
  return (
    <div className="bg-[#FBF6FC] w-screen h-max min-h-[90vh] flex pt-10 pb-10">
      <div className="w-full flex gap-3 justify-between pl-5 pr-5  xl:pl-20 xl:pr-20 flex-col lg:flex-row">
        <FoodCardLoading />
        <div className="flex items-center w-[98%] lg:w-[48%]  justify-center">
          <div className="h-max max-h-130 w-95 lg:w-95 bg-white shadow-xl rounded-lg">
            <OrderCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

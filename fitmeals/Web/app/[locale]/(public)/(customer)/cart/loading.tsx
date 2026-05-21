import React from "react";
import CartCardLoading from "@/src/Components/CartCard/CartCardLoading";
import CheckoutCardLoading from "@/src/Components/CartCard/CheckoutCardLoading";

const Loading = () => {
  return (
    <div className="bg-[#FBF6FC] w-screen pb-10  justify-center  h-max min-h-[90vh] flex-col lg:flex-row  flex pt-10">
      <div className="xl:w-[45%] lg:w-[55%] h-max lg:p-5 justify-center w-full">
        <div className="lg:ml-10 md:ml-5 ml-3 flex flex-col justify-center gap-1 w-[95%]">
          <div className="flex gap-1 items-center">
            <i className="fa-solid fa-house ml-1 opacity-50"></i>
            <div>
              <h4 className=" font-semibold opacity-50 cursor-pointer">Home</h4>
            </div>
            <h4 className=" font-semibold opacity-50 ">/</h4>
            <h4 className=" font-semibold opacity-50 cursor-pointer">
              Cart Page
            </h4>
          </div>
          <h1 className="font-semibold text-5xl">Your Cart</h1>
          <div className="mt-7 w-full flex justify-center lg:justify-start">
            <div className="scrollbar w-max h-120 bg-white rounded-md min-h-40 border border-black/20 min-w-[90%] flex flex-col overflow-y-scroll p-2 scrollbar-hide">
              {Array.from({ length: 3 }).map((_, index) => (
                <CartCardLoading key={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] w-full flex justify-center items-center h-120 pt-10">
        <CheckoutCardLoading />
      </div>
    </div>
  );
};

export default Loading;

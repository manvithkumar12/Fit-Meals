import React from "react";
interface StatusProps {
  orderStatus:
    | "Waiting"
    | "Cooking"
    | "Packing"
    | "InDelivery"
    | "Delivered"
    | "CANCELLED";
}
const Status = ({ orderStatus }: StatusProps) => {
  const steps = ["Cooking", "Packing", "InDelivery", "Delivered"] as const;
  const currentIndex = steps.indexOf(orderStatus as any);

  const lineStyle = (stepIndex: number) =>
    stepIndex <= currentIndex
      ? "border-green-400 bg-green-400"
      : "border-gray-400 bg-gray-400";
  return (
    <div className="h-50 flex items-center lg:justify-start gap-1 md:gap-3 lg:gap-1 justify-center">
      <div className="flex flex-col h-full justify-center items-center">
        <div className="bg-white flex justify-center  items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <div
            className={`w-[85%] h-[85%] ${lineStyle(0)} flex justify-center items-center rounded-full`}
          >
            <i className="fa-solid text-white text-xl font-semibold fa-utensils"></i>
          </div>
        </div>
        <h4 className="text-center text-sm md:text-lg">
          In <br /> cooking
        </h4>
      </div>
      <div
        className={`min-w-10 md:min-w-25 border-t-2 h-1.5 mb-8 md:mb-10 ${lineStyle(1)}`}
      ></div>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <div
            className={`w-[85%] h-[85%] ${lineStyle(1)} flex justify-center items-center rounded-full`}
          >
            <i className="fa-solid text-white text-xl font-semibold fa-boxes-packing"></i>
          </div>
        </div>
        <h4 className="text-center text-sm md:text-lg ">
          In <br /> Packing
        </h4>
      </div>
      <div
        className={`min-w-10 md:min-w-25 border-t-2 h-1.5 mb-8 md:mb-10 ${lineStyle(2)}`}
      ></div>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <div
            className={`w-[85%] h-[85%] ${lineStyle(2)} flex justify-center items-center rounded-full`}
          >
            <i className="fa-solid text-white text-2xl font-semibold fa-person-biking"></i>
          </div>
        </div>
        <h4 className="text-center text-sm md:text-lg ">
          Out for <br /> Delivery
        </h4>
      </div>
      <div
        className={`min-w-10 md:min-w-25 border-t-2 h-1.5 mb-8 md:mb-10 ${lineStyle(3)}`}
      ></div>{" "}
      <div className="flex flex-col h-full justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full h-13 w-13 md:h-15 md:w-15">
          <div
            className={`w-[85%] h-[85%] ${lineStyle(3)} flex justify-center items-center rounded-full`}
          >
            <i className="fa-solid text-white text-3xl font-semibold fa-check"></i>
          </div>
        </div>
        <h4 className="text-center text-sm md:text-lg ">
          Ordered <br /> Delivered
        </h4>
      </div>
    </div>
  );
};

export default Status;

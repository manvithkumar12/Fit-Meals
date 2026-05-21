import React from "react";
import Reservation from "@/src/Components/ServiceComponent/reservation/Reservation";

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) => {
  return (
    <div className="w-screen h-max pt-10 overflow-hidden flex flex-col justify-center items-center ">
      <Reservation />
      <div className="w-max flex gap-2 ml-auto mt-5 mr-5"></div>
    </div>
  );
};
export default Page;

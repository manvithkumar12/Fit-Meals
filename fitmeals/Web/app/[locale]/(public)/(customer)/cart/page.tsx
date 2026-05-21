import React from "react";
import "../../page.css";
import CartPage from "@/src/Components/CartCard/CartPage";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  return (
    <div className="bg-[#FBF6FC] w-screen pb-10  justify-center  h-max min-h-[90vh] flex-col gap-5 lg:gap-0 lg:flex-row  flex pt-10">
      <CartPage />
    </div>
  );
};

export default Page;

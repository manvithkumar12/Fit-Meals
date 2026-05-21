import OrderCard from "@/src/Components/OrderCard/OrderCard";
import React from "react";
import { notFound, redirect } from "next/navigation";
import FoodCard from "@/src/Components/DeliveryCard/FoodCard";
import "../../../page.css";
import { getOrders } from "@/app/api/actions/orders/getOrders";
import { getUser } from "@/lib/CurrentUser";

const Page = async ({ params }: { params: Promise<{ OrderId: string }> }) => {
  const { OrderId } = await params;
  const user = await getUser();
  if (!user?.id) return redirect("/login");
  const getData = await getOrders(user?.id, Number(OrderId));
  if (!getData) return notFound();
  return (
    <div className="bg-[#FBF6FC] w-screen h-max min-h-[90vh] flex pt-10 pb-10">
      <div className="w-full flex gap-3 justify-between pl-5 pr-5  xl:pl-20 xl:pr-20 flex-col lg:flex-row">
        <FoodCard
          data={getData.deliveryPartner ?? undefined}
          orderStatus={getData.OrderStatus}
        />
        <div className="flex items-center w-[98%] lg:w-[48%]  justify-center">
          <div className="h-max max-h-130 w-95 lg:w-95 bg-white shadow-xl rounded-lg">
            <OrderCard
              Adress={getData.deliveryAddress.address ?? ""}
              ArrivalTime={getData.time ?? 0}
              Amount={getData.Amount ? Number(getData.Amount) : 0}
              Items={getData.items}
              orderId={Number(OrderId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

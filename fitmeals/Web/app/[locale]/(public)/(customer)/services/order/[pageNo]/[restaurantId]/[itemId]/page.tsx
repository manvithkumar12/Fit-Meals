import { getFoodItemsDetails } from "@/app/api/actions/FoodItems/getFoodItems";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";
import OrderItem from "@/src/Components/ServiceComponent/order/OrderItem";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ restaurantId: string; itemId: string; locale: string }>;
}) => {
  const { restaurantId, itemId, locale } = await params;
  const foodItemId = Number(itemId.split("-")[0]);
  const RestaurantId = Number(restaurantId.split("-")[0]);
  const t = await getTranslations({ locale, namespace: "toast" });
  const data = await getFoodItemsDetails({
    id: foodItemId,
    restaurantId: RestaurantId,
  });
  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-100 aspect-square">
          <ErrorComponent
            label={t("common.failed")}
            btnTxt={t("common.tryAgain")}
            whiteBg
            refreshBtn
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <OrderItem itemData={data} restaurantName={restaurantId.split("-")[1]} />
    </div>
  );
};

export default page;

"use client";

import { useRestaurantFoodItems } from "@/src/query/useRestaurantFoodItems";
import FoodBox from "@/src/Components/ServiceComponent/order/FoodBox";
import FoodBoxLoading from "@/src/Components/ServiceComponent/order/FoodBoxLoading";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";
import { useTranslations } from "next-intl";

interface Props {
  restaurantId: number;
  RestaurantID?: number;
  cartItems?: {
    id: number;
    quantity: number;
    itemId: number;
  }[];
}

const FoodItems = ({ restaurantId, RestaurantID, cartItems }: Props) => {
  const { data, isLoading, isError } = useRestaurantFoodItems(restaurantId);
  const t = useTranslations("toast");
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 h-full p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <FoodBoxLoading key={index + 1} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-90 h-90 md:w-160 md:h-170  ml-auto mr-auto">
        <ErrorComponent
          label={t("common.failed")}
          btnTxt={t("common.tryAgain")}
          whiteBg
          refreshBtn
        />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2 lg:pt-10 h-full p-2">
      {data?.message?.map((item: any) => (
        <FoodBox
          key={item.id}
          itemsData={item}
          presentRestaurantId={restaurantId}
          RestaurantID={RestaurantID}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
};

export default FoodItems;

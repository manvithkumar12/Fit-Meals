"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PlainRatingComponent } from "../../HealthRating/Rating";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { updateItem } from "@/src/Apiservices/api/cart/update";
import { addToCart } from "@/app/api/actions/cart/addToCart";
import { useUser } from "@/src/context/UserContext";
import CartPopup from "../../PopUp/CartPopup";
import { useTranslations } from "next-intl";

interface FoodProps {
  cartItems:
  | {
    id: number;
    quantity: number;
    itemId: number;
  }[]
  | undefined;
  itemsData: {
    id: number;
    title: string;
    price: number;
    weight: number;
    time: number;
    description: string[];
    proteinPer100gm: number;
    carboHydratePer100gm: number;
    caloriesPer100gm: number;
    fatsPer100gm: number;
    averageRating: number;
    restaurantId: number;
    type: string;
    category: string;
    foodBenefits: string[];
    imgUrl: string;
  };
  RestaurantID: number | undefined;
  presentRestaurantId: number | undefined;
}

const FoodBox = ({
  itemsData,
  RestaurantID,
  cartItems,
  presentRestaurantId,
}: FoodProps) => {
  const user = useUser();
  const checkStatus = (id: number | undefined) => {
    if (!id) {
      return true;
    }
    const restaurant = presentRestaurantId;
    if (restaurant && restaurant !== id) {
      setSelected(false);
      setPopup(true);
      return false;
    }
    const qty = cartItems?.find(
      (item) => item.itemId === itemsData.id,
    )?.quantity;
    SetItems(qty ?? 1);
    return true;
  };
  const handleSubmit = async () => {
    try {
      setSelected(true);
      setLoading(true);
      const res = await addToCart(presentRestaurantId, itemsData.id, user?.id);
      SetItems(1);
      if (res.state === "Conflict") {
        setPopup(true);
        setSelected(false);
      } else if (res.state === "Success") {
        setCartItemId(res.cartItemId);
      }
    } catch (error: any) {
      setSelected(false);
      toast.error(error?.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };
  const NavigateTo = () => {
    router.push(`${pathname}/${itemsData.id}-${itemsData.title}`);
  };
  const IncreaseValue = (value: number | undefined) => {
    if (value === undefined) {
      return 1;
    }
    if (value >= 1) {
      return value + 1;
    }
    return value;
  };
  const DecreaseValue = (value: number | undefined) => {
    if (value === undefined) {
      return 1;
    }
    if (value <= 1) {
      setSelected(false);
      return 0;
    }
    return value - 1;
  };
  const debouncedUpdate = (cartId: number | undefined, newQuantity: number) => {
    if (!cartId) {
      return null;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      updateItem(cartId, newQuantity);
    }, 400);
  };
  const debounceRef = useRef<NodeJS.Timeout>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const existingCartItem = cartItems?.find(
    (item) => item.itemId === itemsData.id,
  );

  const t = useTranslations("Cart");
  const [selected, setSelected] = useState(false);
  const [items, SetItems] = useState<number>(1);
  const [cartItemId, setCartItemId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (existingCartItem) {
      setSelected(true);
      SetItems(existingCartItem.quantity);
      setCartItemId(existingCartItem.id);
    }
  }, [existingCartItem]);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="w-full h-45  bg-white border border-gray-200  shadow-xl hover:shadow-2xl items-center rounded-lg pl-2 py-2 pr-2 flex">
      {popup && (
        <CartPopup
          setPopUp={setPopup}
          formData={{
            restaurantId: presentRestaurantId!,
            userId: user?.id!,
            itemId: itemsData.id,
          }}
        />
      )}
      <div>
        <div className="w-20 h-20 md:w-30 md:h-30 lg:w-35 relative rounded-md">
          <Image
            src={itemsData.imgUrl}
            alt="food-item"
            fill
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, 140px"
            onClick={() => NavigateTo()}
            loading="lazy"
            blurDataURL="/blur.jpeg"
            placeholder="blur"
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col w-[90%] ml-5 lg:ml-3 lg:mt-3 overflow-hidden">
        <div className="flex items-center gap-2">
          {(itemsData.type?.toUpperCase() === "VEGETARIAN" ||
            itemsData.type?.toUpperCase() === "NON_VEGETARIAN") && (
              <div
                className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[3px] shrink-0 bg-white ${itemsData.type?.toUpperCase() === "VEGETARIAN"
                  ? "border-green-600"
                  : "border-red-600"
                  }`}
                title={
                  itemsData.type?.toUpperCase() === "VEGETARIAN"
                    ? "Vegetarian"
                    : "Non-Vegetarian"
                }
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${itemsData.type?.toUpperCase() === "VEGETARIAN"
                    ? "bg-green-600"
                    : "bg-red-600"
                    }`}
                />
              </div>
            )}
          <h1 className="text-sm md:text-lg font-semibold">{itemsData.title}</h1>
        </div>
        <h3 className="text-[12px] md:text-[14px] w-[95%] truncate ">
          {itemsData.description[0]}
        </h3>
        <PlainRatingComponent
          display="none"
          RatingValue={itemsData.averageRating}
        />
        <div className="flex w-full">
          <div className="flex-col text-xs md:text-lg flex w-full">
            <div className="md:text-[13px] text-xs md:text-base whitespace-nowrap xl:text-[14px]">
              {t("macros.protein")} :{" "}
              <span className="font-semibold">
                {" "}
                {itemsData.proteinPer100gm} g{" "}
              </span>
              <span className="font-bold text-xs md:text-base">•</span> {t("macros.calories")} :
              <span className="font-semibold">
                {itemsData.caloriesPer100gm} kcal{" "}
              </span>
            </div>
            <div className="md:text-[13px]  text-xs md:text-base whitespace-nowrap lg:text-[14px]">
              {t("macros.carbohydrates")} :{" "}
              <span className="font-semibold">
                {" "}
                {itemsData.carboHydratePer100gm} g{" "}
              </span>
              <span className="font-bold">•</span> {t("macros.fats")} :{" "}
              <span className="font-semibold">
                {" "}
                {itemsData.fatsPer100gm} g{" "}
              </span>
            </div>
            <div className="flex w-full gap-2 items-center">
              <button
                onClick={() => NavigateTo()}
                className="ml-auto bg-green-500 px-2 mt-1.5 text-sm  p-1 md:p-2 rounded-md text-white font-semibold"
              >
                {t("conflict.view")}
              </button>
              {selected ? (
                <div className="flex mt-auto md:mt-1.5">
                  <button
                    className="w-10 border border-black/20 h-8 md:h-10 font-semibold text-xl bg-white rounded-tl-md rounded-bl-md"
                    onClick={() => {
                      SetItems((prev) => {
                        const value = IncreaseValue(prev);
                        debouncedUpdate(
                          cartItemId ?? existingCartItem?.id,
                          value,
                        );
                        return value;
                      });
                    }}
                  >
                    +
                  </button>
                  <button className="w-10 border border-black/20 h-8 md:h-10 bg-white">
                    {items}
                  </button>
                  <button
                    className="w-10 border border-black/20 h-8 flex justify-center items-center md:h-10 font-semibold text-3xl bg-white rounded-tr-md rounded-br-md"
                    onClick={() => {
                      SetItems((prev) => {
                        const value = DecreaseValue(prev);
                        debouncedUpdate(
                          cartItemId ?? existingCartItem?.id,
                          value,
                        );
                        return value;
                      });
                    }}
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  className={`cursor-pointer  mt-1.5 rounded-md h-8 md:h-10
                  bg-white font-semibold text-green-600 shadow-lg active:shadow active:bg-green-400 active:text-white border border-gray-200 w-20 lg:w-25 xl:w-30 p-1  text-[12px] lg:text-[14px] ${loading ? "opacity-30 cursor-not-allowed" : ""}`}
                  onClick={async () => {
                    const allowed = checkStatus(RestaurantID);
                    if (allowed) {
                      await handleSubmit();
                    }
                  }}
                >
                  {t("CartPage.add_to_cart")}
                </button>
              )}
              <div className=" bg-green-100 mt-2 p-2 text-[14px] rounded-md whitespace-nowrap">
                <span className="font-bold">€{itemsData.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FoodBox);

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";
import { updateItem } from "@/src/Apiservices/api/cart/update";
import { removeCartItem } from "@/app/api/actions/cart/removeItem";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/src/context/UserContext";

interface Data {
  cartId: number;
  imgUrl: any;
  name: string;
  amount: number;
  restaurantId: number;
  restaurantName: string;
  itemId: number;
  itemName: string;
  quantity: number;
}

const DecreaseValue = (value: number) => {
  if (value <= 1) return 1;
  return value - 1;
};

const CartCard = ({
  imgUrl,
  name,
  amount,
  restaurantName,
  restaurantId,
  itemId,
  itemName,
  cartId,
  quantity,
}: Data) => {
  const queryClient = useQueryClient();

  const user = useUser();

  const handleisdeleted = async (itemId: number) => {
    try {
      setIsDeleted(true);

      // optimistic remove
      queryClient.setQueryData(
        ["cartItems", user?.id],
        (old: any[]) => old?.filter((item) => item.id !== itemId) ?? [],
      );

      await removeCartItem(itemId);

      queryClient.invalidateQueries({
        queryKey: ["cartItems", user?.id],
      });
    } catch {
      setIsDeleted(false);
      toast.error("Unable to remove item");
    }
  };

  const IncreaseValue = (value: number) => {
    return value + 1;
  };

  const t = useTranslations("Cart");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [isdeleted, setIsDeleted] = useState(false);

  const [items, setItems] = useState(quantity);

  useEffect(() => {
    setItems(quantity);
  }, [quantity]);

  const debouncedUpdate = (newQuantity: number) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateItem(cartId, newQuantity);
    }, 400);
  };

  return (
    <div
      className={`w-full flex items-center border-b border-black/10 py-2 gap-3 md:gap-4 ${
        isdeleted ? "hidden" : ""
      }`}
    >
      <Link
        href={`/services/order/${restaurantId}-${restaurantName}/${itemId}-${itemName}`}
        className="shrink-0"
      >
        <div className="h-20 w-24 md:h-24 md:w-32 relative rounded-md overflow-hidden cursor-pointer shadow-sm">
          <Image
            src={imgUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 96px, 128px"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 min-w-0">
        <h2 className="font-semibold text-base md:text-lg text-gray-800 truncate" title={name}>
          {name}
        </h2>
        <h2 className="font-medium text-sm md:text-base text-gray-600 mt-1">
          ${(amount * items).toFixed(2)}
        </h2>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0 gap-2 md:gap-3">
        <div className="w-24 md:w-32 border border-black/20 h-8 md:h-10 flex rounded-md overflow-hidden bg-white shadow-sm">
          <button
            className="flex-1 border-r border-black/20 flex justify-center items-center text-lg md:text-xl font-medium cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
            onClick={() => {
              setItems((prev) => {
                const newValue = IncreaseValue(prev);

                debouncedUpdate(newValue);

                queryClient.setQueryData(
                  ["cartItems", user?.id],
                  (old: any[]) =>
                    old?.map((c) =>
                      c.id === cartId
                        ? {
                            ...c,
                            quantity: newValue,
                          }
                        : c,
                    ) ?? [],
                );

                return newValue;
              });
            }}
          >
            +
          </button>

          <div className="flex-1 border-r border-black/20 flex justify-center items-center text-sm md:text-base font-semibold">
            {items}
          </div>

          <button
            className="flex-1 flex justify-center items-center text-lg md:text-xl font-medium cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
            onClick={() => {
              const newValue = DecreaseValue(items);

              setItems(newValue);

              debouncedUpdate(newValue);

              queryClient.setQueryData(
                ["cartItems", user?.id],
                (old: any[]) =>
                  old?.map((c) =>
                    c.id === cartId
                      ? {
                          ...c,
                          quantity: newValue,
                        }
                      : c,
                  ) ?? [],
              );
            }}
          >
            -
          </button>
        </div>

        <button
          onClick={() => {
            handleisdeleted(cartId);
          }}
          className="font-medium cursor-pointer text-xs md:text-sm text-red-500 hover:text-red-600 transition-colors mt-1"
        >
          {t("CartPage.Removebtn")}
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartCard);

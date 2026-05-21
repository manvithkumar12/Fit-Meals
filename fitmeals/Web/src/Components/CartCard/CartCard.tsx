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
      className={`w-full h-max flex border-b border-black/20 p-2 ${
        isdeleted ? "hidden" : ""
      } `}
    >
      <Link
        href={`/services/order/${restaurantId}-${restaurantName}/${itemId}-${itemName}`}
      >
        <div className="h-20 w-25 relative rounded-md overflow-hidden cursor-pointer">
          <Image
            src={imgUrl}
            alt={name}
            fill
            sizes="100px"
            className="object-cover rounded-md overflow-hidden"
          />
        </div>
      </Link>

      <div className="flex flex-col p-2.5">
        <h2 className="font-semibold md:w-40 truncate md:text-lg">{name}</h2>

        <h2 className="font-semibold">${(amount * items).toFixed(2)}</h2>
      </div>

      <div className="ml-auto flex mt-5 md:mt-0 flex-col">
        <div className="w-20 md:w-35 border border-black/20 h-6 md:h-10 flex">
          <button
            className="w-16 border-r border-black/20 flex justify-center items-center text-sm md:text-xl font-semibold cursor-pointer"
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

          <div className="w-17.5 border-r border-black/20 flex justify-center items-center text-sm md:text-lg font-semibold">
            {items}
          </div>

          {/* DECREASE */}
          <button
            className="w-16 flex justify-center items-center text-sm md:text-3xl font-semibold cursor-pointer"
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
          className="ml-auto mt-auto mb-1 font-semibold cursor-pointer text-sm md:text-lg text-black/60"
        >
          {t("CartPage.Removebtn")}
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartCard);

"use client";
import React, { useContext } from "react";
import CartCard from "./CartCard";
import ErrorComponent from "../errorComponent/ErrorComponent";
import { cartContext } from "@/src/context/cartContext";
import CartCardLoading from "./CartCardLoading";
import { useTranslations } from "next-intl";

const CartGroup = () => {
  const context = useContext(cartContext);
  const cartItems = context?.cartItems ?? [];
  const loading = context?.loadingstate ?? false;
  const t = useTranslations("Cart");

  return (
    <div className="scrollbar w-[90%] h-120 bg-white rounded-md min-h-40 border border-black/20 min-w-[90%] flex flex-col overflow-y-scroll p-2 scrollbar-hide">
      {loading && <CartCardLoading />}
      {cartItems.length === 0 && !loading && (
        <div className="w-[90%] m-auto h-full">
          <ErrorComponent
            whiteBg
            label={t("CartPage.emptyCart")}
            btnTxt={t("CartPage.addItems")}
            navUrl={"/services/order/1"}
          />
        </div>
      )}
      {cartItems.map((item) => (
        <CartCard
          cartId={item.id}
          key={item.id}
          imgUrl={item.item.imgUrl}
          name={item.item.title}
          amount={item.item.price}
          restaurantId={item.item.restaurantId}
          restaurantName={item.item.restaurant.name}
          itemId={item.item.id}
          itemName={item.item.title}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};

export default CartGroup;

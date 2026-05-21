"use client";
import React from "react";
import CartGroup from "./CartGroup";
import CheckoutCard from "./CheckoutCard";
import { useUser } from "@/src/context/UserContext";
import { CartContextProvider } from "@/src/context/cartContext";
import { useTranslations } from "next-intl";
import { useCartCoords } from "@/src/query/useCartCoords";
import { usePriceData } from "@/src/query/usePriceData";
import { useCartItems } from "@/src/query/useCart";
import Link from "next/link";
import ErrorComponent from "../errorComponent/ErrorComponent";
import CartCardLoading from "./CartCardLoading";

const CartPage = () => {
  const t = useTranslations("Cart");
  const tc = useTranslations();
  const user = useUser();

  const userId = user?.id ?? null;

  const cartRes = useCartItems(userId);
  const coordsRes = useCartCoords(userId);
  const priceRes = usePriceData(userId);

  const data = cartRes.data;
  const isLoading = cartRes.isLoading;
  const isError = cartRes.isError;
  return (
    <CartContextProvider
      data={data ?? []}
      coords={coordsRes.data as any}
      loading={isLoading}
    >
      <div className="xl:w-[45%] lg:w-[55%] h-max lg:p-5 justify-center w-full">
        <div className="lg:ml-10 md:ml-5 ml-3 flex flex-col justify-center gap-1 w-[95%]">
          <div className="flex gap-1 items-center">
            <i className="fa-solid fa-house ml-1 opacity-50"></i>

            <Link href="/">
              <h4 className="font-semibold opacity-50 cursor-pointer">
                {tc("navbar.home")}
              </h4>
            </Link>

            <h4 className="font-semibold opacity-50">/</h4>

            <h4 className="font-semibold opacity-50 cursor-pointer">
              {t("CartPage.title")}
            </h4>
          </div>

          <h1 className="font-semibold text-5xl">{t("CartPage.title")}</h1>

          <h1 className="text-lg ml-2">{t("CartPage.sub-title")}</h1>

          <div className="mt-7 w-full flex justify-center lg:justify-start">
            <div className="mt-7 w-full flex justify-center lg:justify-start">
              {isLoading ? (
                <div className="mt-7 w-full flex justify-center lg:justify-start">
                  <div className="scrollbar w-max h-120 bg-white rounded-md min-h-40 border border-black/20 min-w-[90%] flex flex-col overflow-y-scroll p-2 scrollbar-hide">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <CartCardLoading key={index + 1} />
                    ))}
                  </div>
                </div>
              ) : isError ? (
                <div className="h-120 w-[75%] flex bg-white rounded-md border border-gray-300">
                  <ErrorComponent
                    whiteBg
                    btnTxt={t("CartPage.tryAgain")}
                    label={t("CartPage.errorCart")}
                    navUrl={"/cart"}
                  />
                </div>
              ) : (
                <CartGroup />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[40%] mt-5 w-full flex justify-center items-center h-max">
        <CheckoutCard
          SubTotal={priceRes.data?.SubPrice ?? 0}
          Total={priceRes.data?.NumTotalPrice ?? 0}
          DeliveryFee={priceRes.data?.DeliveryFee ?? 0}
          Discount={priceRes.data?.discountAmount ?? 0}
          DeliveryTime={priceRes.data?.estimatedTimeMinutes ?? 0}
          SubscriptionPlan={user?.subscriptionType ?? "unknown"}
          DeliveryType={"Free Delivery"}
        />
      </div>
    </CartContextProvider>
  );
};

export default CartPage;

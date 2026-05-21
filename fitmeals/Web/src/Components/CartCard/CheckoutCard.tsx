"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "@/src/Components/LocalizedLink";
import { isVoucher } from "@/app/api/actions/cart/voucherApply";
import { useUser } from "@/src/context/UserContext";
import { cartContext } from "@/src/context/cartContext";
import {
  getDiscountValue,
  getVoucherValue,
} from "@/app/api/actions/cart/TotalPrice";
import { toast } from "react-toastify";
import { createOrder } from "@/app/api/actions/orders/createOrder";
import { PlainPopUp } from "../PopUp/Popup";
import AddressBlock from "./AddressBlock";
interface Data {
  SubTotal: number;
  Total: number;
  DeliveryFee: number;
  Discount: number;
  DeliveryTime: number;
  SubscriptionPlan: string;
  DeliveryType: string;
}

const CheckoutCard = ({
  SubTotal,
  Total,
  DeliveryFee,
  DeliveryTime,
  DeliveryType,
  SubscriptionPlan,
  Discount,
}: Data) => {
  const user = useUser();
  const voucherVerify = async (userId: number | undefined, voucher: string) => {
    if (!userId) {
      return setErrMessage("userId is required");
    }
    setLoading(true);
    const res = await isVoucher(voucher, userId, subTotal);
    setLoading(false);
    if (res.state === "Failed") {
      setErrMessage(res.message);
      setSuccess("");
    } else {
      setSuccess(res.message);
      setErrMessage("");
      handleVoucherChange(voucher);
      setVoucherState(true);
    }
  };
  const handleVoucherChange = async (value: string) => {
    const amount = await getDiscountValue(value);
    if (amount && setDiscount) {
      setDiscount(amount.discount ?? 0);
    }
  };
  useEffect(() => {
    const getValue = async () => {
      if (!user?.id) return null;
      const value = await getVoucherValue(user?.id);
      setVoucher(value ?? "");
    };
    getValue();
  }, [user?.id]);
  const handleCheckout = async () => {
    if (cartItemLength === 0) {
      toast.error("Please add items to cart");
    } else {
      try {
        setPaymentLoading(true);
        if (!user?.id) {
          toast.error("An error occured please login again");
          return null;
        }
        await createOrder(user?.id, "CASH");
        const res = await fetch("/api/payments/cart", {
          method: "POST",
        });
        const data = await res.json();
        if (!data?.url) {
          toast.error("Unable to start payment");
          return;
        }
        globalThis.location.href = data.url;
      } catch (error) {
        toast.error("An error occured");
      } finally {
        setPaymentLoading(false);
      }
    }
  };
  const context = useContext(cartContext);
  const subTotal = context?.subTotal ?? 0;
  const cartItemLength = context?.cartItems?.length ?? 0;
  const totalPrice = context?.totalPrice ?? 0;
  const deliveryFee = context?.deliveryFee ?? DeliveryFee;
  const estTime = context?.estimatedTimeMinutes;
  const userAddress = context?.useraddress;
  const discount = context?.discount ?? Discount;
  const cityName = context?.cityName;
  const discountAmount = (subTotal * discount) / 100;
  const setDiscount = context?.setDiscount;
  const t = useTranslations("Cart");
  const [paymentloading, setPaymentLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [errmessage, setErrMessage] = useState("");
  const [voucherstate, setVoucherState] = useState(false);
  const [success, setSuccess] = useState("");
  const [addressblock, setAddressBlock] = useState(false);
  return (
    <div className="h-150 lg:h-max xl:w-[60%]  bg-white flex lg:w-[80%] w-[90%] p-5 rounded-md border border-black/20">
      <div className="w-full gap-3">
        <div className="gap-1 flex flex-col border-b border-black/40 pb-2 ">
          <h1 className="font-semibold text-xl">
            {t("CartPage.selectAddress")}
          </h1>
          <button
            onClick={() => {
              setAddressBlock(true);
            }}
            className="bg-green-600 h-9 flex justify-center items-center gap-2 cursor-pointer font-semibold text-white rounded-md"
          >
            {t("CartPage.changeAddress")}
            <i className="fa-solid mt-1 text-md fa-angle-down"></i>
          </button>
          {addressblock && (
            <PlainPopUp setPopUp={setAddressBlock}>
              <AddressBlock userId={user?.id} setpopUp={setAddressBlock} />
            </PlainPopUp>
          )}
          <div className="flex  items-center">
            <h2 className="font-semibold m-1">{t("CartPage.deliveringTo")} </h2>
            <h2 className="ml-auto">
              {cityName || t("CartPage.pleaseSelectAddress")}
            </h2>
          </div>
        </div>
        <h1 className="font-semibold text-xl">{t("CartPage.OrderSummary")}</h1>
        <div className="gap-3 flex flex-col mt-4 border-b border-black/40 pb-2 ">
          <div className="flex w-full font-semibold">
            <h2>{t("CartPage.Sub-Total")}</h2>
            <h2 className="ml-auto">{subTotal.toFixed(2)}</h2>
          </div>
          <div className="flex w-full font-semibold">
            <h2>{t("CartPage.Delivery Fee")}</h2>
            <h2 className="ml-auto">${deliveryFee.toFixed(2)}</h2>
          </div>
          <div className="flex w-full font-semibold">
            <h2>{t("CartPage.Discount")}</h2>
            <h2 className="ml-auto text-red-500">
              -${discountAmount.toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="flex w-full font-semibold mt-2">
          <h1 className="text-xl">{t("CartPage.Total")}</h1>
          <h2 className="ml-auto text-lg">${totalPrice.toFixed(2)}</h2>
        </div>
        <div className="w-full flex flex-col gap-2  mt-5 justify-center items-center">
          <div className="w-full flex gap-2">
            <input
              type="text"
              value={voucher}
              onChange={(e) => {
                setVoucher(e.target.value);
              }}
              className="w-[80%] h-10 p-2 border border-gray-200 outline-none rounded-md"
            />
            <button
              disabled={loading || voucherstate}
              onClick={async () => {
                voucherVerify(user?.id, voucher);
              }}
              className={`bg-green-600 font-semibold text-white pr-2 pl-2 h-10 hover:shadow-lg rounded-md ${loading || voucherstate ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {loading
                ? t("CartPage.applying")
                : voucherstate
                  ? t("CartPage.applied")
                  : t("CartPage.apply")}
            </button>
            <button
              className={`bg-red-400 shadow-lg rounded-md p-2 font-semibold text-white ${voucherstate ? "cursor-pointer" : "opacity-30 cursor-not-allowed"}`}
              onClick={() => {
                setVoucherState(false);
                setDiscount?.(0);
              }}
            >
              {t("CartPage.remove")}
            </button>
          </div>
          {success && (
            <div className="w-full border-dashed flex justify-center items-center border-2 rounded-sm border-green-600 h-10">
              {success}
            </div>
          )}
          {errmessage && (
            <div className="w-full border-dashed flex justify-center rounded-sm items-center border-2 border-red-400 h-10">
              {errmessage}
            </div>
          )}
          <button
            disabled={paymentloading}
            className={`w-[98%] h-10 hover:shadow-lg  rounded-md flex justify-center items-center gap-4 text-white font-semibold bg-green-600 ${paymentloading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"} `}
            onClick={() => {
              if (!userAddress) {
                toast.error(t("CartPage.selectAddressToast"));
                return;
              }
              handleCheckout();
            }}
          >
            {t("CartPage.checkout")}{" "}
            {paymentloading ? (
              <i className="fa-solid animate-spin fa-spinner"></i>
            ) : (
              ""
            )}
          </button>
          <Link
            href="/services/order"
            className="w-[98%] h-10 rounded-md cursor-pointer text-green-700 font-semibold"
          >
            <button className="w-full h-10 hover:shadow-lg rounded-md cursor-pointer border-2 border-green-600 text-green-700 font-semibold">
              {t("CartPage.continueShopping")}
            </button>
          </Link>
        </div>
        <div className="bg-[#F8F7F7] w-full rounded-md mt-5">
          <div className="flex gap-3 p-2 items-center">
            <div className="w-7 h-7 relative">
              <Image
                alt="Delivery"
                src="https://img.icons8.com/ios-glyphs/30/delivery-scooter.png"
                fill
                sizes="28px"
                className="object-contain"
                placeholder="blur"
                blurDataURL="/blur.jpeg"
              />
            </div>
            <div className="font-semibold">
              <h2>{t("CartPage.EstimatedDelivery")}</h2>
              <h2>{estTime}min</h2>
            </div>
          </div>
          <div className="flex gap-3 p-2 items-center">
            <div className="w-10 h-10 relative">
              <Image
                alt="Delivery"
                src="https://img.icons8.com/plasticine/100/crown.png"
                fill
                sizes="40px"
                className="object-contain"
                placeholder="blur"
                blurDataURL="/blur.jpeg"
              />
            </div>
            <div className="font-semibold">
              <h2>{SubscriptionPlan}</h2>
              <h2>{DeliveryType}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;

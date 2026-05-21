"use client";

import React, { createContext, useMemo, useState, useEffect } from "react";
import { getDistanceKm } from "../utils/getDistance";

interface CartItemType {
  id: number;
  itemId: number;
  quantity: number;

  item: {
    id: number;
    title: string;
    price: number;
    isAvailable: boolean;
    restaurantId: number;
    imgUrl: string | null;

    restaurant: {
      name: string;
    };
  };
}

interface Cartdata {
  data: CartItemType[];
  children?: React.ReactNode;
  loading?: boolean;
  coords?: {
    address?: { lat: number; long: number };
    restaurants?: { lat: number; long: number };
  };
}

export type CheckoutCard = {
  cartItems: CartItemType[];

  discount: number;

  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  loadingstate: boolean;

  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;

  totalItems: number;

  subTotal: number;

  useraddress: { lat: number; long: number } | null;

  setUserAddress: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      long: number;
    } | null>
  >;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
  cityName: string;
  totalPrice: number;

  deliveryFee: number;

  estimatedTimeMinutes: number;
};

export const cartContext = createContext<CheckoutCard | null>(null);

export const CartContextProvider = ({
  data,
  children,
  coords,
  loading,
}: Cartdata) => {
  const [loadingstate, setLoadingState] = useState(loading ?? false);

  useEffect(() => {
    setLoadingState(loading ?? false);
  }, [loading]);

  const cartItems = useMemo(() => data || [], [data]);
  const [cityName, setCityName] = useState("");
  const [discount, setDiscount] = useState<number>(0);

  const restaurantadd = coords?.restaurants ?? null;

  const [useraddress, setUserAddress] = useState<{
    lat: number;
    long: number;
  } | null>(null);

  useEffect(() => {
    if (coords?.address) {
      setUserAddress(coords.address);
    }
  }, [coords?.address]);

  const [distanceInKm, setDistanceInKm] = useState<number>(0);



  // Calculate distance
  useEffect(() => {
    if (useraddress && restaurantadd) {
      const result = getDistanceKm(
        useraddress.lat,
        useraddress.long,
        restaurantadd.lat,
        restaurantadd.long,
      );

      setDistanceInKm(result);
    } else {
      setDistanceInKm(0);
    }
  }, [useraddress, restaurantadd]);

  // Estimated delivery time
  const estimatedTimeMinutes = useMemo(() => {
    const averageSpeedKmPerHour = 30;

    return Math.ceil((distanceInKm / averageSpeedKmPerHour) * 60);
  }, [distanceInKm]);

  // Delivery fee
  const deliveryFee = useMemo(() => {
    const baseFee = 3;

    const perKmRate = 2;

    return Math.ceil(baseFee + distanceInKm * perKmRate);
  }, [distanceInKm]);

  // Total items
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Subtotal
  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  // Discount amount
  const discountAmount = useMemo(() => {
    return (subTotal * discount) / 100;
  }, [subTotal, discount]);

  const finalDeliveryFee = subTotal === 0 && totalItems === 0 ? 0 : deliveryFee;

  const finalEstimatedTime =
    subTotal === 0 && totalItems === 0 ? 0 : estimatedTimeMinutes;

  // Total price
  const totalPrice =
    subTotal === 0 && totalItems === 0
      ? 0
      : subTotal - discountAmount + finalDeliveryFee;

  const contextValue = useMemo(
    () => ({
      cartItems,
      setLoadingState,
      loadingstate,
      discount,
      useraddress,
      setDiscount,
      subTotal,
      totalPrice,
      deliveryFee: finalDeliveryFee,
      estimatedTimeMinutes: finalEstimatedTime,
      totalItems,
      setUserAddress,
      setCityName,
      cityName,
    }),
    [
      cartItems,
      loadingstate,
      discount,
      useraddress,
      subTotal,
      totalPrice,
      finalDeliveryFee,
      finalEstimatedTime,
      totalItems,
      cityName,
    ],
  );

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};

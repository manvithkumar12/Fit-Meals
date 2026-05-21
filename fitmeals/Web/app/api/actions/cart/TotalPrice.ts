"use server";
import { prisma } from "@/src/lib/prisma";
import { getDistanceKm } from "@/src/utils/getDistance";


export const isVoucherValid = async (id: number | null) => {
  if (!id) {
    return { state: "Failed", message: "Voucher not found" };
  }

  const currentDate = new Date();

  const voucher = await prisma.voucher.findUnique({
    where: { id },
    select: {
      isActive: true,
      validUntil: true,
      discount: true,
      minimumPrice: true,
    },
  });

  if (!voucher) {
    return { state: "Failed", message: "Voucher not found" };
  }

  if (!voucher.isActive) {
    return { state: "Failed", message: "Voucher is not active" };
  }

  if (currentDate > voucher.validUntil) {
    return { state: "Failed", message: "Voucher has expired" };
  }

  return {
    state: "Success",
    discount: voucher.discount,
    minimumPrice: voucher.minimumPrice,
  };
};

export const getTotal = async (userId: number | undefined) => {
  if (!userId) {
    return {
      SubPrice: 0,
      NumTotalPrice: 0,
      DeliveryFee: 0,
      discount: 0,
      discountAmount: 0,
      estimatedTimeMinutes: 0,
      distance: 0,
    };
  }

  const cartData = await prisma.cart.findUnique({
    where: { userId },
    select: {
      voucherId: true,

      address: {
        select: {
          lat: true,
          long: true,
        },
      },

      restaurants: {
        select: {
          lat: true,
          long: true,
        },
      },

      cartItems: {
        select: {
          quantity: true,

          item: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  const SubPrice =
    cartData?.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.item.price,
      0,
    ) ?? 0;

  // If cart empty
  if (SubPrice === 0) {
    return {
      SubPrice: 0,
      NumTotalPrice: 0,
      DeliveryFee: 0,
      discount: 0,
      discountAmount: 0,
      estimatedTimeMinutes: 0,
      distance: 0,
    };
  }

  // If address missing
  if (!cartData?.address || !cartData?.restaurants) {
    return {
      SubPrice,
      NumTotalPrice: SubPrice,
      DeliveryFee: 0,
      discount: 0,
      discountAmount: 0,
      estimatedTimeMinutes: 0,
      distance: 0,
    };
  }

  const distance = getDistanceKm(
    cartData.address.lat,
    cartData.address.long,
    cartData.restaurants.lat,
    cartData.restaurants.long,
  );

  // Delivery time
  const averageSpeedKmPerHour = 30;

  const estimatedTimeMinutes = Math.ceil(
    (distance / averageSpeedKmPerHour) * 60,
  );

  // Delivery fee
  const baseFee = 3;

  const perKmRate = 2;

  const DeliveryFee = Math.ceil(baseFee + distance * perKmRate);

  // Voucher
  const voucherResult = await isVoucherValid(cartData.voucherId);

  let discount = 0;

  if (
    voucherResult.state === "Success" &&
    SubPrice >= voucherResult.minimumPrice!
  ) {
    discount = voucherResult.discount!;
  } else if (cartData.voucherId) {
    await prisma.cart.update({
      where: { userId },
      data: {
        voucherId: null,
      },
    });
  }

  const discountAmount = (SubPrice * discount) / 100;

  const NumTotalPrice =
    Math.round((SubPrice - discountAmount + DeliveryFee) * 100) / 100;

  return {
    SubPrice,
    DeliveryFee,
    discount,
    discountAmount,
    NumTotalPrice,
    distance,
    estimatedTimeMinutes,
  };
};

export const getDiscountValue = async (value: string) => {
  return prisma.voucher.findUnique({
    where: { value },

    select: {
      discount: true,
    },
  });
};

export const getVoucherValue = async (userId: number) => {
  const value = await prisma.cart.findUnique({
    where: { userId },

    select: {
      voucher: {
        select: {
          value: true,
        },
      },
    },
  });

  return value?.voucher?.value ?? null;
};

export const deleteVoucher = async (userId: number) => {
  if (!userId) {
    return {
      state: "Failed",
      message: "userId is required",
    };
  }

  await prisma.cart.update({
    where: { userId },

    data: {
      voucherId: null,
    },
  });

  return {
    state: "Success",
    message: "Voucher removed",
  };
};

"use server";

import { prisma } from "@/src/lib/prisma";
import { isVoucherValid } from "./TotalPrice";

export const isVoucher = async (
  voucher: string,
  userId: number | undefined,
  totalAmount: number,
) => {
  voucher = voucher.trim();
  if (!userId) {
    return {
      message: "User id is invalid",
      state: "Failed",
    };
  }
  if (!voucher) {
    return {
      message: "enter a valid voucher",
      state: "Failed",
    };
  }
  const voucherId = await prisma.voucher.findUnique({
    where: {
      value: voucher,
    },
    select: {
      id: true,
      minimumPrice: true,
    },
  });
  if (!voucherId) {
    return { message: "Voucher not found", state: "Failed" };
  }
  if (totalAmount < voucherId?.minimumPrice) {
    return {
      message: `minimum amount is ${voucherId.minimumPrice}`,
      state: "Failed",
    };
  }
  const isValid = await isVoucherValid(voucherId?.id);
  if (isValid.state === "Failed") {
    return { message: "Voucher is not valid", state: "Failed" };
  }
  await prisma.cart.update({
    where: {
      userId,
    },
    data: {
      voucherId: voucherId?.id,
    },
  });
  return { message: "Voucher applied successfully" };
};

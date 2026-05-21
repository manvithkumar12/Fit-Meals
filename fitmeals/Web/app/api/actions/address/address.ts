"use server";

import { prisma } from "@/src/lib/prisma";

export const getAddress = async (userId: number) => {
  const addressList = await prisma.address.findMany({
    where: { userId, isDeleted: false },
    select: {
      id: true,
      name: true,
      pinCode: true,
      isDefault: true,
      lat: true,
      long: true,
      address: true,
    },
  });
  return addressList;
};

export const setCartaddress = async (userId: number, addressId: number) => {
  if (userId) {
    await prisma.cart.update({
      where: { userId },
      data: { addressId },
    });
  } else {
    return { message: "Please login first" };
  }
};

export const deleteAddress = async (id: number) => {
  try {
    await prisma.address.update({
      where: { id },
      data: { isDeleted: true },
    });
    return { success: true };
  } catch (error) {
    console.log("Error in deleteAddress: ", error);
    return { success: false, message: "Address not found or in use" };
  }
};

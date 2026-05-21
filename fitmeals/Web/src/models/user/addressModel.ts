import { prisma } from "@/src/lib/prisma";
import { addressDB } from "@/src/types/modelTypes/user/address.types";

export const addAddress = async (address: addressDB) => {
  if (address.id) {
    return await prisma.address.update({
      where: { id: address.id },

      data: {
        name: address.name,
        street: address.street,
        area: address.area,
        city: address.city,
        isDefault: address.isDefault,
        state: address.state,
        pinCode: address.pinCode,
        lat: address.lat,
        long: address.long,
        userId: address.userId,
        address: address.address,
      },
    });
  }

  return await prisma.address.create({
    data: {
      name: address.name,
      street: address.street,
      isDefault: address.isDefault,
      area: address.area,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      lat: address.lat,
      long: address.long,
      userId: address.userId,
      address: address.address,
    },
  });
};

export const findAddressLimitAvailable = async (userId: number) => {
  const count = await prisma.address.count({
    where: { userId,isDeleted:false },
  });
  return count < 3;
};

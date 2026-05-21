"use server";

import { prisma } from "@/src/lib/prisma";

export interface RiderFormData {
  FullName: string;
  userId: number;
  age: number;
  ApplicationUrl: string;
  SelfieUrl: string;
  LicenseUrl: string;
  vehicle: string;
}
export const RiderForm = async (Data: RiderFormData) => {
  try {
    await prisma.deliveryPartner.create({
      data: {
        title: Data.FullName,
        UserId: Data.userId,
        age: Data.age,
        vehicle: Data.vehicle,
        SelfieUrl: Data.SelfieUrl,
        LicenseUrl: Data.LicenseUrl,
        ApplicationUrl: Data.ApplicationUrl,
        status: "VERIFICATION",
      },
    });
    return true;
  } catch (error) {
    throw new Error("Failed to submit application");
  }
};

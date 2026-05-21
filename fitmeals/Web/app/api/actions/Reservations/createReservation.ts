"use server";

import { prisma } from "@/src/lib/prisma";

export const createReservation = async (
  date: string,
  time: string,
  guest: number,
  restaurantId: number,
  user: {
    id: number;
    username: string;
    status: string;
    phoneNumber: string;
  },
) => {
  if (user.status !== "ACTIVE") {
    throw new Error("Your account is not active try again");
  }

  if (!date) {
    throw new Error("Please select a date");
  }

  if (!time) {
    throw new Error("Please select a time");
  }

  return await prisma.$transaction(
    async (tx) => {
      const reservations = await tx.reservations.findMany({
        where: {
          reservationDate: date,
          reservationTime: time,
          status: "CONFIRMED",
        },
      });

      const totalBooked = reservations.reduce(
        (sum, r) => sum + r.numberOfPeople,
        0,
      );

      const restaurant = await tx.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      if (totalBooked + guest > restaurant.totalPersons) {
        throw new Error("No availability");
      }

      const [day, month, year] = date.split("/");

      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      const convertTo24Hour = (time12h: string) => {
        const [timePart, modifier] = time12h.split(" ");

        let [hours, minutes] = timePart.split(":");

        if (hours === "12") {
          hours = "00";
        }

        if (modifier === "PM") {
          hours = String(Number.parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, "0")}:${minutes}`;
      };

      const time24 = convertTo24Hour(time);

      const start = new Date(`${formattedDate}T${time24}:00`);

      if (Number.isNaN(start.getTime())) {
        throw new TypeError("Invalid date/time format");
      }

      const endTime = new Date(start.getTime() + 90 * 60 * 1000);

      return await tx.reservations.create({
        data: {
          reservationDate: date,
          reservationTime: time,
          numberOfPeople: guest,
          status: "CONFIRMED",
          restaurantId: restaurantId,
          userId: user.id,
          customerName: user.username,
          customerNumber: user.phoneNumber,
          endTime: endTime,
        },
      });
    },
    {
      isolationLevel: "Serializable",
    },
  );
};

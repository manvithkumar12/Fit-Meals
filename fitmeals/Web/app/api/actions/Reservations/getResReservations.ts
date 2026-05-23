"use server"
import { prisma } from "@/src/lib/prisma"

export const getResReservations = async (restaurantId: number) => {
    try {
        const res = await prisma.reservations.findMany({
            where: { restaurantId: restaurantId },
            select: {
                id: true,
                reservationTime: true,
                numberOfPeople: true,
                customerName: true,
                reservationDate: true,
            }
        });
        return res;
    } catch (err) {
        console.log(err);
        throw new Error("unable to get data");
    }
}

"use server"

import { prisma } from "@/src/lib/prisma";
export const sendFeedback = async (message: string, userId: number) => {
    try {
        await prisma.feedBacks.create({
            data: {
                message,
                userId
            },
        });
        return true;
    } catch {
        return false;
    }
}

import { getReservationsById } from "@/app/api/actions/Reservations/getReservations";
import { toast } from "react-toastify";

export const getUserReservations = async (userId: number, pageNo: number) => {
  const res = await getReservationsById(userId, pageNo);

  if (!res) {
    toast.error("Unable to fetch data try again later");
  }

  return res;
};

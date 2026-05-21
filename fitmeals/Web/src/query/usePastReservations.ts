import { useQuery } from "@tanstack/react-query";
import { getUserReservations } from "../Apiservices/api/reservations/getReservationsById";

export const usePastReservations = (userId: number, pageNo: number) => {
  return useQuery({
    queryKey: ["pastReservations", userId, pageNo],
    queryFn: () => getUserReservations(userId, pageNo),
    enabled: !!userId,
  });
};

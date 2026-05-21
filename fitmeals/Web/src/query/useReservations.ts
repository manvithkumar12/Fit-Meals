import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../Apiservices/api/reservations/getReservations";
import { Coordinates } from "./useRestaurant";

export const useReservations = (
  pageNo: number,
  filters: Record<string, string[]>,
  cityName?: string,
  coords?: Coordinates | null,
) => {
  return useQuery({
    queryKey: ["reservations", pageNo, cityName, filters, coords],

    queryFn: () =>
      getReservations(pageNo, filters, cityName, coords ?? ({} as Coordinates)),

    enabled: !!cityName || (!!coords?.lat && !!coords?.long),

    refetchOnWindowFocus: false,
  });
};

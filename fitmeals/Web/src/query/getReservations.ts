import { getResResvertations } from "@/app/api/actions/Reservations/getResReservation";
import { useQuery } from "@tanstack/react-query";

export const useReservations = (restaurantId: number) => {
    return useQuery({
        queryKey: ["reservations", restaurantId],
        queryFn: () => getResReservation(restaurantId),
        refetchOnWindowFocus: false,
        refetchInterval: 3000,
        refetchIntervalInBackground: true,
        staleTime: 4000,
    });
}

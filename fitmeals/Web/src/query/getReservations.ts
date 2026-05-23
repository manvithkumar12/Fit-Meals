import { getResResvertations } from "@/app/api/actions/Reservations/getResReservations";
import { useQuery } from "@tanstack/react-query";

export const useReservations = (restaurantId: number) => {
    return useQuery({
        queryKey: ["reservations", restaurantId],
        queryFn: () => getResReservations(restaurantId),
        refetchOnWindowFocus: false,
        refetchInterval: 3000,
        refetchIntervalInBackground: true,
        staleTime: 4000,
    });
}

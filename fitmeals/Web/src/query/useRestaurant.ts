import { useQuery } from "@tanstack/react-query";
import { getRestaurantsData } from "../Apiservices/api/restaurant/getRestaurants";

export type Coordinates = {
  lat: number;
  long: number;
};

export const useRestaurants = (
  coords?: Coordinates | null,
  cityName?: string,
  page: number = 1,
  filters?: Record<string, string[]>,
) => {
  return useQuery({
    queryKey: [
      "restaurants",
      coords?.lat,
      coords?.long,
      cityName,
      page,
      JSON.stringify(filters),
    ],
    queryFn: () =>
      getRestaurantsData(
        coords ?? ({} as Coordinates),
        cityName,
        page,
        8,
        filters,
      ),

    enabled:
      (coords?.lat != null && coords?.long != null) ||
      (cityName != null && cityName.trim().length > 0),
  });
};

import { useQuery } from "@tanstack/react-query";

import {
  Restaurant,
  searchRestaurants,
} from "@/app/api/actions/orders/searchRes";

export const useRestaurantSearch = (
  searchTerm: string,
  reservation?: boolean,
) => {
  return useQuery<Restaurant[]>({
    queryKey: ["restaurant-search", searchTerm, reservation],

    queryFn: () => searchRestaurants(searchTerm, reservation),

    enabled: !!searchTerm,
  });
};

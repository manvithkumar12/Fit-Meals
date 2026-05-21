import { searchItems } from "@/app/api/actions/cookbook/searchItems";
import { useQuery } from "@tanstack/react-query";
export type CookbookDataProps = {
  id: number;
  title: string;
  calories: number;
  description: string[];
  imgUrl: string[];
  weight: number;
  time: number;
  nutritionalValue: number;
  proteinPer100gm: number;
  caloriesPer100gm: number;
  fatsPer100gm: number;
  carboHydratePer100gm: number;
  mainurl: string;
  foodType: string;
};
export const useCookbookSearch = (query: string) => {
  return useQuery<CookbookDataProps[]>({
    queryKey: ["cookbook-search", query],
    queryFn: async () => {
      const res = await searchItems(query);
      return res.data;
    },
    enabled: !!query,
  });
};

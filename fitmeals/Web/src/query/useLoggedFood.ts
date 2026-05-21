import { getLoggedFoods, LoggedDataType } from "@/app/api/actions/Tracker/ChangeLoggedFood";
import { useQuery } from "@tanstack/react-query";


export const useLoggedFoods = (targetId: number) => {
  return useQuery({
    queryKey: ["loggedFood", targetId],
    queryFn: () => getLoggedFoods(targetId),
    enabled: !!targetId,
    staleTime: 0,
  });
};

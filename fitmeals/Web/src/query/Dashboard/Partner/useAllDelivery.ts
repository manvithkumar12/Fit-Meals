import { getPartnerOrders } from "@/app/api/actions/Dashboard/DeliveryAgent/allPartnerOrders";
import { useQuery } from "@tanstack/react-query";

export const useAllDeliverys = (partnerId: number) => {
  return useQuery({
    queryFn: () => getPartnerOrders(partnerId),
    queryKey: ["AllDeliverys", partnerId],
    enabled: !!partnerId,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

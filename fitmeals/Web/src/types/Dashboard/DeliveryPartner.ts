import { getPartnerOrders } from "@/app/api/actions/Dashboard/DeliveryAgent/allPartnerOrders";

export type PartnerOrdersType = Awaited<ReturnType<typeof getPartnerOrders>>;

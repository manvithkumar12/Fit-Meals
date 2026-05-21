import { statusofOrder } from "@prisma/client";

type DeliveryStatusProps = {
  status:
    | "Waiting"
    | "Cooking"
    | "Packing"
    | "CANCELLED"
    | "InDelivery"
    | "Delivered";
};

const DeliveryStatus = ({ status }: DeliveryStatusProps) => {
  const statusColorMap: Record<DeliveryStatusProps["status"], string> = {
    Delivered: "bg-green-500",
    Waiting: "bg-yellow-300",
    Cooking: "bg-yellow-300",
    Packing: "bg-yellow-300",
    InDelivery: "bg-yellow-300",
    CANCELLED: "bg-red-500",
  };
  const statusColor = statusColorMap[status];
  return (
    <div className="flex gap-2 items-center">
      <div className={`rounded-full h-3 w-3 ${statusColor}`}></div>
      {status}
    </div>
  );
};

export default DeliveryStatus;

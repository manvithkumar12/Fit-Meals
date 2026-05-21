const OrderRow = ({
  orderId,
  date,
  amount,
}: {
  orderId: number;
  date: Date;
  amount: number;
}) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div>
      <p className="font-medium">#{orderId}</p>
      <p className="text-xs text-gray-500">{date.toLocaleDateString()}</p>
    </div>
    <p className="font-semibold text-green-700">€{amount}</p>
  </div>
);

export default OrderRow;

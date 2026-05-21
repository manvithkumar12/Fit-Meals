const Row = ({
  label,
  value,
  bold,
  green,
}: {
  label: number | string;
  value: number | string;
  bold?: boolean;
  green?: boolean;
}) => (
  <div
    className={`flex justify-between ${
      bold ? "font-semibold" : ""
    } ${green ? "text-green-700" : ""}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
export default Row;

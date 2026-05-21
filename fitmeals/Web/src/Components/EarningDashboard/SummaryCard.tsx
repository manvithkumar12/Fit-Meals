import React from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  note: string;
  nosymbol?: boolean;
}
const SummaryCard = ({ title, value, note, nosymbol }: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">
        {nosymbol ? value : `€${value}`}
      </p>
      <p className="text-xs text-gray-400 mt-1">{note}</p>
    </div>
  );
};

export default SummaryCard;

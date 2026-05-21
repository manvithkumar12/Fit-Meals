"use client";
import React from "react";

export const FiltersDropDown = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex md:hidden flex-col">
      <button
        className="flex md:hidden mt-2 ml-3 w-max p-1 pr-2 pl-2 bg-green-700 font-semibold items-center gap-1 text-white rounded-lg"
        onClick={toggleDropdown}
      >
        Filters<i className="fa-solid fa-caret-down"></i>
      </button>

    </div>
  );
};

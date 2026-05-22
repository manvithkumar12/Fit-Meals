"use client";
import React from "react";
import Link from "@/src/Components/LocalizedLink";
import { isSupportTeam } from "@/lib/userRole";
import { useUser } from "@/src/context/UserContext";
import { useTranslations } from "next-intl";

interface NavbarProps {
  NavType: "CookBook" | "order";
  itemsdata: {
    id: number;
    restaurantId: number;
    title: string;
    restaurant: string;
  };
}

const NavbarData = ({ itemsdata, NavType }: NavbarProps) => {
  const t = useTranslations("");
  
  const navData =
    NavType === "CookBook"
      ? {
          names: [t("navbar.home"), t("services.cookbook"), "Salads"],
          links: ["/", "/services/cookbook", "#"],
        }
      : NavType === "order"
        ? {
            names: [
              t("navbar.home"),
              t("services.orderNav"),
              decodeURIComponent(itemsdata.restaurant),
            ],
            links: [
              "/",
              "/services/order",
              `/services/order/1/${itemsdata.restaurantId}-${itemsdata.restaurant}`,
            ],
          }
        : {
            names: [""],
            links: [""],
          };
  const user = useUser();
  return (
    <div className="w-full h-15 border-b border-b-black/10 text-black/30 md:text-[16px] flex text-sm items-center ">
      <div className="flex items-center ml-2 md:ml-5 gap-2 w-[70%] ">
        {navData.names.map((name, index) => (
          <Link key={index + 1} href={navData.links[index]}>
            <h4 className="cursor-pointer font-semibold hover:text-black flex items-center gap-2">
              {name}
              <i className="fa-solid fa-greater-than"></i>
            </h4>
          </Link>
        ))}
        <h4 className="cursor-pointer font-semibold hover:text-black flex items-center gap-2">
          {decodeURIComponent(itemsdata.title)}
        </h4>
      </div>
      <div className="ml-auto mr-0 md:mr-10 flex items-center gap-2 md:gap-5">
        {isSupportTeam(user) && (
          <button className="p-2 bg-gray-200 h-10 w-10 rounded-full hover:text-white cursor-pointer  hover:bg-black ">
            <i className="fa-solid fa-pencil"></i>
          </button>
        )}
        <label
          className="ui-like p-2 bg-gray-200 rounded-full  hover:bg-black"
          aria-label="Add to favorites"
        >
          <input type="checkbox" />
          <div className="like drop-shadow-lg hover:drop-shadow-xl transition-shadow duration-300">
            <svg
              className="filter drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g strokeWidth={0} id="SVGRepo_bgCarrier" />{" "}
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
              </g>
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
};

export default NavbarData;

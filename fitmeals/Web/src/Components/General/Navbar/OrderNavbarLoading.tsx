"use client";
import React from "react";
import Link from "@/src/Components/LocalizedLink";
import { isSupportTeam } from "@/lib/userRole";
import { useUser } from "@/src/context/UserContext";

interface NavbarProps {
  NavType: "CookBook" | "order";
}

const MiniNavbarLoading = ({ NavType }: NavbarProps) => {
  const navData =
    NavType === "CookBook"
      ? {
          names: ["Home", "CookBook", "Salads"],
          links: ["/", "/services/cookbook", "#"],
        }
      : NavType === "order"
        ? {
            names: ["Home", "Order", "Loading"],
            links: ["/", "/services/order", "#"],
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
          <Link key={name} href={navData.links[index]}>
            <h4 className="cursor-pointer font-semibold hover:text-black flex items-center gap-2">
              {name}
              {index !== navData.names.length - 1 && (
                <i className="fa-solid fa-greater-than"></i>
              )}
            </h4>
          </Link>
        ))}
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
        <div>
          <button
            className={`cartBtn bg-gray-200 hover:bg-black active:bg-white shadow-lg `}
          >
            <svg
              className="cart drop-shadow-lg hover:drop-shadow-xl transition-shadow duration-300 text-xl "
              fill="white"
              viewBox="0 0 576 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <svg
              className="product"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 -960 960 960"
            >
              <path d="M160-80v-440H80v-240h208q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q23 0 43 8.5t37 23.5q17-16 37-24t43-8q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h208v240h-80v440H160Zm400-760q-17 0-28.5 11.5T520-800q0 17 11.5 28.5T560-760q17 0 28.5-11.5T600-800q0-17-11.5-28.5T560-840Zm-200 40q0 17 11.5 28.5T400-760q17 0 28.5-11.5T440-800q0-17-11.5-28.5T400-840q-17 0-28.5 11.5T360-800ZM160-680v80h280v-80H160Zm280 520v-360H240v360h200Zm80 0h200v-360H520v360Zm280-440v-80H520v80h280Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniNavbarLoading;

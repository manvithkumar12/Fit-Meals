"use client";
import React, { useState } from "react";
import Image from "next/image"; 
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/Components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "@/src/Components/LocalizedLink";
import { useHandleLogout } from "@/src/utils/handleLogout";
import PhoneNav from "./PhoneNav";
import { logedUser } from "@/src/types/logedUser.types";


interface DataProps {
  user?: logedUser | null;
}
const Navbar = ({ user }: DataProps) => {
  const [sidenav, setSideNav] = useState(false);
  const t = useTranslations();
  const handleLogout = useHandleLogout();
  const pathname = usePathname();
  const router = useRouter();
  const changeLocale = (locale: "en" | "de") => {
    const segments = pathname.split("/");

    segments[1] = locale;

    router.push(segments.join("/"));
  };
  return (
    <div className="w-screen bg-[#fbf8f2] text-xs whitespace-nowrap lg:text-[14px] xl:text-[16px]  flex items-center h-15 lg:h-17 p-3 text-black font-manrope sticky top-0 z-100">
      {sidenav && (
        <div
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSideNav(false)}
        />
      )}
      <div className="relative z-50 flex items-center w-full mr-2 ">
        <div className="flex items-center h-max md:w-6 lg:w-max p-1 gap-1 ">
          <Image
            src={"/Fitmeals-logo.png"}
            height={35}
            width={35}
            alt="logo"
            className="rounded-lg"
          />
          <h1 className="text-xl font-medium">FitMeals</h1>
        </div>
        {sidenav && (
          <PhoneNav user={user?.id} setSideNav={setSideNav} />
        )}
        <div className="flex ml-auto gap-4 justify-center items-center text-2xl mr-2 z-50 w-max lg:hidden">
          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] flex rounded-md cursor-pointer">
                <div className="flex justify-center items-center">
                  <i className="fa-solid fa-language text-lg"></i>
                  <i className="fa-solid fa-caret-down ml-1"></i>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2.5">
                <DropdownMenuItem onClick={() => changeLocale("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale("de")}>
                  Detusch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          {sidenav && (
            <i
              className="fa-solid fa-close ml-auto w-max"
              onClick={() => {
                setSideNav(false);
              }}
            ></i>
          )}
          {!sidenav && (
            <i
              aria-label="Open menu"
              aria-expanded={sidenav}
              className="fa-solid fa-bars ml-auto"
              onClick={() => {
                setSideNav(true);
              }}
            ></i>
          )}
        </div>
        <div className="xl:gap-10 ml-auto xl:ml-10 md:gap-4 lg:w-full lg:ml-7  lg:gap-6 mr-4 justify-center items-center hidden lg:flex">
          <Link href={`/`}>
            <h3 className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
              {t("navbar.home")}
            </h3>
          </Link>
          <Link href={`/about`}>
            <h3 className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
              {t("navbar.about")}
            </h3>
          </Link>

          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
                {t("navbar.services")}
                <i className="fa-solid fa-caret-down ml-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/services/order/1`}>
                  <DropdownMenuItem>{t("services.order")}</DropdownMenuItem>
                </Link>
                <Link href={`/services/cookbook/1`}>
                  <DropdownMenuItem>
                    {t("services.cookbook")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/services/reservation/1`}>
                  <DropdownMenuItem>{t("services.dine")}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
                {t("navbar.Health")}
                <i className="fa-solid fa-caret-down ml-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/health/fit-tracker`}>
                  <DropdownMenuItem>
                    {t("Health.FitnessTracker")}
                  </DropdownMenuItem>
                </Link>
                <Link href={`/health/diet/daily-plan`}>
                  <DropdownMenuItem>{t("Health.dietplan")}</DropdownMenuItem>
                </Link>
                <Link href={`/health/food-details`}>
                  <DropdownMenuItem>
                    {t("Health.identifyMeals")}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
                {t("navbar.contact")}
                <i className="fa-solid fa-caret-down ml-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    (globalThis.location.href = "mailto:support@fitmeals.com")
                  }
                >
                  {t("contact.email")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="tel:+7993625522">{t("contact.phone")}</a>
                </DropdownMenuItem>
                <Link href={`/contact/query`}>
                  <DropdownMenuItem>
                    {t("contact.raisequery")}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>

          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-[#e6ede6] rounded-md cursor-pointer">
                {t("navbar.profile")}
                <i className="fa-solid fa-caret-down ml-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={"/profile"}>
                  <DropdownMenuItem>{t("profile.view")}</DropdownMenuItem>
                </Link>
                <Link href={"/myOrders"}>
                  <DropdownMenuItem>{t("profile.myOrder")}</DropdownMenuItem>
                </Link>
                <Link href="/subscription">
                  <DropdownMenuItem>
                    {t("profile.subscription")}
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/customer">
                  <DropdownMenuItem>
                    {t("profile.dashboard")}
                  </DropdownMenuItem>
                </Link>
                <Link href="/deliveryaddress/saved-address">
                  <DropdownMenuItem>{t("profile.address")}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          <h3>
            <DropdownMenu>
              <DropdownMenuTrigger className="p-1 pl-2 z-60 pr-2 hover:bg-[#e6ede6] flex rounded-md cursor-pointer">
                <i className="fa-solid fa-language text-lg"></i>
                <i className="fa-solid fa-caret-down ml-1"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem onClick={() => changeLocale("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale("de")}>
                  Detusch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </h3>
          <div className="flex h-10 w-max lg:ml-auto gap-3 xl:mr-7  justify-center items-center">
            <Link href={`/cart`}>
              <button className="h-10 w-30 gap-2 flex justify-center md:w-max items-center pl-5 pr-5  rounded-xl  shadow-xl active:shadow bg-green-600 text-white">
                {t("navbar.cart")}
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </Link>
            {user?.id ? (
              <button
                onClick={() => handleLogout()}
                className="h-10 px-3 hidden rounded-xl  shadow-xl active:shadow bg-red-600 text-white lg:block"
              >
                {t("profile.logout")}
                <i className="fa-solid fa-arrow-right-from-bracket ml-2"></i>
              </button>
            ) : (
              <Link
                href={"/login/Customer"}
                className=" hidden w-max lg:block "
              >
                <button className="h-10 px-3 hidden rounded-xl  shadow-xl active:shadow bg-green-600 text-white lg:block">
                  {t("profile.login")}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

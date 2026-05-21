"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/Components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import Link from "@/src/Components/LocalizedLink";
import { useHandleLogout } from "@/src/utils/handleLogout";
import { logedUser } from "@/src/types/logedUser.types";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

interface DataProps {
  user: logedUser | null;
}

const DeliveryNav = ({ user }: DataProps) => {
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
    <div className="w-screen bg-[#fbf8f2] text-xs whitespace-nowrap lg:text-[14px] xl:text-[16px] flex items-center h-18 p-3 text-black font-manrope sticky top-0 z-10 md:z-20 border-b border-gray-200 shadow-sm">
      {sidenav && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSideNav(false)}
        />
      )}

      <div className="relative z-50 flex items-center w-full mr-2">
        <div className="flex items-center h-max md:w-6 lg:w-max p-1 gap-2">
          <Image
            src={"/Fitmeals-logo.png"}
            height={35}
            width={35}
            alt="logo"
            className="rounded-lg shadow-sm"
          />
          <h1 className="text-xl font-medium flex items-center">
            FitMeals
            <span className="text-[10px] mt-1 md:text-xs font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full ml-2 uppercase tracking-wide">
              Delivery
            </span>
          </h1>
        </div>

        {/* Mobile Navbar Elements */}
        <div className="flex ml-auto gap-4 justify-center items-center text-2xl mr-2 z-50 w-max lg:hidden">
          <h3>
            <ClientOnly>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 pl-2 pr-2 hover:bg-green-100 flex rounded-md cursor-pointer transition-colors">
                  <div className="flex justify-center items-center text-green-800">
                    <i className="fa-solid fa-language text-lg"></i>
                    <i className="fa-solid fa-caret-down ml-1 text-sm"></i>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => changeLocale("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLocale("de")}>
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ClientOnly>
          </h3>

          {sidenav ? (
            <i
              className="fa-solid fa-close ml-auto w-max cursor-pointer text-gray-700"
              onClick={() => setSideNav(false)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-bars ml-auto cursor-pointer text-gray-700"
              onClick={() => setSideNav(true)}
            ></i>
          )}
        </div>

        {/* Mobile Sidenav Drawer */}
        <AnimatePresence>
          {sidenav && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-screen bg-white shadow-2xl z-40 lg:hidden flex flex-col pt-24 px-6 gap-6"
            >
              <Link href={`/`} onClick={() => setSideNav(false)}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 flex items-center gap-3 transition-colors">
                  <i className="fa-solid fa-house w-6"></i> {t("navbar.home")}
                </h3>
              </Link>
              <Link href={`/learnMore`} onClick={() => setSideNav(false)}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 flex items-center gap-3 transition-colors">
                  <i className="fa-solid fa-circle-info w-6"></i>{" "}
                  {t("navbar.about")}
                </h3>
              </Link>

              <div className="mt-auto mb-10 w-full">
                {user?.id ? (
                  <button
                    onClick={() => handleLogout()}
                    className="w-full py-3.5 rounded-xl shadow-lg active:shadow-sm bg-red-600 text-white font-semibold flex justify-center items-center gap-2 hover:bg-red-700 transition-colors"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>{" "}
                    {t("profile.logout")}
                  </button>
                ) : (
                  <Link
                    href={"/login/DeliveryPartner"}
                    onClick={() => setSideNav(false)}
                  >
                    <button className="w-full py-3.5 rounded-xl shadow-lg active:shadow-sm bg-green-600 text-white font-semibold flex justify-center items-center gap-2 hover:bg-green-700 transition-colors">
                      <i className="fa-solid fa-right-to-bracket"></i>{" "}
                      {t("profile.login")}
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navbar */}
        <div className="xl:gap-10 ml-auto xl:ml-10 md:gap-4 lg:w-full lg:ml-7 lg:gap-6 mr-4 justify-center items-center hidden lg:flex">
          <Link href={`/`}>
            <h3 className="p-2 px-4 hover:bg-green-100 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors">
              {t("navbar.home")}
            </h3>
          </Link>
          <Link href={`/learnMore`}>
            <h3 className="p-2 px-4 hover:bg-green-100 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors">
              {t("navbar.about")}
            </h3>
          </Link>
          {user?.isVerified === "VERIFIED" && (
            <Link href={`/dashboard/deliveryPartner`}>
              <h3 className="p-2 px-4 hover:bg-green-100 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors">
                {t("Dashboard")}
              </h3>
            </Link>
          )}
          {user?.isVerified === "PENDING" && (
            <Link href={`/PartnerVerification`}>
              <h3 className="p-2 px-4 hover:bg-yellow-200 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors">
                Verify Partner
              </h3>
            </Link>
          )}
          <Link href={`/learnMore`}>
            <h3 className="p-2 px-4 hover:bg-green-100 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors">
              {t("navbar.about")}
            </h3>
          </Link>

          <h3>
            <ClientOnly>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 px-3 hover:bg-green-100 hover:text-green-800 flex items-center rounded-lg cursor-pointer transition-colors">
                  <i className="fa-solid fa-language text-lg mr-1"></i>
                  <i className="fa-solid fa-caret-down text-sm"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => changeLocale("en")}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLocale("de")}>
                    Deutsch
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ClientOnly>
          </h3>

          <div className="flex h-10 w-max lg:ml-auto gap-3 xl:mr-2 justify-center items-center">
            {user?.id ? (
              <button
                onClick={() => handleLogout()}
                className="h-10 px-5 hidden rounded-xl shadow-lg hover:shadow-xl active:shadow-sm bg-red-600 hover:bg-red-700 transition-all text-white lg:flex items-center gap-2 font-semibold"
              >
                <i className="fa-solid fa-right-from-bracket"></i>{" "}
                {t("profile.logout")}
              </button>
            ) : (
              <Link href={"/login/DeliveryPartner"}>
                <button className="h-10 px-5 hidden rounded-xl shadow-lg hover:shadow-xl active:shadow-sm bg-green-600 hover:bg-green-700 transition-all text-white lg:flex items-center gap-2 font-semibold">
                  <i className="fa-solid fa-right-to-bracket"></i>{" "}
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

export default DeliveryNav;

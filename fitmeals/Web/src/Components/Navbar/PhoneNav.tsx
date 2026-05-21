import { useHandleLogout } from "@/src/utils/handleLogout";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import Link from "@/src/Components/LocalizedLink";
import { motion, Variants } from "framer-motion";

interface PhoneNavProps {
  user: number | undefined;
  setSideNav: (value: boolean) => void;
}

const PhoneNav = ({ user, setSideNav }: PhoneNavProps) => {
  const t = useTranslations();
  const handleLogout = useHandleLogout();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const menuSections = [
    {
      items: [
        { href: "/", icon: "fa-solid fa-house", label: t("navbar.home") },
        {
          href: "/about",
          icon: "fa-solid fa-circle-info",
          label: t("navbar.about"),
        },
      ],
    },
    {
      items: [
        {
          href: "/services/order/1",
          icon: "fa-solid fa-bag-shopping",
          label: t("services.order"),
        },
        {
          href: "/services/reservation/1",
          icon: "fa-solid fa-utensils",
          label: t("services.dine"),
        },
        {
          href: "/services/cookbook/1",
          icon: "fa-solid fa-book-open",
          label: t("services.cookbook"),
        },
      ],
    },
    {
      items: [
        {
          href: "/health/fit-tracker",
          icon: "fa-solid fa-dumbbell",
          label: t("Health.FitnessTracker"),
        },
        {
          href: "/health/diet/daily-plan",
          icon: "fa-solid fa-bowl-food",
          label: t("Health.dietplan"),
        },
        {
          href: "/health/food-details",
          icon: "fa-solid fa-camera",
          label: t("Health.identifyMeals"),
        },
      ],
    },
    {
      items: [
        {
          href: "/learnMore",
          icon: "fa-solid fa-circle-question",
          label: t("about.whyus"),
        },
      ],
    },
    {
      items: [
        {
          href: "/contact/query",
          icon: "fa-solid fa-phone-volume",
          label: t("navbar.contact"),
        },
      ],
    },
  ];

  const sidebarVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setSideNav(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90 lg:hidden"
      />
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 bottom-0 w-70 bg-white shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.1)] z-100 flex flex-col overflow-y-auto lg:hidden overflow-x-hidden rounded-l-2xl"
      >
        <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-xl font-bold text-green-700">FitMeals</h1>
          <button
            onClick={() => setSideNav(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleLogout();
                setSideNav(false);
              }}
              className="w-full rounded-xl text-white font-semibold text-[13px] py-2.5 px-2 bg-red-500 shadow-md shadow-red-500/20"
            >
              <i className="fa-solid mr-1.5 fa-arrow-right-from-bracket"></i>
              {t("profile.logout")}
            </motion.button>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={"/login/Customer"}
                onClick={() => setSideNav(false)}
                className="w-full flex items-center justify-center rounded-xl text-white font-semibold text-[13px] py-2.5 px-2 bg-emerald-600 shadow-md shadow-emerald-600/20"
              >
                <i className="fa-solid mr-1.5 fa-arrow-right-to-bracket"></i>
                {t("profile.login")}
              </Link>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={"/profile"}
              onClick={() => setSideNav(false)}
              className="w-full flex items-center justify-center rounded-xl text-white font-semibold text-[13px] py-2.5 px-2 bg-emerald-600 shadow-md shadow-emerald-600/20"
            >
              <i className="fa-solid mr-1.5 fa-user"></i>
              {t("navbar.profile")}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={"/subscription"}
              onClick={() => setSideNav(false)}
              className="w-full flex items-center justify-center rounded-xl text-white font-semibold text-[13px] py-2.5 px-2 bg-emerald-600 shadow-md shadow-emerald-600/20"
            >
              <i className="fa-solid mr-1.5 fa-table-cells-large"></i>
              {t("navbar.overview")}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={"/cart"}
              onClick={() => setSideNav(false)}
              className="w-full flex items-center justify-center rounded-xl text-white font-semibold text-[13px] py-2.5 px-2 bg-emerald-600 shadow-md shadow-emerald-600/20"
            >
              <i className="fa-solid mr-1.5 fa-cart-shopping"></i>
              {t("navbar.cart")}
            </Link>
          </motion.div>
        </div>

        <div className="flex-1 px-3 py-2 space-y-1">
          {menuSections.map((section, idx) => (
            <React.Fragment key={idx + 1}>
              {idx > 0 && <hr className="my-2 border-gray-100" />}
              {section.items.map((item, itemIdx) => (
                <motion.div variants={itemVariants} key={itemIdx + 1}>
                  <Link href={item.href} onClick={() => setSideNav(false)}>
                    <motion.div
                      whileHover={{
                        x: 6,
                        backgroundColor: "rgba(16, 185, 129, 0.08)",
                      }}
                      className="flex items-center text-[14px] font-medium py-3 px-4 rounded-xl text-gray-700 hover:text-emerald-700 transition-colors"
                    >
                      <i
                        className={`${item.icon} w-6 text-center text-emerald-600/70`}
                      ></i>
                      <span className="ml-3">{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="p-6 bg-gray-50 mt-auto border-t border-gray-100 rounded-bl-2xl">
          <div className="flex justify-center gap-3 mb-4">
            {[
              "fa-instagram",
              "fa-facebook-f",
              "fa-x-twitter",
              "fa-linkedin-in",
            ].map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 bg-white shadow-sm border border-gray-200 rounded-full flex justify-center items-center text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer"
              >
                <i className={`fa-brands ${icon}`}></i>
              </motion.div>
            ))}
          </div>
          <h2 className="text-center text-[11px] text-gray-500 font-medium">
            Developed by Manvith
          </h2>
          <h2 className="text-center mt-1 text-[11px] text-gray-400">
            &copy; 2024 FitMeals, All rights reserved
          </h2>
        </div>
      </motion.div>
    </>
  );
};

export default PhoneNav;

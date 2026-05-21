"use client";
import { subscribePayment } from "@/src/Apiservices/api/payments/SubscriptionPayment/subscribePayment";
import { PlainPopUp } from "@/src/Components/PopUp/Popup";
import { useUser } from "@/src/context/UserContext";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Data {
  btnTxt: string;
  btnTxt1: string;
  btnTxt2: string;
  category: "STARTER" | "PLUS" | "PREMIUM";
}

const ClientButton = ({ btnTxt, btnTxt1, btnTxt2, category }: Data) => {
  const user = useUser()
  const t = useTranslations("Subscription")
  const handleMonthType = async (selectedRange: "monthly" | "yearly") => {
    try {
      setLoading(true);
      const res = await subscribePayment(category, selectedRange);
      if (res?.url) {
        globalThis.location.href = res.url;
      } else {
        toast.error("Invalid payment response");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const [openPopup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-600/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group mt-8"
        onClick={() => {
          if (user?.subscriptionType === category) {
            toast.info(t("alreadySubscribed"));
          } else {
            setPopup(true);
          }
        }}
      >
        <span>{btnTxt}</span>
        <i className="fa-solid fa-chevron-right text-xs transition-transform group-hover:translate-x-1"></i>
      </button>

      {openPopup ? (
        <PlainPopUp setPopUp={setPopup}>
          <div className="flex flex-col items-center max-w-lg w-full p-4 font-manrope">
            {/* Elegant Top Badge & Icon */}
            <div className="w-12 h-12 bg-green-50 rounded-full flex justify-center items-center mb-3">
              <i className="fa-solid fa-gem text-green-600 text-xl animate-pulse"></i>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl font-bold text-gray-800 text-center font-montserrat">
              {t("selectCycle")}
            </h1>
            <p className="text-sm text-gray-500 text-center mt-1 mb-6 max-w-xs">
              {t("selectCycleDesc")}
            </p>

            {/* Demo Payment Credentials Alert Box */}
            <div className="w-full bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-6 text-amber-900 text-xs md:text-sm flex flex-col gap-2 font-medium shadow-xs">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <i className="fa-solid fa-circle-info text-amber-600"></i>
                <span>{t("demoTitle")}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-amber-800 mt-0.5 text-left w-full">
                <div><strong>{t("cardNumber")}:</strong> 4242 4242 4242 4242</div>
                <div><strong>{t("expiry")}:</strong> {t("expiryExample")}</div>
                <div><strong>{t("cvc")}:</strong> {t("cvcExample")}</div>
                <div><strong>{t("zip")}:</strong> {t("zipExample")}</div>
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

              {/* Monthly Plan Card */}
              <div
                onClick={() => !loading && handleMonthType("monthly")}
                className={`relative border-2 border-green-100 hover:border-green-500 rounded-2xl p-5 bg-white flex flex-col justify-between transition-all duration-300 transform hover:scale-[1.03] shadow-sm hover:shadow-md cursor-pointer group ${loading ? "opacity-60 pointer-events-none" : ""}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <i className="fa-solid fa-calendar text-green-600 text-sm"></i>
                    </span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {t("flexible")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{btnTxt1}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t("monthlyDesc")}</p>

                  <ul className="text-[11px] text-gray-600 space-y-2 mt-4">
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-green-500 text-[10px]"></i>
                      <span>{t("noLongTerm")}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-green-500 text-[10px]"></i>
                      <span>{t("allPerks")}</span>
                    </li>
                  </ul>
                </div>

                <button
                  disabled={loading}
                  className="mt-6 w-full py-2 bg-green-50 group-hover:bg-green-600 text-green-700 group-hover:text-white font-semibold text-xs rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <>
                      <span>{t("chooseMonthly")}</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </>
                  )}
                </button>
              </div>

              {/* Yearly Plan Card (Most Popular / Best Value) */}
              <div
                onClick={() => !loading && handleMonthType("yearly")}
                className={`relative bg-linear-to-br from-green-600 to-green-800 rounded-2xl p-5 text-white flex flex-col justify-between transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-green-700/20 cursor-pointer group ${loading ? "opacity-60 pointer-events-none" : ""}`}
              >
                {/* Popular Badge overlay */}
                <div className="absolute -top-2.5 right-4 bg-yellow-400 text-green-950 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-widest border border-yellow-200">
                  {t("bestValue")}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <i className="fa-solid fa-crown text-yellow-300 text-sm animate-pulse"></i>
                    </span>
                    <span className="text-[10px] font-bold text-yellow-300 bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {t("save20")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{btnTxt2}</h3>
                  <p className="text-xs text-green-100 mt-1">{t("yearlyDesc")}</p>

                  <ul className="text-[11px] text-green-50 space-y-2 mt-4">
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-yellow-300 text-[10px]"></i>
                      <span>{t("bestPrice")}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-circle-check text-yellow-300 text-[10px]"></i>
                      <span>{t("prioritySupport")}</span>
                    </li>
                  </ul>
                </div>

                <button
                  disabled={loading}
                  className="mt-6 w-full py-2 bg-white group-hover:bg-yellow-400 text-green-800 group-hover:text-green-950 font-bold text-xs rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <>
                      <span>{t("chooseYearly")}</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </PlainPopUp>
      ) : null}
    </>
  );
};

export default ClientButton;

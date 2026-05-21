"use client";
import React, { useState } from "react";
import "@/app/[locale]/(public)/page.css";
import { useUser } from "@/src/context/UserContext";
import { createReservation } from "@/app/api/actions/Reservations/createReservation";
import { toast } from "react-toastify";
import SuccessAlert from "../StatCard/SuccessAlert";
import { useTranslations } from "next-intl";
interface HotelProps {
  restaurantId: number;
  timings: string[] | null;
}
const ReservationForm = ({ restaurantId, timings }: HotelProps) => {
  const Today = new Date();
  const t = useTranslations("Services.reservation");
  const dates = Array.from({ length: 7 }, (_, index) => {
    const newDate = new Date();
    newDate.setDate(Today.getDate() + index);
    return newDate;
  });
  const handlePost = async (
    date: string,
    time: string,
    guest: number,
    restaurantId: number,
    user: {
      id: number;
      username: string;
      status: string;
      phoneNumber: string;
    },
  ) => {
    if (!user?.id || !user?.username) return null;
    try {
      setLoading(true);
      await createReservation(date, time, guest, restaurantId, user);
      setAlert(true);
      toast.success("Reservation Successfull");
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const [date, setDate] = useState<any>();
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState(1);
  const [alert, setAlert] = useState(false);
  const user = useUser();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl flex flex-col p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-emerald-50/60 to-transparent -z-10 pointer-events-none"></div>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            {t("select_date")}
          </h2>
        </div>
        <div className="scrollbar-hide flex gap-3 w-full overflow-x-auto pb-2 snap-x">
          {dates.map((item, index) => {
            const formattedDate = `${item
              .getDate()
              .toString()
              .padStart(2, "0")}/${(item.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${item.getFullYear()}`;

            return (
              <button
                className={`relative px-5 py-3 whitespace-nowrap rounded-xl font-medium text-sm transition-all duration-300 ease-out border snap-start ${
                  date === formattedDate
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
                key={index + 1}
                onClick={() => setDate(formattedDate)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs opacity-80">
                    {item.toLocaleDateString("en-GB", {
                      weekday: "short",
                    })}
                  </span>

                  <span className="font-semibold">
                    {item.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            {t("select_time")}
          </h2>
        </div>
        <div className="scrollbar-hide flex gap-3 h-max max-h-48 w-full overflow-y-auto flex-wrap pb-2">
          {timings?.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-6 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <svg
                className="w-8 h-8 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-sm font-medium text-gray-500">
                {t("No_Timings_Available")}
              </h3>
            </div>
          )}
          {timings?.map((items, index) => (
            <button
              className={`px-4 py-2.5 min-w-20 rounded-xl font-medium text-sm transition-all duration-300 ease-out border ${
                time === items
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:-translate-y-0.5"
              }`}
              key={index + 1}
              onClick={() => setTime(items)}
            >
              {items}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            {t("select_guest")}
          </h2>
        </div>
        <div className="scrollbar-hide flex gap-3 h-max max-h-48 w-full overflow-y-auto flex-wrap pb-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              className={`w-13 h-13 rounded-xl font-medium text-sm transition-all duration-300 ease-out border flex items-center justify-center ${
                guest === index + 1
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110"
                  : "bg-white border-gray-200 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:-translate-y-0.5"
              }`}
              key={index + 1}
              onClick={() => setGuest(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          handlePost(date, time, guest, restaurantId, {
            id: user?.id!,
            username: user?.username!,
            status: user!.status,
            phoneNumber: user?.phoneNumber || "",
          });
        }}
        disabled={loading}
        className={`relative w-full overflow-hidden font-semibold text-white p-4 mt-10 rounded-xl transition-all duration-300 ease-out group ${
          loading
            ? "opacity-70 cursor-not-allowed bg-emerald-400"
            : "cursor-pointer bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
        }`}
      >
        <div className="flex items-center justify-center gap-2 relative z-10">
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("processing")}...
            </>
          ) : (
            <>
              {t("book_now")}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </>
          )}
        </div>
      </button>

      {alert && (
        <SuccessAlert
          state={setAlert}
          title={"Reservation Confirmed"}
          subTitle={"Enjoy your dining experience!"}
          info={
            "Your reservation has been successfully confirmed. Please arrive at the selected time. For the address and contact details, visit the restaurant page."
          }
        />
      )}
    </div>
  );
};

export default ReservationForm;

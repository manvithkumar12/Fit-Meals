"use client";
import React from "react";
import { useReservations } from "@/src/query/getReservations";
import ErrorComponent from "@/src/Components/errorComponent/ErrorComponent";

import Skeleton from "@mui/material/Skeleton";

interface ReservationDashboardProps {
  restaurantId: number;
}

const ReservationDashboard = ({ restaurantId }: ReservationDashboardProps) => {
  const { data: reservations, isLoading, isError, refetch } = useReservations(restaurantId);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 select-none max-w-[1280px] mx-auto p-4 md:p-6 bg-slate-50/20 rounded-[32px] border border-slate-100/50 shadow-xl min-h-[500px]">
        {/* Loading Header */}
        <div className="flex flex-col gap-2 mb-2">
          <Skeleton variant="rectangular" width="200px" height={32} className="rounded-xl" animation="wave" />
          <Skeleton variant="rectangular" width="300px" height={16} className="rounded-lg" animation="wave" />
        </div>
        
        {/* Loading metrics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" width={56} height={56} className="rounded-2xl" animation="wave" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton variant="rectangular" width="60%" height={12} className="rounded-md" animation="wave" />
                  <Skeleton variant="rectangular" width="40%" height={24} className="rounded-lg" animation="wave" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading table card */}
        <div className="bg-white border border-slate-100 rounded-[28px] shadow-sm overflow-hidden p-6 mt-4 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-50">
            <Skeleton variant="rectangular" width="150px" height={24} className="rounded-lg" animation="wave" />
            <Skeleton variant="rectangular" width="80px" height={16} className="rounded-full" animation="wave" />
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-b-0">
                <Skeleton variant="rectangular" width="20%" height={20} className="rounded-lg" animation="wave" />
                <Skeleton variant="rectangular" width="15%" height={18} className="rounded-lg" animation="wave" />
                <Skeleton variant="rectangular" width="10%" height={22} className="rounded-xl" animation="wave" />
                <Skeleton variant="rectangular" width="12%" height={20} className="rounded-lg" animation="wave" />
                <Skeleton variant="rectangular" width="8%" height={22} className="rounded-xl" animation="wave" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !reservations || reservations.length === 0) {
    return (
      <div className="w-full max-w-[1280px] mx-auto p-4 md:p-6 bg-white border border-slate-100 rounded-[32px] shadow-xl flex flex-col items-center justify-center min-h-[480px]">
        <div className="h-90 w-90 md:h-120 md:w-120  relative">
          <ErrorComponent
            label="No reservations found for your restaurant yet."
            whiteBg
            btnTxt="Refresh Live Feed"
            onClick={refetch}
          />
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalReservations = reservations.length;
  const totalGuests = reservations.reduce((acc: number, curr) => acc + (curr.numberOfPeople || 0), 0);

  const formatDate = (dateVal: string | Date) => {
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return String(dateVal);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto p-6 md:p-8 bg-slate-50/20 border border-slate-100 rounded-[32px] shadow-xl flex flex-col gap-8 animate-[fadeIn_0.3s_ease-out] select-none text-slate-800">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black font-serif tracking-tight text-slate-800 leading-tight">
            Reservations Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-1.5 leading-relaxed">
            Monitor and manage live guest bookings for your dining tables
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100/50 shadow-sm px-4 py-1.5 rounded-full text-xs font-extrabold text-emerald-700 self-end md:self-auto">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Booking Feed Active
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Bookings */}
        <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-md shadow-emerald-500/5">
            <i className="fa-solid fa-calendar-check text-2xl"></i>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Total Reservations
            </span>
            <span className="text-2xl md:text-3xl font-black text-slate-800 mt-1 block">
              {totalReservations}
            </span>
          </div>
        </div>

        {/* Card 2: Expected Guests */}
        <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md shadow-blue-500/5">
            <i className="fa-solid fa-users text-2xl"></i>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Total Guests Expected
            </span>
            <span className="text-2xl md:text-3xl font-black text-slate-800 mt-1 block">
              {totalGuests}
            </span>
          </div>
        </div>

        {/* Card 3: Live updates frequency */}
        <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-md shadow-rose-500/5">
            <i className="fa-solid fa-circle-dot text-2xl animate-pulse"></i>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Live Feed Speed
            </span>
            <span className="text-2xl md:text-3xl font-black text-slate-800 mt-1 block">
              3s Auto‑Refresh
            </span>
          </div>
        </div>
      </div>

      {/* Bookings List Card */}
      <div className="bg-white border border-slate-100 rounded-[28px] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 text-lg">
            Active Bookings List
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">
            Showing all bookings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 select-none">
                <th className="py-3.5 px-6 text-left text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Customer Name
                </th>
                <th className="py-3.5 px-6 text-left text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Reservation Date
                </th>
                <th className="py-3.5 px-6 text-left text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Time Slot
                </th>
                <th className="py-3.5 px-6 text-left text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Party Size
                </th>
                <th className="py-3.5 px-6 text-right text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-100 hover:bg-slate-50/30 transition-colors duration-200 ${
                    index % 2 === 1 ? "bg-slate-50/10" : ""
                  }`}
                >
                  <td className="py-4.5 px-6 font-bold text-slate-800 text-sm">
                    {item.customerName || "Ambiguous Guest"}
                  </td>
                  <td className="py-4.5 px-6 text-slate-500 font-semibold text-xs md:text-sm">
                    {formatDate(item.reservationDate)}
                  </td>
                  <td className="py-4.5 px-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200/50 rounded-xl text-xs font-bold text-slate-600">
                      {item.reservationTime}
                    </span>
                  </td>
                  <td className="py-4.5 px-6">
                    <span className="flex items-center gap-1.5 text-slate-700 font-bold text-sm">
                      <i className="fa-solid fa-user-group text-slate-300 text-xs"></i>
                      {item.numberOfPeople} {item.numberOfPeople === 1 ? "Person" : "People"}
                    </span>
                  </td>
                  <td className="py-4.5 px-6 text-right">
                    <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-wider animate-[fadeIn_0.3s_ease-out]">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationDashboard;

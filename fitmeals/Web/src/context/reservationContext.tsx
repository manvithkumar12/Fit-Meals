"use client"
import { createContext, ReactNode } from "react";
export type ReservationProps = {
  id: number;
  name: string;
  images: string;
  ownerId: number;
  cuisineType: string;
  priceForTwo: number;
  pinCode: number;
  facilities: string[];
  description: string[];
  openingTime: string;
  reservation: boolean | null;
  closingTime: string;
  mapLink: string;
  phoneNumber: string;
  area: string;
  averageRating: number;
  city: string;
  houseNo: string;
  lat: number | null;
  long: number | null;
  status: string;
  streetName: string;
  totalReviews: number;
  totalPersons: number;
  address: string;
};
export const ReservationContext = createContext<ReservationProps | null>(null);
export const ReservationContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ReservationProps;
}) => {
  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

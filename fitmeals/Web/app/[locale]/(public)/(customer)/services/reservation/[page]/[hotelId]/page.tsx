import { getRestaurantById } from "@/app/api/actions/Reservations/getRestaurants";
import CarouselCards from "@/src/Components/HotelReservation/NavSection/CarouselCards";
import HotelCard from "@/src/Components/HotelReservation/NavSection/HotelCard";
import Navbar from "@/src/Components/HotelReservation/NavSection/Navbar";
import { ReservationContextProvider } from "@/src/context/reservationContext";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ hotelId: string }> }) => {
  const { hotelId } = await params;
  const numId = Number.parseInt(hotelId);
  const data = await getRestaurantById(numId);
  if (!data) return notFound();
  return (
    <div className="flex items-center flex-col w-screen pt-10">
      <div className="w-[90%] xl:w-[80%]">
        <div className="w-full flex pl-2 border-b-2 pb-2 border-black/30">
          <h2 className="text-4xl font-bold font-montserrat text-left">
            {data.name}
          </h2>
        </div>
        <ReservationContextProvider value={data}>
          <div className=" pb-10 pt-4 w-full mt-5 flex md:flex-row flex-col-reverse  gap-10">
            <HotelCard
              id={data.id}
              HotelName={data.name}
              CusionType={data.cuisineType}
              Location={[`${data.area}, ${data.city}`]}
              CloseTime={data.closingTime}
              mapLink={data.mapLink}
              contactNo={Number.parseInt(data.phoneNumber)}
            />
            <CarouselCards
              ImageUrl={[
                "https://drin721riupcf.cloudfront.net/cookbook/item5.jpeg",
                "https://drin721riupcf.cloudfront.net/cookbook/item5.jpeg",
                "https://drin721riupcf.cloudfront.net/cookbook/item5.jpeg",
              ]}
            />
          </div>
          <Navbar />
        </ReservationContextProvider>
      </div>
    </div>
  );
};

export default page;

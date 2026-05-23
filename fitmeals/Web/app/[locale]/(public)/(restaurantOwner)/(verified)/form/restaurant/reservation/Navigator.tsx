"use client"
import { RestaurantById } from '@/app/api/actions/Reservations/getRestaurants'
import ReservationDashboard from '@/app/api/actions/Reservations/ReservationDashboard'
import SlotsCard from '@/src/Components/SlotCards/SlotsCard'
import React from 'react'

const NavigatorPage = ({ restaurantData }: { restaurantData: RestaurantById }) => {
    return (
        <>
            {!restaurantData.reservation ?
                <SlotsCard
                    id={restaurantData?.id ?? 0}
                    openingTime={restaurantData?.openingTime ?? "00:00"}
                    closingTime={restaurantData?.closingTime ?? "00:00"}
                />
                : <div className="w-full max-w-[1280px]">
                    <ReservationDashboard restaurantId={restaurantData.id} />
                </div>}
        </>
    )
}

export default NavigatorPage

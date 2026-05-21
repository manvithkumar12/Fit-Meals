import Image from 'next/image'
import React from 'react'

const OfferCard = () => {
  return (
    <div className='w-75 h-50 bg-green-400 rounded-xl shadow-xl '>
        <div className='bg-white h-25 w-75 rounded-tl-xl flex justify-center flex-col pl-2 rounded-tr-xl border border-b-0 border-black/30'>
        <h2 className='font-semibold text-lg'>Flat 25% off</h2>
        <h4 className='text-sm opacity-55'>On Reservation</h4>
        <h2 className='font-semibold text-md'>For SBI Debit Card Holder</h2>
        </div>
        <div className='w-75 h-25 bg-green-400 rounded-bl-xl rounded-br-xl  flex p-2 flex-col mt-auto border border-t-0 border-black/30'>
        <h4 className='text-md font-semibold'>Pre-book offer</h4>
        <h4 className='text-sm opacity-55'>Limited slots, buy offer and book your table</h4>
        <button className='mt-auto ml-auto mr-4 font-semibold'><i className="fa-solid mr-2 fa-tags"></i>Avail Now</button>
        </div>
    </div>
  )
}
const MiniOfferCard = ()=>{
    return (
    <div className='w-75 h-20 p-2 rounded-xl flex shadow-xl items-center gap-3 bg-white border border-black'>
        <div className='w-10 h-10 relative'>
        <Image src="/bank-logo.webp" alt='Card' fill/>
        </div>
        <div className='flex flex-col'>
            <h2 className='text-lg font-semibold '>Flat 10% Cashback</h2>
            <h4 className='text-sm opacity-55'>Flat 10% Cashback | Above ₹100</h4>
        </div>
    </div>
    )
}

export { OfferCard, MiniOfferCard };
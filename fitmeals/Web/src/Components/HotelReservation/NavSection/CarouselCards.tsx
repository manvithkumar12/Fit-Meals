import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../../ui/Carousel'
import Image from 'next/image'
interface Data{
    ImageUrl:string[]
}
const CarouselCards = ({ImageUrl}:Data) => {
  return (
         <div className="md:w-[50%] w-full  rounded-2xl shadow-lg relative ">
            <Carousel>
              <CarouselContent>
                {ImageUrl?.map((item,index)=>(
              <CarouselItem key={index}>
                <div className="relative w-full h-53.25 z-0 rounded-2xl overflow-hidden shadow-lg"> 
                  <Image src={item} alt={`Restaurant image ${index + 1}`} fill className="object-cover shadow-lg" placeholder='blur' blurDataURL='/blur.jpeg' priority/>
                </div>
              </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
         </div>
  )
}

export default CarouselCards

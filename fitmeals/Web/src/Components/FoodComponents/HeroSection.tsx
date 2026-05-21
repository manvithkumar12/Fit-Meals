import React from "react";
import Image from "next/image";
import { RatingComponent } from "../HealthRating/Rating";
import { useTranslations } from "next-intl";

interface Data {
  title: string;
  description: string[];
  calories: number;
  time: number;
  weight: number;
  ImgUrl: string;
  price?: number;
  Rating: number;
}
const HeroSection = ({
  title,
  description,
  calories,
  time,
  weight,
  price,
  Rating,
  ImgUrl,
}: Data) => {
  const t = useTranslations("Ingredients");
  return (
    <>
      {" "}
      <div className="image-container xl:w-137.5 xl:h-140 lg:w-120.5 lg:h-120 md:w-100 md:h-100 h-80 w-80 ml-auto mr-auto bg-linear-to-br box-shadow: inset 0 0 20px rgba(0,0,0,0.03); from-[#f7f7f7] to-[#eaeaea] rounded-lg relative overflow-hidden group">
        <Image
          alt="burger"
          src={ImgUrl}
          fill
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 482px, 550px"
          loading="lazy"
          blurDataURL="/blur.jpeg"
          placeholder="blur"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <div className="flex-1 flex pl-8 md:pl-10 pt-10 flex-col">
        <div className="border-b pb-3 border-b-black/30  w-[90%] md:w-[80%]">
          <h1 className="text-4xl font-semibold font-montserrat">{title}</h1>
          {price && (
            <h4 className="mt-5 text-[1.75rem] font-semibold font-montserrat  text-green-600">
              {price}€
            </h4>
          )}
          <div className="flex items-center mt-3 text-sm md:text-lg whitespace-nowrap">
            <RatingComponent RatingValue={Rating} />
          </div>
        </div>
        <div className="mt-5 flex gap-3 border-b border-b-black/40 w-[90%] md:w-[80%] pb-2 ">
          <div className="flex items-center gap-2">
            <Image
              width="30"
              height="30"
              src="https://img.icons8.com/emoji/96/fire.png"
              alt="fire"
            />
            <h4 className="text-sm whitespace-nowrap md:text-[16px]">
              {calories} kcal
            </h4>
          </div>
          <span className="text-4xl text-black/40 opacity-55">|</span>
          <div className="flex items-center gap-2">
            <Image
              width="20"
              height="20"
              src="https://img.icons8.com/ultraviolet/40/alarm-clock--v1.png"
              alt="alarm-clock--v1"
            />
            <h4 className="text-sm whitespace-nowrap md:text-[16px]">
              {time} Min
            </h4>
          </div>
          <span className="text-4xl text-black/40 opacity-55">|</span>
          <div className="flex items-center gap-2">
            <Image
              width="25"
              height="25"
              src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-weight-fitness-icongeek26-linear-colour-icongeek26.png"
              alt="external-weight-fitness-icongeek26-linear-colour-icongeek26"
            />
            <h4 className="text-sm whitespace-nowrap md:text-[16px]">
              {weight} g
            </h4>
          </div>
        </div>
        <div className="flex flex-col mt-3 gap-2">
          <h1 className="text-2xl font-semibold font-montserrat">
            {t("Description")}
          </h1>
          {description?.map((items, index) => (
            <div
              className="flex items-center gap-2 leading-snug"
              key={index + 1}
            >
              <Image
                width="20"
                height="20"
                src="https://img.icons8.com/ios-filled/50/checkmark--v1.png"
                alt="checkmark--v1"
                key={items}
              />
              <h3 key={index + 1}>{items}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;

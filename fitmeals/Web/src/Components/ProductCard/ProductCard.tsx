import React from "react";
import Image from "next/image";
import "./product.css";
import Link from "next/link";

export interface ProductCardProps {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
  calories: number;
  protein: number;
  difficulity: string;
  time: number;
  Getlocale?: string;
  fats?: string | number;
  carbs?: string | number;
}
const getVegImageSrc = (locale?: string) => {
  return locale === "en" ? "/eng-veg.png" : "/german-veg.png";
};

const getCardLabel = (locale: string | undefined) => {
  return locale === "de" ? "Kochbuch" : "Cook Book";
};

const ProductCard = ({
  id,
  title,
  imageUrl,
  type,
  protein,
  difficulity,
  calories,
  time,
  Getlocale,
  fats,
  carbs,
}: ProductCardProps) => {
  return (
    <div className="group w-[46vw] sm:w-55 md:w-72 lg:w-72 xl:w-[80%] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 relative flex flex-col overflow-hidden hover:-translate-y-1.5 border border-gray-300 ">
      <div className="w-full h-36 sm:h-44 md:h-56 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="50vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/blur.jpeg"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-80"></div>

        {type === "Veg" && (
          <div className="absolute top-3 left-3 bg-green-400 backdrop-blur-md  md:p-1.5 rounded-full shadow-sm">
            <Image
              src={getVegImageSrc(Getlocale)}
              width={30}
              height={30}
              priority
              alt="Veg"
            />
          </div>
        )}
        {type === "Vegan" && (
          <div className="absolute top-3 left-3 bg-green-400 backdrop-blur-md  md:p-1.5 rounded-full shadow-sm">
            <Image
              src={getVegImageSrc(Getlocale)}
              width={30}
              height={30}
              priority
              alt="Vegan"
            />
          </div>
        )}
        {type === "Non-Veg" && (
          <div className="absolute top-3 left-3 bg-red-400 backdrop-blur-md  md:p-1.5 rounded-full shadow-sm">
            <Image
              src={Getlocale === "de" ? "/german-non.png" : "/eng-non.png"}
              width={20}
              height={20}
              priority
              alt="Non-Veg"
              className="md:w-6.5 md:h-6.5"
            />
          </div>
        )}

        <div className="absolute top-3 right-3 border border-red-400 bg-red-300 rounded-full px-1.5 py-1 shadow-sm flex items-center justify-center">
          <label
            className="ui-like scale-[0.6] md:scale-75 cursor-pointer mt-0! ml-0!"
            aria-label="Add to favorites"
          >
            <input type="checkbox" />
            <div className="like drop-shadow-sm hover:drop-shadow-md transition-shadow duration-300">
              <svg
                className="filter"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z" />
                </g>
              </svg>
            </div>
          </label>
        </div>

        {/* Time and Difficulty floating on image bottom */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className="bg-white/95 backdrop-blur-md px-2 py-1 md:px-2.5 md:py-1 rounded-lg text-[10px] md:text-[11px] font-bold text-gray-800 flex items-center gap-1 shadow-sm">
            <i className="fa-regular fa-clock text-green-600"></i> {time} Min
          </div>
          <div className="bg-white/95 backdrop-blur-md px-2 py-1 md:px-2.5 md:py-1 rounded-lg text-[10px] md:text-[11px] font-bold text-gray-800 flex items-center gap-1 shadow-sm capitalize">
            <i className="fa-solid fa-layer-group text-green-600"></i>{" "}
            {difficulity}
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 md:p-5 grow">
        <h4 className="text-[14px] sm:text-[16px] md:text-[19px] font-extrabold font-montserrat text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h4>

        {/* Nutrition Pills */}
        <div className="grid grid-cols-2 gap-2 mt-3 flex-wrap">
          <div className="bg-orange-50 text-orange-600 border border-orange-100 px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-bold flex items-center gap-1.5">
            <i className="fa-solid fa-fire text-[10px]"></i> {calories} kcal
          </div>
          <div className="bg-blue-50 text-blue-600 border border-blue-100 px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-bold flex items-center gap-1.5">
            <i className="fa-solid fa-dumbbell text-[10px]"></i> {protein}g Pro
          </div>
          {fats !== undefined && (
            <div className="bg-yellow-50 text-yellow-600 border border-yellow-100 px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-cheese text-[10px]"></i> {fats}g Fat
            </div>
          )}
          {carbs !== undefined && (
            <div className="bg-green-50 text-green-700 border border-green-100 px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-bold flex items-center gap-1.5">
              <i className="fa-solid fa-wheat-awn text-[10px]"></i> {carbs}g
              Carbs
            </div>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto pt-4 md:pt-5 w-full">
          <Link href={`fooditem/${title}-${id}`} className="w-full">
            <button className="w-full py-2 md:py-3 text-[12px] md:text-[14px] bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-[0_4px_14px_0_rgb(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgb(22,163,74,0.23)] active:scale-[0.98] flex items-center justify-center gap-2 group/btn">
              {getCardLabel(Getlocale)}
              <i className="fa-solid fa-arrow-right text-[12px] transition-transform group-hover/btn:translate-x-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

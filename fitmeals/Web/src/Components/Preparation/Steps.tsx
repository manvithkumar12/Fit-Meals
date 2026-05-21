"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface StepsProps {
  images: string[];
  steps: string[];
}

const Steps = ({ images, steps }: StepsProps) => {
  const t = useTranslations("Ingredients.Ingredients");
  return (
    <div className="flex flex-col p-5">
      <h2 className="text-3xl font-semibold font-montserrat">
        {t("Preparation")}
      </h2>
      <div className="flex mt-5 flex-col">
        {steps.map((step, index) => (
          <div
            key={index + 1}
            className="step mt-5 h-max lg:gap-5 flex flex-col  items-center justify-center lg:items-end lg:justify-start lg:flex-row"
          >
            <div className="h-50 bg-[#fbf9f3] rounded-md md:mt-4 ml-auto mr-auto w-70 md:h-62.5 md:w-85 z-5 shrink-0 relative">
              <Image
                alt={`step-image-${index + 1}`}
                className="object-cover rounded-md"
                src={images[index]}
                fill
                sizes="(max-width: 768px) 280px, 340px"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/blur.jpeg"
              />
            </div>
            <div className="w-full lg:w-max flex justify-center mb-auto items-center">
              <div className="h-10 w-10  md:h-13 md:w-13 lg:h-15 shrink-0  text-white bg-[#00a73c] mt-2  lg:ml-0 lg:w-15 lg:mt-10 rounded-full flex items-center justify-center text-2xl font-bold font-montserrat">
                {index + 1}
              </div>
            </div>
            <div
              className={`information p-2 md:p-5 items-center md:w-[80%] ${index + 1 === 5 ? "border-0" : "border-b border-black"}  mb-5 md:mb-0 flex`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;

"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

interface StepsProps {
  images: string[];
  steps: string[];
}

const Steps = ({ images, steps }: StepsProps) => {
  const locale = useLocale()
  const t = useTranslations("Ingredients.Ingredients");
  return (
    <div className="flex flex-col">

      <div className="flex items-center gap-3 pb-6 border-b border-zinc-100 dark:border-zinc-800/50 mb-8">
        <div className="h-2 w-2 rounded-full bg-[#00a73c] animate-pulse" />
        <h2 className="text-2xl font-bold font-montserrat text-zinc-800 dark:text-zinc-100">
          {t("Preparation")}
        </h2>
      </div>


      <div className="flex flex-col w-full mt-4">
        {steps.map((step, index) => {
          const stepImage = images && images[index];
          const isLast = index === steps.length - 1;

          return (
            <div
              key={`${step.slice(0, 10)}-${index}`}
              className="flex gap-4 sm:gap-6 items-stretch"
            >
              <div className="flex flex-col items-center shrink-0">

                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#00a73c] text-white flex items-center justify-center text-lg sm:text-xl font-bold font-montserrat shadow-md shadow-[#00a73c]/20 hover:scale-105 transition-transform duration-200 z-10 shrink-0">
                  {index + 1}
                </div>

                {!isLast && (
                  <div className="w-[2px] bg-zinc-100 dark:bg-zinc-800/80 grow my-2" />
                )}
              </div>


              <div className="flex-1 pb-8 sm:pb-12">
                <div className="w-full bg-zinc-50/50 dark:bg-zinc-800/10 rounded-2xl border border-zinc-100/50 dark:border-zinc-800/10 p-5 sm:p-6 hover:shadow-md hover:border-zinc-200/50 dark:hover:border-zinc-800/30 transition-all duration-300">
                  <div className={`grid grid-cols-1 ${stepImage ? "md:grid-cols-3" : "grid-cols-1"} gap-6 items-center`}>


                    <div className={`${stepImage ? "md:col-span-2" : "col-span-1"} flex flex-col justify-center`}>
                      <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5 font-montserrat">
                        {locale === "en" ? "Step" : "Schritt"}  {index + 1}
                      </span>
                      <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold text-[15px] font-montserrat">
                        {step}
                      </p>
                    </div>


                    {stepImage && (
                      <div className="md:col-span-1 w-full flex justify-center">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm hover:scale-[1.02] transition-transform duration-300 ease-out group">
                          <Image
                            alt={`step-image-${index + 1}`}
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            src={stepImage}
                            fill
                            sizes="(max-width: 768px) 100vw, 240px"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="/blur.jpeg"
                          />
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;

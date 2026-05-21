"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/app/[locale]/(public)/page.css";

interface FeedbackProps {
  data:
    | {
        message: string;
        id: number;
        user: { profileUrl: string | null; name: string };
      }[]
    | [];
}

const FeedBack = ({ data }: FeedbackProps) => {
  const t = useTranslations("homepage");
  const router = useRouter();
  return (
    <div className="h-max w-full">
      <h4 className="text-2xl ml-5 md:text-6xl font-semibold font-montserrat">
        {t("feedback.title")}
      </h4>
      <h4 className="md:mt-2 p-1 ml-7">{t("feedback.subtitle")}</h4>
      {data.length > 0 ? (
        <div className=" h-max grid w-full mt-4 grid-cols-1 mr-auto ml-auto grid-rows-1 gap-6  place-items-center p-5 md:grid-cols-1 md:grid-rows-1 xl:grid-cols-2 lg:grid-rows-2">
          {data?.map((item) => (
            <div
              key={item.id}
              className="feedback-card w-80 h-40 md:w-115 md:h-50 border border-black/30 md:border-gray-200 hidebar shadow-md p-2 overflow-y-scroll  lg:h-50 lg:w-150 bg-[#efede5] rounded-2xl flex flex-col pl-5 pr-5"
            >
              <h4 className="text-xs md:text-[16px] mt-4">{item.message}</h4>
              <div className="flex  items-center align-middle">
                <div className="h-5 w-5 md:h-10 md:w-10 bg-red-400 rounded-full mt-5 relative">
                  <Image
                    src={item.user.profileUrl ?? "/Fitmeals-logo.png"}
                    className="rounded-full object-cover"
                    alt={`${item.user.name} profile`}
                    fill
                    sizes="40px"
                  />
                </div>
                <h4 className="text-xs md:text-[16px] font-semibold mt-5 ml-1.5">
                  @{item.user.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="ml-auto mr-auto text-center feedback-card w-80 h-30 md:w-115 md:h-50 lg:h-40 lg:w-150 bg-[#efede5] rounded-2xl items-center flex flex-col justify-center pl-5 pr-5">
          <h2 className="text-lg font-semibold">
            Be the first to share your feedback
          </h2>
          <button
            onClick={() => {
              router.push("/contact/query");
            }}
            className=" w-max px-4 mt-3 py-2 bg-black cursor-pointer shadow-xl active:shadow text-white rounded-lg hover:opacity-90 transition"
          >
            Share Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedBack;

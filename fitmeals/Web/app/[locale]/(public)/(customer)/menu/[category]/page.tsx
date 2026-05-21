import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ClientButton from "@/src/Components/General/Button/ClientButton";
import { getTranslations } from "next-intl/server";
import { LabelData } from "@/data/MenuData";

const page = async ({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) => {
  type PlanType = "STARTER" | "PLUS" | "PREMIUM";
  const { locale, category } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Menu",
  });
  const Labels = LabelData(t);
  const CurLabel = Labels[category as keyof typeof Labels];
  const Allowed_Labels = ["plus", "premium", "starter"];
  if (!Allowed_Labels.includes(category)) notFound();
  return (
    <div className="w-screen min-h-150 flex flex-col pb-10">
      <section className="w-full">
        <div className="w-full min-h-150 flex-col-reverse md:flex-row flex">
          <div className=" w-full ml-0  md:w-[40%] md:ml-5 flex flex-col justify-center xl:pl-20 md:pl-5">
            <div className="gap-3 flex md:items-start items-center flex-col">
              <h1 className="lg:text-6xl text-3xl font-semibold font-montserrat text-green-900">
                {CurLabel.title}
              </h1>
              <h4 className="lg:text-xl text-base font-semibold font-montserrat text-green-800">
                {CurLabel.description}
              </h4>
            </div>
            <div className="flex mt-5 lg:mt-10  md:items-start items-center flex-col gap-4">
              <div className="flex flex-col text-left">
                {CurLabel.points.map((items, index) => (
                  <div
                    className="flex gap-2 items-center text-left"
                    key={items + index}
                  >
                    <i className="fa-solid text-green-500 fa-circle-check"></i>
                    <h3 className=" text-md md:text-lg lg:text-xl text-green-800">
                      {items}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full justify-center items-center flex md:w-max">
              <div className="flex gap-3 justify-center md:justify-start w-full">
                <ClientButton
                  category={category.toUpperCase() as PlanType}
                  btnTxt={CurLabel.btntxt}
                  btnTxt1={CurLabel.btnTxt1}
                  btnTxt2={CurLabel.btnTxt2}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-70 md:w-[50%] md:min-h-150 ml-auto p-5 relative bg-white">
            <Image
              src={CurLabel.imgUrl}
              alt={CurLabel.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              placeholder="blur"
              blurDataURL="/blur.jpeg"
              className="object-contain ml-auto"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col justify-center items-center gap-1.5">
        <h1 className="lg:text-4xl mt-5 text-center p-2 text-2xl font-semibold font-montserrat text-green-800">
          {t("terms.title")}
        </h1>
        <div className="text-left lg:text-center lg:pl-0 pl-4 gap-1.5 p-2 flex flex-col">
          <h4>
            <span className="font-bold text-sm">1) </span>
            {t("terms.t2")}
          </h4>
          <h4>
            <span className="font-bold text-sm">2) </span>
            {t("terms.t1")}
          </h4>
          <h4>
            <span className="font-bold text-sm">3) </span>
            {t("terms.t3")}
          </h4>
          <h4>
            <span className="font-bold text-sm">4) </span>
            {t("terms.t4")}
          </h4>
          <h4>
            <span className="font-bold text-sm">5) </span>
            {t("terms.t5")}
          </h4>
          <h4>
            <span className="font-bold text-sm">6) </span>
            {t("terms.t6")}
          </h4>
          <h4>
            <span className="font-bold text-sm">7) </span>
            {t("terms.t7")}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default page;

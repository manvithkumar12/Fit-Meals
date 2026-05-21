import React from "react";
import CookBook from "@/src/Components/ServiceComponent/CookBook/CookBook-Hero";
import { getTranslations } from "next-intl/server";
import { getCookbooks } from "@/app/api/actions/cookbook/getCookbook";
import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) => {
  const { locale, page } = await params;
  const numPage = Number.parseInt(page, 10) || 1;
  const getData = await getCookbooks(numPage, 9);
  const t = await getTranslations({
    locale,
    namespace: "Services.cookbook",
  });
  const nextUrl = getData.hasMore ? `/services/cookbook/${numPage + 1}` : "#";
  const prevPage = numPage > 1 ? numPage - 1 : 1;
  return (
    <div className="w-screen h-max pt-10 pb-5 overflow-hidden flex flex-col justify-center items-center ">
      <CookBook locale={locale} data={getData.data} error={getData.error} />
      <div className="w-max flex gap-2 ml-auto mr-2 md:mr-5">
        <Link href={`/services/cookbook/${prevPage}`}>
          <button
            disabled={numPage === 1}
            className={`bg-green-700 font-semibold rounded-full text-white py-1 px-3 md:py-2 md:px-5 hover:bg-green-800 transition group ${numPage === 1 ? "opacity-30 cursor-not-allowed" : ""} `}
          >
            <i className="fa-solid fa-angle-left"></i> {t("prev")}
          </button>
        </Link>
        <Link href={nextUrl}>
          <button
            disabled={!getData.hasMore}
            className={`bg-green-700 font-semibold rounded-full py-1 px-3 md:py-2 md:px-5 text-white transition group ${getData.hasMore ? "" : "opacity-30 cursor-not-allowed"} `}
          >
            {t("next")}
            <i className="fa-solid fa-angle-right transition-transform group-hover:translate-x-1  "></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;

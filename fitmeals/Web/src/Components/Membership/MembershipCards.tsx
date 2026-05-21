import { MembershipData } from "./membershipData";
import { getTranslations } from "next-intl/server";
import Link from "@/src/Components/LocalizedLink";

export default async function MembershipCards({
  params,
}: Readonly<{
  params: { locale: string };
}>) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Membership",
  });
  return (
    <div className="min-h-100 h-max">
      <div className="mt-10 md:mt-20">
        <h1 className="text-2xl  text-center md:ml-15 md:text-5xl font-semibold font-montserrat">
          {t("header.title")}
        </h1>
        <h4 className="md:mt-2 p-1  text-center md:ml-15">
          {t("header.subtitle")}
        </h4>
        <div className="membership-card-container flex w-screen h-max gap-5 justify-center items-center p-5 flex-wrap">
          {MembershipData(t).map((item) => (
            <div
              key={item.id}
              className="membership-card  mt-5 min-h-[449.5px] md:min-w-90 w-70  md:w-max bg-[#efede5] flex flex-col p-7 align-middle  rounded-2xl "
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <h4 className="text-[#09220e] border-b border-[#cdcfc5] pb-2">
                {item.info}
              </h4>
              <h4 className="mt-4 text-3xl font-bold">
                {item.priceMonth}
                <span className="text-2xl font-semibold">/{item.billing}</span>
              </h4>
              <h4 className="text-x font-light">
                or {item.yearPrice}/{t("starter.yearly")}
              </h4>
              <Link href={`/menu/${item.title.toLowerCase()}`}>
                <button className="mt-5 h-10 px-6 w-max rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer text-white transition font-semibold">
                  {t("header.startbtn")}
                </button>
              </Link>
              <div className="mt-3">
                {item.include}
                <ul className="mt-2 space-y-2">
                  {item.includes.map((feature, index) => (
                    <li key={index + 1} className="flex items-start">
                      <i className="fa-regular fa-circle-check text-[#63E6BE] mr-2 mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

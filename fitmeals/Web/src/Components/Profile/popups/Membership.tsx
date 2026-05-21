import React from "react";
import { PlainPopUp } from "../../PopUp/Popup";
import { MembershipData } from "../../Membership/membershipData";
import { useUser } from "@/src/context/UserContext";
import { useTranslations } from "next-intl";
import Link from "@/src/Components/LocalizedLink";

const Membership = ({
  setPopUp,
}: {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useUser();
  const t2 = useTranslations("Profile");
  const t = useTranslations("Membership");
  return (
    <PlainPopUp setPopUp={setPopUp}>
      <h1 className="text-lg md:text-xl font-semibold font-montserrat">
        {t2("common.change_sub_from", { type: user?.subscriptionType || "NONE" })}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        {MembershipData(t)
          .filter((item) => item.title.toUpperCase() !== user?.subscriptionType)
          .map((item, index) => (
          <div
            className="w-full md:w-64 min-h-70 bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-green-300 rounded-2xl p-6 flex flex-col transition-all relative overflow-hidden group cursor-pointer"
            key={item.id}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="border-b border-gray-100 pb-4 mb-4">
              <h1 className="text-xl font-extrabold font-montserrat text-gray-800 tracking-tight">
                {item.title}
              </h1>
              <h3 className="text-sm text-gray-500 mt-1.5 leading-relaxed font-medium">
                {item.info}
              </h3>
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <h4 className="font-bold font-montserrat text-2xl text-gray-800 tracking-tight">
                {item.priceMonth}
              </h4>
              <div className="w-max bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-md">
                or {item.yearPrice}/year
              </div>
            </div>
            <Link href={`/menu/${item.title.toLowerCase()}`}>
              <button className="mt-auto w-full py-3 rounded-xl bg-green-600 group-hover:bg-green-700 text-white font-bold shadow-md shadow-green-600/20 hover:shadow-lg transition-all active:scale-[0.98]">
                {t2("popup.startbtn")}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </PlainPopUp>
  );
};

export default Membership;

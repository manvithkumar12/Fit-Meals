"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SuccessAlert from "./SuccessAlert";
import { S_Type } from "@prisma/client";
import Membership from "../Profile/popups/Membership";
import CancelSub from "../Profile/popups/CancelSub";
export function StatCard({
  title,
  value,
  color,
}: Readonly<{
  title: string;
  value: number;
  color: string;
}>) {
  return (
    <div className={`border-2 ${color} rounded-xl p-6 text-center`}>
      <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
        {title}
      </p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}
interface Updateprops {
  plan: S_Type;
}
export function BtnFlex({ plan }: Readonly<Updateprops>) {
  const [showSuccess, setShowSuccess] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) return;

    const key = `payment_${sessionId}`;
    const alreadyShown = localStorage.getItem(key);

    if (!alreadyShown) {
      setShowSuccess(true);
      localStorage.setItem(key, "true");
    }
  }, [searchParams]);

  const [alert, setAlert] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  const t = useTranslations("Overview");
  return (
    <div className="flex justify-center gap-6 mb-12">
      {showSuccess && (
        <SuccessAlert
          title={"Payment Successful!"}
          subTitle={"Your membership is now active"}
          state={setShowSuccess}
          info={
            "You can track your membership in the subscription overview page"
          }
        ></SuccessAlert>
      )}
      <button
        className="px-6 py-3 rounded-lg bg-red-700 text-sm md:text-md text-white font-medium hover:bg-red-800 transition"
        onClick={() => setAlert(true)}
      >
        {t("cancelSubscription")}
      </button>
      <button
        className="px-6 py-3 rounded-lg bg-blue-900 text-sm md:text-md text-white font-medium hover:bg-blue-950 transition"
        onClick={() => setChangePlan(true)}
      >
        {t("changeSubscription")}
      </button>
      {alert && <CancelSub setPopUp={setAlert} />}
      {changePlan ? <Membership setPopUp={setChangePlan} /> : null}
    </div>
  );
}

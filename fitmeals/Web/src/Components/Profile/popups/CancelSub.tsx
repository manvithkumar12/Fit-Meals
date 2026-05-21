"use client"
import React, { Dispatch, SetStateAction, useState } from "react";
import { PlainPopUp } from "../../PopUp/Popup";
import { useTranslations } from "next-intl";
import { useUser } from "@/src/context/UserContext";
import { deleteSubscription } from "@/app/api/actions/userDetails/deleteSubscription";
import { toast } from "react-toastify";

const CancelSub = ({
  setPopUp,
}: {
  setPopUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useUser();
  const t2 = useTranslations("Profile");
  const [checkbox, setcheckbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await deleteSubscription(user?.id!);

      if (res) {
        toast.success("Subscription cancelled");
        setPopUp(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PlainPopUp setPopUp={setPopUp}>
      <form
        className="w-full flex flex-col items-center md:w-100"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 text-center mb-6">
          {t2("account.cancel-subscription")}
        </h1>

        <div className="w-full flex flex-col gap-4">
          <textarea
            placeholder={t2("popup.subscription-placeholder2")}
            className="w-full p-4 min-h-30 max-h-50 border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none resize-y"
          />

          <div className="bg-green-50/50 border border-green-100 text-green-800 p-4 rounded-xl flex items-start gap-3 w-full text-sm mt-2">
            <i className="fa-solid fa-circle-info mt-0.5 text-green-500"></i>
            <p className="font-medium leading-relaxed">
              {t2("popup.subscription-alert")}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full mt-4">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={checkbox}
              onChange={(e) => setcheckbox(e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700">
              {t2("popup.subscription_agree")}
            </span>
          </div>
          <button
            disabled={!checkbox || loading}
            className={`h-12 mt-4 bg-green-400 shadow-lg w-full text-white font-bold rounded-xl flex justify-center items-center transition-all active:scale-[0.98]${loading ? "bg-gray-300 cursor-not-allowed" : checkbox ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" : "bg-green-500 cursor-not-allowed"}`}
            type="submit"
          >
            {loading ? t2("common.submitting") : t2("common.submit")}
          </button>
        </div>
      </form>
    </PlainPopUp>
  );
};

export default CancelSub;
